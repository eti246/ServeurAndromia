// But : Programmation des routes pour les fonctionnalités de la connection.
// Auteur :  Martyn Gagné côté
// Date : 1 décembre 2020
import express from 'express';
import expressJWT from 'express-jwt';
import httpErrors from 'http-errors';
import accountService from '../services/accountService.js';

const router = express.Router();

class AccountsRoutes {
    constructor() {
        router.post('/creationCompte', this.post);
        router.post('/', this.login);
        router.post('/refresh', this.refreshToken); //Pas une route secure, le token est expiré
        // router.get('/secure', authenticateJWT, this.secure);
        router.get('/elements/:idUser', this.getElements);
        router.delete('/deconnexion' ,this.logout);
    }

    async post(req, res, next) {
        try {
            let account = await accountService.create(req.body);
            //Generate Access Token (JWT)
            const { accessToken } = accountService.generateJWT(account);

            account = account.toObject({ getters: false, virtuals: false });
            account = accountService.transform(account);
            account.accessToken = accessToken;
            
            
            res.status(201).json(account);
        } catch (err) {
            return next(httpErrors.InternalServerError(err));
        }
    }


    async login(req, res, next) {
        const { email, password } = req.body;
        const result = await accountService.login(email, password);
        
        if (result.account) {
            //Generate Access Token (JWT) and response
            const token = accountService.generateJWT(result.account);
            res.status(200).json(token);
        } else {
            return next(result.err);
        }
    }

    async refreshToken(req, res, next) {
        
        //1. est-ce que le refresh est dans la BD et au bon user
        const refreshToken = req.headers.authorization.split(' ')[1];
        const { email } = req.body;
        const account = await accountService.validateRefreshToken(email, refreshToken);
        //Authorization BEARER <token>
        if (account) {
            const { accessToken } = accountService.generateJWT(account, false);
            res.status(201).json({ accessToken });
        } else {
            await accountService.logoutRefresh(refreshToken);
            return next(httpErrors.Unauthorized('Cannot refresh token'));
        }
    }

    async logout(req, res, next) {

        try {

            await accountService.logout(req.user.email);

            res.status(204).end();
        } catch (err) {
            return next(httpErrors.InternalServerError());
        }
    }

    async getElements(req, res, next) {

        //req.params.idUser;
        // Je dois aller chercher les éléments ainsi que la collection de monsters à partir de ce id.
        let compte = await accountService.retriveByIdUser(req.params.idUser);
        let elements = compte.element;
        let monsters = compte.monster;
        let inventaire = {element:[], monster:[]};
        inventaire.element = elements;
        inventaire.monster = monsters;

        res.status(200).json(inventaire).end();
    }

}

new AccountsRoutes();
export default router;