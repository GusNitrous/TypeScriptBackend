/**
 * User
 * Модель пользователя
 */
export default class User {
    /**
     * Id
     */
    _id: string;
    /**
     * Имя пользователя
     */
    name: string;
    /**
     * Email
     */
    email: string;
    /**
     * Hash пароля
     */
    password: string;
    /**
     * Дата регистрации
     */
    created: string;
    /**
     * Последнее посещение
     */
    lastVisit: string;

    constructor() {
        let date = Date.now().toString();
        this.created = date;
        this.lastVisit = date;
    }
}