// But : Programmation des services pour les fonctionnalités de la connection.
// Auteur : Martyn Gagné côté
// Date : 1 décembre 2020

import crypto from 'crypto';
import expressJWT from 'express-jwt';
import jwt from 'jsonwebtoken';
import httpErrors from 'http-errors';
import Accounts from '../models/account.js';
import  lodash from 'lodash';


const elements = [{name :"A", quantity: 0 },{name :"B", quantity: 0 } ,{name :"E", quantity: 0 }
        ,{name :"Ex", quantity: 0 },{name :"Fr", quantity: 0 },{name :"G", quantity: 0 }
        ,{name :"I", quantity: 0 },{name :"Ja", quantity: 0 },{name :"K", quantity: 0 }
        ,{name :"L", quantity: 0 },{name :"No", quantity: 0 },{name :"Q", quantity: 0 }
        ,{name :"Sm", quantity: 0 },{name :"Ve", quantity: 0 },{name :"Wu", quantity: 0 }
        ,{name :"Xu", quantity: 0 },{name :"Ye", quantity: 0 },{name :"Z", quantity: 0 }];

class AccountServices {
    async login(email, password) {
        const account = await Accounts.findOne({ email: email });
        

        if (!account) {
            return { err: httpErrors.Unauthorized(`Aucun compte existant avec le courriel ${email}`) };
        } else {
            if (this.validatePassword(password, account)) {
                return { account: account };
            } else {
                return { err: httpErrors.Unauthorized("Erreur d'authentification") };
            }
        }
    }

   async giveInox() {
    const account = await Accounts.find();
       account.forEach(element => {
        element.inox +=2;
        element.save();
       });               
    }

    async giveElement() {
        const Listaccount = await Accounts.find();    
        Listaccount.forEach(account => {
            (account.element).forEach(element => {              
                rnd = lodash.random(2,5);
                element.quantity += rnd;
            });        
            account.save();
        });        
           
    }

    validatePassword(password, account) {
        //Validate de password with hash
        const iteration = parseInt(process.env.HASH_ITERATION, 10);
 
        const hash = crypto.pbkdf2Sync(password, account.salt, iteration, 64, 'sha512').toString('base64');

        return hash === account.hash;
    }

    create(account) {
        //Generate salt
   
        account.salt = crypto.randomBytes(16).toString('base64');
        //Generate hash
        const hrstart = process.hrtime();
        const iteration = parseInt(process.env.HASH_ITERATION, 10);
        
        account.element = elements;
        account.hash = crypto.pbkdf2Sync(account.password, account.salt, iteration, 64, 'sha512').toString('base64');
        const hrEnd = process.hrtime(hrstart);
        //console.info('Execution time (iteration - %d): %ds %dms', iteration, hrEnd[0], hrEnd[1] / 1000000);
   
        return Accounts.create(account);
    }

    generateJWT(account, needNewRefresh = true) {
        let refreshToken = '';

        const accessToken = jwt.sign({ email: account.email }, process.env.JWT_TOKEN_SECRET, { expiresIn: process.env.JWT_TOKEN_LIFE }); //Generate the token
        

        if (needNewRefresh) {
            //Generate refreshToken
            refreshToken = jwt.sign({}, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_LIFE }); //Generate the token
            account.refreshToken = refreshToken;
            account.save();
        }
        return { accessToken, refreshToken };
    }

    async validateRefreshToken(email, refreshToken) {
        return await Accounts.findOne({ email: email, refreshToken: refreshToken });
        
    }

    logout(email) {
        return Accounts.findOneAndUpdate({ email: email }, { refreshToken: '' }, { new: true });
    }

    logoutRefresh(refreshToken) {
        return Accounts.findOneAndUpdate({ refreshToken: refreshToken }, { refreshToken: '' }, { new: true });
    }

    transform(account) {
        //Do some logic cleanup
        delete account.salt;
        delete account.hash;
        delete account._id;
        delete account.__v;

        return account;
    }
}



export default new AccountServices();