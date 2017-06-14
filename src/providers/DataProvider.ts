/**
 * DataProvider
 * Базовый провайдер данных
 * Данный провайдер использует NoSQL-embedded решение "NeDB"
 * https://github.com/louischatriot/nedb
 */
import * as nedb from 'nedb';
import * as path from 'path'; 

export default abstract class DataProvider {
    /**
     * Путь до директории хранилища БД
     */
    static readonly ROOT_STORE = path.normalize(__dirname + '/../../db/');

    /**
     * Datastore
     */
    protected store: nedb;

    constructor(storeName = 'data') {
        this.store = new nedb({
            filename: DataProvider.ROOT_STORE + storeName + '.db'
        });

        this.store.loadDatabase((err) => {
            this.onLoadStore(err);
        });
    }

    /**
     * Очищает хранилище
     * Подробнее: https://github.com/louischatriot/nedb#persistence
     */
    protected vacuumStore(): void {
        if (this.store instanceof nedb) {
            this.store.persistence.compactDatafile();
        }
    }

    /**
     * Обработчик загрузки хранилища
     */
    protected abstract onLoadStore(err: any): void
}