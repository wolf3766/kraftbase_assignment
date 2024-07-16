"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDeliveryAgent = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../helper/response");
const joi_1 = __importDefault(require("joi"));
const validateDeliveryAgent = (req, res, next) => {
    try {
        const schema = joi_1.default.object({
            delivery_agent_id: joi_1.default.string().required(),
            available: joi_1.default.boolean().required()
        });
        req.body = schema.validate(req.body);
        return next();
    }
    catch (error) {
        return response_1.response.setError(http_status_codes_1.StatusCodes.BAD_REQUEST, error, {}).send(res);
    }
};
exports.validateDeliveryAgent = validateDeliveryAgent;
