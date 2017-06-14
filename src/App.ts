/**
 * App
 * Главный класс приложения
 */
import * as express from 'express';
import { Express, Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';

import IApplicationConfig from './core/IApplicationConfig';
import AppRoutes from './routes/AppRoutes';
import AppDataProviders from './providers/AppDataProviders';

export default class App {
    /**
     * App instance 
     */
    private static app: App;

    /**
     * Express instance
     */
    private expApp: Express;

    /**
     * Провайдеры данных
     */
    private dataProviders: AppDataProviders;

    public static getInstance(): App {
        return App.app;
    }

    constructor(private config: IApplicationConfig) {
        if (App.app instanceof App) {
            throw new Error('Нельзя создать более одного экземпляра приложения');
        }
        
        this.config = config;
        this.expApp = express();
        App.app = this;
    }

    /**
     * Инициализация и запуск приложения
     */
    run(): void {
        // Подключаем использование сессий
        this.expApp.use(session({
            resave: false,
            saveUninitialized: false,
            secret: 'chuck norris',
            cookie: {maxAge: 3600000} 
        }));

        // Подключаем возможность обрабатывать запросы через 
        // формы типа: application/x-www-form-urlencoded
        this.expApp.use(bodyParser.urlencoded({extended: false}));

        this.expApp.use((req: Request, res: Response, next: NextFunction) => {
            res.contentType('application/json');
            next();
        });

        // Подключаем провайдеры
        this.dataProviders = new AppDataProviders();

        // Подключаем маршрутизацию
        let appRouter = new AppRoutes();
        appRouter.mount(this.expApp);

        // Запускаем сервер
        this.expApp.listen(this.config.listenPort, (err) => {
            if (err !== undefined) {
                console.log(err);
            } else {
                console.log("Server run on port: " + this.config.listenPort);    
            }
        });
    }

    /**
     * Возвращает провайдеры данных
     */
    get providers(): AppDataProviders {
        return this.dataProviders;
    }
}