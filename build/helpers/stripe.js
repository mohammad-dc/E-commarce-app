"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var stripe_1 = __importDefault(require("stripe"));
var stripe = new stripe_1.default("sk_test_51I5DImG6njS6yn7OXY3aF61Ha7SuaMfBoCPZXLBDuFTgpqnkL76sej3aYyGgxpBS7CJJdoAKtWEWt28hhDOHCYE500XKuJ8nvf", {
    apiVersion: "2020-08-27",
});
var createCustomer = function (email, name, callback) { return __awaiter(void 0, void 0, void 0, function () {
    var param;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                param = { email: email, name: name };
                //@ts-ignore
                return [4 /*yield*/, stripe.customers.create(param, function (error, customers) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (error) {
                                callback(error, null);
                            }
                            else if (customers) {
                                callback(null, customers);
                            }
                            else {
                                callback(error, null);
                            }
                            return [2 /*return*/];
                        });
                    }); })];
            case 1:
                //@ts-ignore
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var retrieveCustomer = function (customer_id) {
    //@ts-ignore
    stripe.customers.retrieve(customer_id, function (error, customers) {
        if (error)
            console.log("retrieve customer error: " + error);
        if (customers)
            return JSON.stringify(customers, null, 2);
        else
            console.log("something went wrong");
    });
};
var createToken = function (number, exp_month, exp_year, cvc, callback) {
    var param = {
        card: {
            number: number,
            exp_month: exp_month,
            exp_year: exp_year,
            cvc: cvc,
        },
    };
    //@ts-ignore
    stripe.tokens.create(param, function (error, token) {
        if (error)
            callback(error, null);
        if (token)
            callback(null, token);
        else
            callback(error, null);
    });
};
var addCardToCustomer = function (customer_id, source) {
    //@ts-ignore
    stripe.customers.createSource(customer_id, { source: source }, 
    //@ts-ignore
    function (error, card) {
        if (error)
            console.log("retrieve customer error: " + error);
        if (card)
            return JSON.stringify(card, null, 2);
        else
            console.log("something went wrong");
    });
};
var chargeCustomer = function (amount, currency, description, customer) {
    var param = {
        amount: amount,
        currency: currency,
        description: description,
        customer: customer,
    };
    //@ts-ignore
    stripe.charges.create(param, function (error, charge) {
        if (error)
            console.log("retrieve customer error: " + error);
        if (charge)
            return JSON.stringify(charge, null, 2);
        else
            console.log("something went wrong");
    });
};
exports.default = {
    createCustomer: createCustomer,
    retrieveCustomer: retrieveCustomer,
    createToken: createToken,
    addCardToCustomer: addCardToCustomer,
    chargeCustomer: chargeCustomer,
};
