import * as yup from "yup";

export const CreditCardSchema = yup.object().shape({
    owner_id: yup.number().required(),
    owner_type: yup.string().required(),
    card_number: yup.string().required(),
    expired_time: yup.string().required(),
    security_code: yup.string().required(),
    zip_code: yup.string().required()
});
