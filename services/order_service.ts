import { Iorder, IorderRating } from "../models/order.model";
import { cachedDbConnection } from "../config/database";
import { Collections } from "../constants/enums";
import { ObjectId } from "mongodb";

export const fetchOrders = async (user_id: ObjectId) => {
    return await (await cachedDbConnection())
        .collection<Iorder>(Collections.ORDER)
        .find({ user_id })
        .sort({ order_time: -1 })
        .toArray();
}

export const createOrder = async (order: Iorder) => {
    const order_entry:Iorder = {
        user_id: new ObjectId(order.user_id),
        restaurant_id: new ObjectId(order.restaurant_id),
        delivery_agent_id: order.delivery_agent_id,
        order_status: order.order_status,
        order_time: order.order_time,
        total_price: order.total_price,
        payment_method: order.payment_method,
        order_rating: order.order_rating,
        delivery_rating: order.delivery_rating
    }
    return await (await cachedDbConnection())
        .collection<Iorder>(Collections.ORDER)
        .insertOne(order_entry);
}

export const updateUserRating = async (order: IorderRating) => {
    const order_entry: IorderRating = {
        order_id: new ObjectId(order.order_id),
        order_rating: order.order_rating,
        delivery_rating: order.delivery_rating
    }
    return await (await cachedDbConnection())
        .collection<Iorder>(Collections.ORDER)
        .updateOne({ _id: order_entry.order_id }, { $set: order_entry });
}

export const updateOrderDeliveryStatus = async (order_id: string, order_status: string) => {
    return await (await cachedDbConnection())
        .collection<Iorder>(Collections.ORDER)
        .updateOne(
            {
                _id: new ObjectId(order_id)
            },
            {
                $set: {
                    order_status
                }
            }
        );
}