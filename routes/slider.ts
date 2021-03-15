import express from "express";
import controller from "../controllers/slider";
import extractAdminJWT from "../helpers/extractAdminJWT";
import {extractRequest} from "../helpers/extractRequest";
import {SliderSchema} from "../validations/slider";
import {upload} from "../helpers/uploadImage";

export const sliderRouter = express.Router();

sliderRouter.post('/api/v1/admin/slider/add', extractAdminJWT, upload, extractRequest(SliderSchema), controller.addSliderImage);
sliderRouter.put('/api/v1/admin/slider/update/:id', extractAdminJWT, upload, extractRequest(SliderSchema), controller.updateSliderImage);
sliderRouter.get('/api/v1/admin/slider/get', extractAdminJWT, extractRequest(SliderSchema), controller.getAllSliderImages);
sliderRouter.delete('/api/v1/admin/slider/delete/:id', extractAdminJWT, extractRequest(SliderSchema), controller.deleteSliderImage);