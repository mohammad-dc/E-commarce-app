import express from "express";
import controller from "../controllers/admin";

export const adminRouter = express.Router();

adminRouter.get('/admin/auth/login', (req, res) => res.render('login', {title: 'Login'}));
adminRouter.get('/admin/dashboard', controller.getAdminDashboard);
adminRouter.get('/admin/auth/logout', controller.isLoggedOut, controller.adminLogout);
adminRouter.post('/admin/auth/login', controller.auth);