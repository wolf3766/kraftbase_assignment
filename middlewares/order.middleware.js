"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOrderStatus = exports.validateOrderRating = exports.validateOrder = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../helper/response");
const joi_1 = __importDefault(require("joi"));
const validateOrder = (req, res, next) => {
    try {
        const schema = joi_1.default.object({
            user_id: joi_1.default.string().required(),
            restaurant_id: joi_1.default.string().required(),
            delivery_agent_id: joi_1.default.string().required(),
            order_status: joi_1.default.string().required(),
            order_time: joi_1.default.date().required(),
            delivery_time: joi_1.default.date().required(),
            total_price: joi_1.default.number().required(),
            payment_method: joi_1.default.string().required(),
            order_rating: joi_1.default.string().required(),
            delivery_rating: joi_1.default.string().required()
        });
        req.body = schema.validate(req.body);
        return next();
    }
    catch (error) {
        return response_1.response.setError(http_status_codes_1.StatusCodes.BAD_REQUEST, error, {}).send(res);
    }
};
exports.validateOrder = validateOrder;
const validateOrderRating = (req, res, next) => {
    try {
        const schema = joi_1.default.object({
            order_id: joi_1.default.string().required(),
            order_rating: joi_1.default.string().required(),
            delivery_rating: joi_1.default.string().required(),
            status: joi_1.default.string().optional()
        });
        req.body = schema.validate(req.body);
        return next();
    }
    catch (error) {
        return response_1.response.setError(http_status_codes_1.StatusCodes.BAD_REQUEST, error, {}).send(res);
    }
};
exports.validateOrderRating = validateOrderRating;
const validateOrderStatus = (req, res, next) => {
    try {
        const schema = joi_1.default.object({
            order_id: joi_1.default.string().required(),
            order_status: joi_1.default.string().required()
        });
        req.body = schema.validate(req.body);
        return next();
    }
    catch (error) {
        return response_1.response.setError(http_status_codes_1.StatusCodes.BAD_REQUEST, error, {}).send(res);
    }
};
exports.validateOrderStatus = validateOrderStatus;
