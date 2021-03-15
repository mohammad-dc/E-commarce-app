import * as yup from "yup";

export const SliderSchema = yup.object().shape({
    image: yup.mixed(),
});