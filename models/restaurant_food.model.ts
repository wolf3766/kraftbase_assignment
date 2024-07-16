import {ObjectId} from 'mongodb';

export interface Irestaurant_food {
    restaurant_id: ObjectId,
    food_id: ObjectId,
    price: number,
    available: boolean
}

export interface Irestaurant_food_update {
    restaurant_id: ObjectId,
    food_id: ObjectId,
    price: number,
    available: boolean
}
