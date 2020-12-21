// But : Programmation des routes pour les fonctionnalités de la connection.
// Auteur :  Martyn Gagné côté
// Date : 1 décembre 2020
import express from 'express';
import expressJWT from 'express-jwt';
import httpErrors from 'http-errors';
import accountService from '../services/accountService.js';

const router = express.Router();

//JWT middleware
const authenticateJwt = expressJWT({
    secret: process.env.JWT_TOKEN_SECRET,
    algorithms: ["HS256"]
});

const authenticateRefreshJwt = expressJWT({
    secret: process.env.JWT_REFRESH_SECRET,
    algorithms: ["HS256"]
});

class AccountsRoutes {
    constructor() {
        router.post('/creationCompte', this.post);
        router.post('/', this.login);
        router.post('/refresh', this.refreshToken); //Pas une route secure, le token est expiré
        // router.get('/secure', authenticateJWT, this.secure);
        router.delete('/deconnexion', authenticateJwt, this.logout);
        router.get('/inventory', authenticateJwt,  this.getElements);
    }

    async post(req, res, next) {
        try {
            let account = await accountService.create(req.body);
            //Generate Access Token (JWT)
            const { accessToken, refreshToken } = accountService.generateJWT(account);

            account = account.toObject({ getters: false, virtuals: false });
            account = accountService.transform(account);
            account.accessToken = accessToken;
            account.refreshToken = refreshToken;



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

        // Je dois aller chercher les éléments ainsi que la collection de monsters à partir de ce id.
        let compte = await accountService.retriveByIdUser(req.user.email);
        let elements = compte.element;
        let monsters = compte.monster;
        let inox = compte.inox;
        let inventaire = {element:[], monster:[], inox:Number};
        inventaire.element = elements;
        inventaire.monster = monsters;
        inventaire.inox = inox;

        res.status(200).json(inventaire).end();
    }

}

new AccountsRoutes();
export default router;