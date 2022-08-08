import { Router } from 'express';
import cryptoRouter from './crypto-router';


// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/crypto', cryptoRouter);

// Export default.
export default baseRouter;
