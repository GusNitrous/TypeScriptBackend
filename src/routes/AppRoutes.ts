/**
 * AppRoutes
 * Модуль подключения корневых маршрутизаторов приложения
 */
import { Express, Router } from 'express';

import IPathRoute from '../core/IPathRoute';
import UserRoute from './UserRoute';

export default class AppRoutes {
    /**
     * Корневые маршрутизаторы
     */
    private routeList: IPathRoute[] = [
        {path: '/user', router: UserRoute}
    ];

    /**
     * Подключение маршрутизаторов
     * @param expApp 
     */
    mount(expApp: Express): void {
        this.routeList.forEach((item) => {
            expApp.use(
                item.path, 
                item.router.createRouter(Router)
            );
        });
    }
}