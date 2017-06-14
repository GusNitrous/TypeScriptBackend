/**
 * AuthController
 * Контроллер авторизации
 */
import { Request, Response, NextFunction } from 'express';

import App from '../App';
import User from '../models/User';
import UserDataProvider from '../providers/UserDataProvider';
import SecurityHelper from '../helpers/SecurityHelper';

export default class AuthController {
    /**
     * UserDataProvider
     */
    private userProvider: UserDataProvider;
    
    constructor(private app: App) {
        this.userProvider = this.app.providers.user;
    }
    
    /**
     * Аутентификация пользователя
     */
    login(req: Request, res: Response) {
         let email = req.body.email;
         let pswd = req.body.password;

         this.userProvider.findOne({email: email}, (err, user) => {
            if (err) {
                res.sendStatus(500);
            } else {
                if (!user || !SecurityHelper.validatePassword(pswd, user.password)) {
                    res.send({msg:'Неверный email или пароль', code: 400});
                } else {
                    user.lastVisit = Date.now().toString();
                    this.userProvider.update({_id: user._id}, user, (err, numReplaced) => {
                        console.log(`User ${user.email} lastVisit: ${user.lastVisit}`);
                    });

                    req.session.userId = user._id;
                    res.send({msg:'Welcome'});
                }
            }
         });
    }

    /**
     * Завершение пользовательской сессии
     */
    logout(req: Request, res: Response) {
        let session = req.session;
        if (!session) {
            res.sendStatus(400);
        } else {
            session.destroy((err) => {
                res.send({msg:'Logout success'});
            });
        }
    }

    /**
     * Проверка пользовательской сессии
     */
    checkSession(req: Request, res: Response, next: NextFunction) {
        let session = req.session;
        if (~['/login', '/add'].indexOf(req.path)) {
           if (!session.userId) {
               next();   
           } else {
               // Not acceptable
               res.sendStatus(406);
           }
        } else {
            if (session.userId) {
                next();
            } else {
                // Unauthorized
                res.sendStatus(401);
            }
        }
    }
}