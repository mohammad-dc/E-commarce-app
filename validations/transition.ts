import * as yup from "yup";

export const TransitionSchema = yup.object().shape({
    name: yup.string().required(),
});