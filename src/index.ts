/**
 * Bootstrap скрипт
 */
import App from './App';

const APP_CONFIG = {
    listenPort: 8080,
    appName: 'Example Application'
};

try {

    (new App(APP_CONFIG)).run();

} catch (e) {
    console.error(e.message);
}