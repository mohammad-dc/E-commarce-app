import express from "express";
import controller from "../controllers/admin";

export const adminRouter = express.Router();

adminRouter.get('/admin/auth/login', controller.getAdminLogin);
adminRouter.get('/admin/dashboard', controller.getAdminDashboard);