import * as yup from "yup";

export const ProductAddSchema = yup.object().shape({
  dealer_id: yup.number().required(),
  name: yup.string().required(),
  image: yup.mixed(),
  price: yup.number().required(),
  description: yup.string().required(),
});

export const ProductUpdateSchema = yup.object().shape({
  name: yup.string().required(),
  image: yup.mixed(),
  price: yup.number().required(),
  description: yup.string().required(),
});
