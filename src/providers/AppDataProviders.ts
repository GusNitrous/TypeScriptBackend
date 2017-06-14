/**
 * AppDataProviders
 * Хранилище провайдеров приложения
 */
import DataProvider from './DataProvider';
import UserDataProvider from './UserDataProvider';

export default class AppDataProviders {
    /**
     * Экземпляры провайдеров данных
     */
    private store: DataProvider[];

    constructor() {
        this.store = this.getProviders()
            .map(provider => new provider());
    }

    /**
     * Возвращает провайдер данных пользователя
     */
    get user(): UserDataProvider {
        return this.getInstanceProvider(UserDataProvider);
    }

    /**
     * Возвращает указанный экземпляр провайдера
     * @param typeProvider 
     */
    private getInstanceProvider(typeProvider: any): any | null {
        let items = this.store.filter((provider) => {
            if (provider instanceof typeProvider) {
                return provider;
            }
        });
        return items.length > 0 ? items[0] : null;
    }

    /**
     * Провайдеры для инициализации
     */
    private getProviders(): any[] {
        return [
            UserDataProvider
        ];
    }
}