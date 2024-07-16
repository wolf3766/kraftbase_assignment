import { Irestaurant } from "../models/restaurant.model";
import { cachedDbConnection } from "../config/database";
import { Collections } from "../constants/enums";
import { ObjectId } from "mongodb";
import { Irestaurant_food_update } from "../models/restaurant_food.model";

export const fetchOnlineRestaurants = async () => {
    return await (await cachedDbConnection())
        .collection<Irestaurant>(Collections.RESTAURANT)
        .find({ taking_order: true })
        .toArray();
}

export const updateRestaurantFoodAvailability = async (food: Irestaurant_food_update) => {
    return await (await cachedDbConnection())
        .collection<Irestaurant>(Collections.RESTAURANT_FOOD)
        .updateOne(
            {
                restaurant_id: new ObjectId(food.restaurant_id),
                food_id: new ObjectId(food.food_id)
            },
            {
                $set: {
                    price: food.price,
                    available: food.available
                }
            }
        );
}

export const updateRestaurantStatus = async (restaurant_id: string, available: boolean) => {
    return await (await cachedDbConnection())
        .collection<Irestaurant>(Collections.RESTAURANT)
        .updateOne(
            {
                _id: new ObjectId(restaurant_id)
            },
            {
                $set: {
                    taking_order: available
                }
            }
        );
}
