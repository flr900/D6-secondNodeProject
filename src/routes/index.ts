import { Router } from "express";

import adminsRouter from "./admins.routes";
import sessionsRouter from "./sessions.routes";

const routes = Router();

routes.use("/admins", adminsRouter);
routes.use("/sessions", sessionsRouter);

export default routes;
