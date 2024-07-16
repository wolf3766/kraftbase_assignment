import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { response } from "../helper/response";
import { fetchOnlineRestaurants, updateRestaurantFoodAvailability, updateRestaurantStatus } from "../services/restaurant_service";
import { Irestaurant_food_update } from "../models/restaurant_food.model";

export const getOnlineRestaurants = async (req: Request, res: Response) => {
    try {
        const onlineRestaurants = await fetchOnlineRestaurants();
        return response.setSuccess(
            true,
            StatusCodes.OK,
            {
                message: "Online restaurants fetched successfully",
                data: onlineRestaurants
            },
            "Online restaurants fetched successfully"
        ).send(res);
    } catch (error) {
        return response.setError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "Internal server error",
            error
        ).send(res);
    }
}

export const updateRestaurantMenu = async (req: Request, res: Response) => {
    try {
        const food = req.body;
        await updateRestaurantFoodAvailability({...food} as Irestaurant_food_update);

        return response.setSuccess(
            true,
            StatusCodes.OK,
            {
                message: "Restaurant data updated successfully"
            },
            "Restaurant data updated successfully"
        ).send(res);
    } catch (error) {
        return response.setError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "Internal server error",
            error
        ).send(res);
    }
}

export const updateRestaurantAvailabilty = async (req: Request, res: Response) => {
    try {
        const available = req.body;
        await updateRestaurantStatus(available.restaurant_id, available.available);

        return response.setSuccess(
            true,
            StatusCodes.OK,
            {
                message: "Restaurant availability updated successfully"
            },
            "Restaurant availability updated successfully"
        ).send(res);
    } catch (error) {
        return response.setError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "Internal server error",
            error
        ).send(res);
    }
}