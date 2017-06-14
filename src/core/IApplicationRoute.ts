/**
 * Интерфейс IApplicationRoute
 * Описывает структуру маршрутизатора
 */

import { Router } from 'express';

interface IApplicationRoute {
    createRouter(router): Router;
}

export default IApplicationRoute;