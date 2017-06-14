/**
 * UserDataProvider
 * Провайдер данных пользователя
 */
import DataProvider from './DataProvider';
import User from '../models/User';

export default class UserDataProvider extends DataProvider {
    constructor() {
        super('User');
    }

    /**
     * Загрузка массива данных по условию
     * @param where 
     * @param onSelect callback
     */
    select(where: any, onSelect: (err: any, users: User[]) => void) {
        this.store.find(where, onSelect);
    }

    /**
     * Создание нового пользователя
     * @param data User
     * @param onCreate callback 
     */
    create(data: User, onCreate: (err: any, newData: User) => void) {
        this.store.insert(data, onCreate);
    }

    /**
     * Обновление данных пользователя
     * @param where update where
     * @param newData User
     * @param onUpdate callback 
     */
    update(where: any, newData: User, onUpdate?: (err: any, numReplaced: number) => void) {
        this.store.update(where, {$set: newData}, onUpdate);
    }

    /**
     * Удаление записей по условию
     * @param where 
     * @param onDelete callback
     */
    delete(where: any, onDelete?: (err: any, numRemoved: number) => void) {
        this.store.remove(where, {multi: true}, onDelete);
    }

    /**
     * Загрузка экземпляра пользователя
     * @param where 
     * @param onSelect callback
     */
    findOne(where: any, onSelect: (err: any, user: User) => void) {
        this.store.findOne(where, onSelect);
    }

    /**
     * @inheritdoc
     * @param err 
     */
    protected onLoadStore(err: any) {
        if (err !== null) {
            console.error(err);
        }
    }
}