import express from 'express';
import ProductRoute from '../routes/product.route';
import UserRoute from '../routes/user.route';
import deserializeUser from '../middleware/deserializeUser';
import AuthRoute from '../routes/auth.route';

function createServer() {
    const app = express();

    app.use(express.json());

    app.use(deserializeUser);

    app.use('/api', new ProductRoute().router);
    app.use('/api', new UserRoute().router);
    app.use('/api', new AuthRoute().router);
    return app;
}

export default createServer;
