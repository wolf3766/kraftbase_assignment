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
exports.updateRestaurantAvailabilty = exports.updateRestaurantMenu = exports.getOnlineRestaurants = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../helper/response");
const restaurant_service_1 = require("../services/restaurant_service");
const getOnlineRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const onlineRestaurants = yield (0, restaurant_service_1.fetchOnlineRestaurants)();
        console.log("res", onlineRestaurants);
        return response_1.response.setSuccess(true, http_status_codes_1.StatusCodes.OK, {
            message: "Online restaurants fetched successfully",
            data: onlineRestaurants
        }, "Online restaurants fetched successfully").send(res);
    }
    catch (error) {
        return response_1.response.setError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Internal server error", error).send(res);
    }
});
exports.getOnlineRestaurants = getOnlineRestaurants;
const updateRestaurantMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const food = req.body;
        yield (0, restaurant_service_1.updateRestaurantFoodAvailability)(Object.assign({}, food));
        return response_1.response.setSuccess(true, http_status_codes_1.StatusCodes.OK, {
            message: "Restaurant data updated successfully"
        }, "Restaurant data updated successfully").send(res);
    }
    catch (error) {
        return response_1.response.setError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Internal server error", error).send(res);
    }
});
exports.updateRestaurantMenu = updateRestaurantMenu;
const updateRestaurantAvailabilty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const available = req.body;
        yield (0, restaurant_service_1.updateRestaurantStatus)(available.restaurant_id, available.available);
        return response_1.response.setSuccess(true, http_status_codes_1.StatusCodes.OK, {
            message: "Restaurant availability updated successfully"
        }, "Restaurant availability updated successfully").send(res);
    }
    catch (error) {
        return response_1.response.setError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Internal server error", error).send(res);
    }
});
exports.updateRestaurantAvailabilty = updateRestaurantAvailabilty;
