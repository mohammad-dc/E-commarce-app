import * as yup from "yup";

export const CartSchema = yup.object().shape({
    quantity: yup.number().required(),
    total_price: yup.number().required(),
});
