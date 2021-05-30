import * as yup from "yup";

export const orderSchema = yup.object().shape({
  payment_method: yup.number().required(),
  product_id: yup.number().required(),
  customer_id: yup.number().required(),
  cart_id: yup.number().required(),
  quantity: yup.number().required(),
  total_price: yup.number().required(),
  address: yup.string().required(),
  number: yup.string(),
  name: yup.string(),
  exp_month: yup.string(),
  exp_year: yup.string(),
  cvc: yup.string(),
});
