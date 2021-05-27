"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dealerUpdateSchema = exports.dealerLoginSchema = exports.dealerSignupSchema = void 0;
var yup = __importStar(require("yup"));
exports.dealerSignupSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8),
    name: yup.string().required(),
    type: yup.string().required(),
    address: yup.string().required(),
    phone: yup.string().required(),
    SSN_image: yup.mixed()
});
exports.dealerLoginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8),
});
exports.dealerUpdateSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8),
    name: yup.string().required(),
    address: yup.string().required(),
    phone: yup.string().required(),
    image: yup.mixed()
});
