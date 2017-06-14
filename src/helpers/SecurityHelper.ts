/**
 * Security Helper
 */
import * as crypto from 'crypto'; 

export default class SecurityHelper {

    /**
     * Генерирует hash на основании переданной строки пароля
     * @param password 
     */
    static generatePasswordHash(password: string): string {
        let secret = 'cucumber';
        return crypto.createHmac('sha1', secret).update(password).digest('hex');
    }

    /**
     * Валидация хеша пароля
     * @param password 
     * @param hash 
     */
    static validatePassword(password: string, hash: string): boolean {
        return SecurityHelper.generatePasswordHash(password) === hash;
    }
}