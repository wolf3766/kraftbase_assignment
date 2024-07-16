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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.updateOrderRating = exports.getUserOrders = exports.createRestaurantOrder = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../helper/response");
const order_service_1 = require("../services/order_service");
const createRestaurantOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        const order_id = (yield (0, order_service_1.createOrder)(Object.assign({}, order))).insertedId;
        return response_1.response.setSuccess(true, http_status_codes_1.StatusCodes.OK, {
            message: "Order placed successfully",
            data: {
                order_id
            }
        }, "Order placed successfully").send(res);
    }
    catch (error) {
        return response_1.response.setError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Internal server error", error).send(res);
    }
});
exports.createRestaurantOrder = createRestaurantOrder;
const getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield (0, order_service_1.fetchOrders)(req.body.user_id);
        return response_1.response.setSuccess(true, http_status_codes_1.StatusCodes.OK, {
            message: "Orders fetched successfully",
            data: orders
        }, "Orders fetched successfully").send(res);
    }
    catch (error) {
        return response_1.response.setError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Internal server error", error).send(res);
    }
});
exports.getUserOrders = getUserOrders;
const updateOrderRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        yield (0, order_service_1.updateUserRating)(Object.assign({}, order));
        return response_1.response.setSuccess(true, http_status_codes_1.StatusCodes.OK, {
            message: "Order rating updated successfully"
        }, "Order rating updated successfully").send(res);
    }
    catch (error) {
        return response_1.response.setError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Internal server error", error).send(res);
    }
});
exports.updateOrderRating = updateOrderRating;
const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        yield (0, order_service_1.updateOrderDeliveryStatus)(order.order_id, order.order_status);
        return response_1.response.setSuccess(true, http_status_codes_1.StatusCodes.OK, {
            message: "Order status updated successfully"
        }, "Order status updated successfully").send(res);
    }
    catch (error) {
        return response_1.response.setError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Internal server error", error).send(res);
    }
});
exports.updateOrderStatus = updateOrderStatus;
