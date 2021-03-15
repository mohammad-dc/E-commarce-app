import * as yup from "yup";

export const TransitionPricingSchema = yup.object().shape({
    from_city: yup.string().required(),
    to_city: yup.string().required(),
    price: yup.number().required()
});