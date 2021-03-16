import express from "express";
import controller from "../controllers/product";
import extractAdminJWT from "../helpers/extractAdminJWT";
import extractUserJWT from "../helpers/extractUserJWT";
import {extractRequest} from "../helpers/extractRequest";
import {ProductAddSchema, ProductUpdateSchema} from "../validations/product";
import {upload} from "../helpers/uploadImage";

export const productRouter = express.Router();

// dealer
productRouter.post('/api/v1/user/dealer/product/add', extractUserJWT, upload.single('image'), extractRequest(ProductAddSchema), controller.addProduct);
productRouter.put('/api/v1/user/dealer/product/update/:id', extractUserJWT, upload.single('image'), extractRequest(ProductUpdateSchema), controller.updateProducts);
productRouter.delete('/api/v1/user/dealer/product/delete/:id', extractUserJWT, controller.deleteProduct);
productRouter.get('/api/v1/user/dealer/product/get/:dealer_id', extractUserJWT, controller.getAllDealerProducts);

//admin
productRouter.delete('/api/v1/admin/product/delete/:id', extractAdminJWT, controller.deleteProduct);
productRouter.get('/api/v1/admin/product/get', extractAdminJWT, controller.getAllProducts);

//user
productRouter.post('/api/v1/user/customer/product/search/:search_name', extractUserJWT, controller.searchProduct);
productRouter.put('/api/v1/user/customer/product/get', extractUserJWT, controller.getAllProducts);
