/**
 * UserController
 * Контроллер пользователя
 */
import { Request, Response, NextFunction } from 'express';

import App from '../App';
import User from '../models/User';
import UserDataProvider from '../providers/UserDataProvider';
import SecurityHelper from '../helpers/SecurityHelper';

export default class UserController {
    /**
     * UserDataProvider
     */
    private userProvider: UserDataProvider;
    
    constructor(private app: App) {
        this.userProvider = this.app.providers.user;
    }

    /**
     * Загрузка всех пользователей
     * @param onLoad
     */
    findAll(onLoad: (err: string, data: User[]) => void) {
        this.userProvider.select({}, onLoad);
    }

    /**
     * Загрузка пользователя по email
     * @param email 
     * @param onLoad 
     * @param onError 
     */
    findByEmail(email: string, onLoad: (data: User | null) => void, onError: (msg: string, code: number) => void) {
        this.userProvider.findOne({email: email}, (err, data) => {
            if (err) {
                onError(err.message, 500);
            } else {
                let result = data !== undefined ? data : null;
                onLoad(result);
            }
        });
    }

    /**
     * Создание нового пользователя
     * @param data 
     * @param onCreate 
     * @param onError 
     */
    create(data, onCreate, onError: (msg: string, code: number) => void) {
        // проверяем email
        let emailPattern = /^[a-z0-9_-]{4,}\@[-a-z0-9]{3,}\.[a-z]{2,3}$/;
        
        if (!emailPattern.test(data.email) || !data.password.length) {
            onError("Неверно указан email или пароль", 400);
        } else {
            // проверим уникальность email
            this.findByEmail(data.email, (result) => {
                if (!result) {
                    let user = new User();
                        user.name = data.name || data.email;
                        user.email = data.email;
                        user.password = SecurityHelper.generatePasswordHash(data.password);

                    this.userProvider.create(user, (err, newData) => {
                        if (err !== null) {
                            onError(err.message, 500);
                        } else {
                            onCreate(newData);
                        }
                    });
                } else {
                    onError("Пользователь с указанным email уже существует", 400);
                }
            }, onError);
        }
    }

    /**
     * Удаление пользователя по id
     * @param id 
     * @param onRemove
     */
    removeById(id: string, onRemove) {
        this.userProvider.delete({_id: id}, onRemove);
    }

    /**
     * Обновление данных пользователя по id
     * @param id 
     * @param newData
     * @param onUpdate
     */
    updateById(id: string, newData: User, onUpdate) {
        this.userProvider.update({_id: id}, newData, onUpdate)
    }
}