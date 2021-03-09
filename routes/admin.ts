import express from "express";
import controller from "../controllers/admin";

export const adminRouter = express.Router();

adminRouter.get('/admin/auth/login', controller.isLoggedIn, controller.getAdminLogin);
adminRouter.get('/admin/dashboard', controller.getAdminDashboard);
adminRouter.get('/admin/auth/logout', controller.isLoggedOut, controller.adminLogout);
adminRouter.post('/admin/auth/login', controller.auth);