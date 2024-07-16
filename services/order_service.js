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
exports.updateOrderDeliveryStatus = exports.updateUserRating = exports.createOrder = exports.fetchOrders = void 0;
const database_1 = require("../config/database");
const enums_1 = require("../constants/enums");
const mongodb_1 = require("mongodb");
const fetchOrders = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (yield (0, database_1.cachedDbConnection)())
        .collection(enums_1.Collections.ORDER)
        .find({ user_id })
        .sort({ order_time: -1 })
        .toArray();
});
exports.fetchOrders = fetchOrders;
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const order_entry = {
        user_id: new mongodb_1.ObjectId(order.user_id),
        restaurant_id: new mongodb_1.ObjectId(order.restaurant_id),
        delivery_agent_id: order.delivery_agent_id,
        order_status: order.order_status,
        order_time: order.order_time,
        delivery_time: order.delivery_time,
        total_price: order.total_price,
        payment_method: order.payment_method,
        order_rating: order.order_rating,
        delivery_rating: order.delivery_rating
    };
    return yield (yield (0, database_1.cachedDbConnection)())
        .collection(enums_1.Collections.ORDER)
        .insertOne(order_entry);
});
exports.createOrder = createOrder;
const updateUserRating = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const order_entry = {
        order_id: new mongodb_1.ObjectId(order.order_id),
        order_rating: order.order_rating,
        delivery_rating: order.delivery_rating
    };
    return yield (yield (0, database_1.cachedDbConnection)())
        .collection(enums_1.Collections.ORDER)
        .updateOne({ _id: order_entry.order_id }, { $set: order_entry });
});
exports.updateUserRating = updateUserRating;
const updateOrderDeliveryStatus = (order_id, order_status) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (yield (0, database_1.cachedDbConnection)())
        .collection(enums_1.Collections.ORDER)
        .updateOne({
        _id: new mongodb_1.ObjectId(order_id)
    }, {
        $set: {
            order_status
        }
    });
});
exports.updateOrderDeliveryStatus = updateOrderDeliveryStatus;
