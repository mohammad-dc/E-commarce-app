"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransitionRouter = void 0;
var express_1 = __importDefault(require("express"));
var transition_1 = __importDefault(require("../controllers/transition"));
var extractAdminJWT_1 = __importDefault(require("../helpers/extractAdminJWT"));
var extractRequest_1 = require("../helpers/extractRequest");
var transition_2 = require("../validations/transition");
exports.TransitionRouter = express_1.default.Router();
exports.TransitionRouter.post('/api/v1/admin/transition/add', extractAdminJWT_1.default, extractRequest_1.extractRequest(transition_2.TransitionSchema), transition_1.default.addTransition);
exports.TransitionRouter.put('/api/v1/admin/transition/update/:id', extractAdminJWT_1.default, extractRequest_1.extractRequest(transition_2.TransitionSchema), transition_1.default.updateTransition);
exports.TransitionRouter.get('/api/v1/admin/transition/get', extractAdminJWT_1.default, transition_1.default.getAllTransitions);
exports.TransitionRouter.delete('/api/v1/admin/transition/delete/:id', extractAdminJWT_1.default, transition_1.default.deleteTransition);
