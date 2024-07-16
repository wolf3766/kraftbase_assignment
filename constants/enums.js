"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collections = exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["CONFIRMED"] = "CONFIRMED";
    OrderStatus["PROCESSING"] = "PROCESSING";
    OrderStatus["CANCELLED"] = "CANCELLED";
    OrderStatus["DELIVERED"] = "DELIVERED";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var Collections;
(function (Collections) {
    Collections["ORDER"] = "order";
    Collections["RESTAURANT_FOOD"] = "restaurant_food";
    Collections["DELIVERY_AGENT"] = "delivery_agent";
    Collections["FOOD"] = "food";
    Collections["USER"] = "user";
    Collections["RESTAURANT"] = "restaurant";
})(Collections || (exports.Collections = Collections = {}));
