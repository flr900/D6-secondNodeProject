import { Router } from 'express';

import adminsRouter from './admins.routes';
import sessionsRouter from './sessions.routes';
import rolesRouter from './roles.routes';
import membersRouter from './members.routes';
import productRouter from './products.routes';

const routes = Router();

routes.use('/admins', adminsRouter);
routes.use('/roles', rolesRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/members', membersRouter);
routes.use('/products', productRouter);

export default routes;
