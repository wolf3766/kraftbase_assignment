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
exports.updateRestaurantStatus = exports.updateRestaurantFoodAvailability = exports.fetchOnlineRestaurants = void 0;
const database_1 = require("../config/database");
const enums_1 = require("../constants/enums");
const mongodb_1 = require("mongodb");
const fetchOnlineRestaurants = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (yield (0, database_1.cachedDbConnection)())
        .collection(enums_1.Collections.RESTAURANT)
        .find({ taking_order: true })
        .toArray();
});
exports.fetchOnlineRestaurants = fetchOnlineRestaurants;
const updateRestaurantFoodAvailability = (food) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (yield (0, database_1.cachedDbConnection)())
        .collection(enums_1.Collections.RESTAURANT_FOOD)
        .updateOne({
        restaurant_id: new mongodb_1.ObjectId(food.restaurant_id),
        food_id: new mongodb_1.ObjectId(food.food_id)
    }, {
        $set: {
            price: food.price,
            available: food.available
        }
    });
});
exports.updateRestaurantFoodAvailability = updateRestaurantFoodAvailability;
const updateRestaurantStatus = (restaurant_id, available) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (yield (0, database_1.cachedDbConnection)())
        .collection(enums_1.Collections.RESTAURANT)
        .updateOne({
        _id: new mongodb_1.ObjectId(restaurant_id)
    }, {
        $set: {
            taking_order: available
        }
    });
});
exports.updateRestaurantStatus = updateRestaurantStatus;
