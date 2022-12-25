import { Router } from "express";

import { isAuthenticated } from "./middlewares/isAuthenticated";

// user
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { UpdateUserController } from "./controllers/user/UpdateUserController";

// haircut
import { CreateHaircutController } from "./controllers/haircut/CreateHaircutController";
import { ListHaircutController } from "./controllers/haircut/ListHaircutController";
import { UpdateHaircutController } from "./controllers/haircut/UpdateHaircutController";
import { CheckSubscriptionController } from './controllers/haircut/CheckSubscriptionController';
import { CountHaircutsController } from './controllers/haircut/CountHaircutsController';
import { DetailsHaircutController } from './controllers/haircut/DetailsHaircutController';

// schedule
import { NewScheduleController } from './controllers/schedule/NewScheduleController';
import { ListScheduleController } from './controllers/schedule/ListScheduleController';
import { FinishScheduleController } from './controllers/schedule/FinishScheduleController';

const router = Router();

// Create user
router.post("/users", new CreateUserController().handle);

// Login user
router.post("/session", new AuthUserController().handle);

// Details user
router.get("/me", isAuthenticated, new DetailUserController().handle);

// Update user
router.put("/user/update", isAuthenticated, new UpdateUserController().handle);

/* ----------------------------------------------------------------------------------- */

// Create haircut
router.post("/haircut", isAuthenticated, new CreateHaircutController().handle);

// List haircuts
router.get("/haircuts", isAuthenticated, new ListHaircutController().handle);

// Update haircut
router.put("/haircut", isAuthenticated, new UpdateHaircutController().handle);

// Varify signature
router.get('/haircut/check', isAuthenticated, new CheckSubscriptionController().handle);

// Count haircuts
router.get('/haircut/count', isAuthenticated, new CountHaircutsController().handle);

// Details hairdcut
router.get('/haircut/detail', isAuthenticated, new DetailsHaircutController().handle);

/* ----------------------------------------------------------------------------------- */

// New schedule
router.post('/schedule', isAuthenticated, new NewScheduleController().handle);

// List schedules
router.get('/schedule', isAuthenticated, new ListScheduleController().handle);

// Finish schedule
router.delete('/schedule', isAuthenticated, new FinishScheduleController().handle);

export { router };
