import * as yup from "yup";

export const privacySchema = yup.object().shape({
  subject: yup.string().required(),
});
