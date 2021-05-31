import express from "express";
import controller from "../controllers/slider";
import extractAdminJWT from "../helpers/extractAdminJWT";
import extractUserJWT from "../helpers/extractUserJWT";
import { extractRequest } from "../helpers/extractRequest";
import { SliderSchema } from "../validations/slider";
import { upload } from "../helpers/uploadImage";

export const sliderRouter = express.Router();

//admin
sliderRouter.post(
  "/api/v1/admin/slider/add",
  extractAdminJWT,
  upload.single("image"),
  extractRequest(SliderSchema),
  controller.addSliderImage
);
sliderRouter.put(
  "/api/v1/admin/slider/update/:id",
  extractAdminJWT,
  upload.single("image"),
  extractRequest(SliderSchema),
  controller.updateSliderImage
);
sliderRouter.get(
  "/api/v1/admin/slider/get",
  extractAdminJWT,
  controller.getAllSliderImages
);
sliderRouter.delete(
  "/api/v1/admin/slider/delete/:id",
  extractAdminJWT,
  controller.deleteSliderImage
);

//customer
sliderRouter.get(
  "/api/v1/user/customer/slider/get",
  extractUserJWT,
  controller.getAllSliderImages
);
