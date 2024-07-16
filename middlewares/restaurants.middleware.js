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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRestaurant = validateRestaurant;
exports.validateRestaurantMenu = validateRestaurantMenu;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../helper/response");
const joi_1 = __importDefault(require("joi"));
function validateRestaurant(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const schema = joi_1.default.object({
                restaurant_id: joi_1.default.string().required(),
                available: joi_1.default.boolean().required()
            });
            req.body = yield schema.validateAsync(req.body);
            return next();
        }
        catch (error) {
            return response_1.response.setError(http_status_codes_1.StatusCodes.BAD_REQUEST, error, {}).send(res);
        }
    });
}
function validateRestaurantMenu(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const schema = joi_1.default.object({
                food_id: joi_1.default.string().required(),
                available: joi_1.default.boolean().required(),
                price: joi_1.default.number().required(),
                restaurant_id: joi_1.default.string().required()
            });
            req.body = yield schema.validateAsync(req.body);
            return next();
        }
        catch (error) {
            return response_1.response.setError(http_status_codes_1.StatusCodes.BAD_REQUEST, error, {}).send(res);
        }
    });
}
