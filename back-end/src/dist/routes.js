"use strict";
exports.__esModule = true;
exports.router = void 0;
var express_1 = require("express");
var CreateUserController_1 = require("./controllers/user/CreateUserController");
var AuthUserController_1 = require("./controllers/user/AuthUserController");
var DetailUserController_1 = require("./controllers/user/DetailUserController");
var UpdateUserController_1 = require("./controllers/user/UpdateUserController");
var isAuthenticated_1 = require("./middlewares/isAuthenticated");
var router = express_1.Router();
exports.router = router;
// Create user
router.post('/users', new CreateUserController_1.CreateUserController().handle);
// Login user
router.post('/session', new AuthUserController_1.AuthUserController().handle);
// Details user
router.get('/me', isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailUserController().handle);
// Update user
router.put('/user/update', isAuthenticated_1.isAuthenticated, new UpdateUserController_1.UpdateUserController().handle);
