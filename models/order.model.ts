import {ObjectId} from 'mongodb';

export interface Iorder {   
    user_id: ObjectId,
    restaurant_id: ObjectId,
    delivery_agent_id: string,
    order_status: string,
    order_time: Date,
    total_price: number,
    payment_method: string,
    order_rating: string,
    delivery_rating: string
}

export interface IorderRating {
    order_id: ObjectId,
    order_rating: string,
    delivery_rating: string,
    status?: string
}
