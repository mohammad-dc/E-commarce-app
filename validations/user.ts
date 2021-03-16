import * as yup from "yup";

export const userSignupSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8),
    name: yup.string().required(),
    address:  yup.string().required(),
    phone:  yup.string().required(),
});

export const userLoginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8),
});

export const userUpdateSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8),
    name: yup.string().required(),
    address:  yup.string().required(),
    phone:  yup.string().required(),
    image: yup.mixed()
});