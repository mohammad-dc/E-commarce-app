import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51I5DImG6njS6yn7OXY3aF61Ha7SuaMfBoCPZXLBDuFTgpqnkL76sej3aYyGgxpBS7CJJdoAKtWEWt28hhDOHCYE500XKuJ8nvf",
  {
    apiVersion: "2020-08-27",
  }
);

type Card = {
  number: string;
  exp_month: string;
  exp_year: string;
  cvc: string;
};

type Charge = {
  amount: string;
  currency: string;
  description: string;
  customer: string;
};

const createCustomer = async (
  email: string,
  name: string,
  callback: (error: Error | null, customer: any | null) => void
) => {
  let param: { email: string; name: string } = { email, name };
  //@ts-ignore
  await stripe.customers.create(param, async (error: Error, customers: any) => {
    if (error) {
      callback(error, null);
    } else if (customers) {
      callback(null, customers);
    } else {
      callback(error, null);
    }
  });
};

const retrieveCustomer = (customer_id: string) => {
  //@ts-ignore
  stripe.customers.retrieve(customer_id, (error: Error, customers: any) => {
    if (error) console.log(`retrieve customer error: ${error}`);
    if (customers) return JSON.stringify(customers, null, 2);
    else console.log("something went wrong");
  });
};

const createToken = (
  number: string,
  exp_month: string,
  exp_year: string,
  cvc: string,
  callback: (error: Error | null, token: any | null) => void
) => {
  let param: { card: Card } = {
    card: {
      number,
      exp_month,
      exp_year,
      cvc,
    },
  };
  //@ts-ignore
  stripe.tokens.create(param, (error: Error, token: any) => {
    if (error) callback(error, null);
    if (token) callback(null, token);
    else callback(error, null);
  });
};

const addCardToCustomer = (customer_id: string, source: string) => {
  //@ts-ignore
  stripe.customers.createSource(
    customer_id,
    { source },
    //@ts-ignore
    (error: Error, card: any) => {
      if (error) console.log(`retrieve customer error: ${error}`);
      if (card) return JSON.stringify(card, null, 2);
      else console.log("something went wrong");
    }
  );
};

const chargeCustomer = (
  amount: string,
  currency: string,
  description: string,
  customer: string
) => {
  let param: Charge = {
    amount,
    currency,
    description,
    customer,
  };
  //@ts-ignore
  stripe.charges.create(param, (error: Error, charge: any) => {
    if (error) console.log(`retrieve customer error: ${error}`);
    if (charge) return JSON.stringify(charge, null, 2);
    else console.log("something went wrong");
  });
};

export default {
  createCustomer,
  retrieveCustomer,
  createToken,
  addCardToCustomer,
  chargeCustomer,
};
