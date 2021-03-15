import * as yup from "yup";

export const AdminSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8)
});