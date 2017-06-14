/**
 * Интерфейс IPathRoute
 * Описывает структуру объекта подключения маршрута
 */

import IApplicationRoute from './IApplicationRoute';

interface IPathRoute {
    path: string,
    router: IApplicationRoute
}

export default IPathRoute;