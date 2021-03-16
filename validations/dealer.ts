import * as yup from "yup";

export const dealerSignupSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8),
    name: yup.string().required(),
    address:  yup.string().required(),
    phone:  yup.string().required(),
    SSN_image: yup.mixed()
});

export const dealerLoginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8),
});

export const dealerUpdateSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8),
    name: yup.string().required(),
    address:  yup.string().required(),
    phone:  yup.string().required(),
    image: yup.mixed()
});