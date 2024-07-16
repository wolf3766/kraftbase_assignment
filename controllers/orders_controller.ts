import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { response } from '../helper/response';
import { Iorder, IorderRating } from '../models/order.model';
import { fetchOrders, createOrder, updateUserRating, updateOrderDeliveryStatus } from '../services/order_service';
import { fetchDeliveryAgents } from '../services/delivery_agent_service';

export const createRestaurantOrder = async (req: Request, res: Response) => {
    try {
        const order = req.body;
        const agent_id = await fetchDeliveryAgents();
        order.delivery_agent_id = agent_id[0]._id;
        const order_id = (await createOrder({...order} as Iorder)).insertedId;
        return response.setSuccess(
            true,
            StatusCodes.OK,
            {
                message: "Order placed successfully",
                data: {
                    order_id
                }
            },
            "Order placed successfully"
        ).send(res);
    } catch (error) {
        return response.setError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "Internal server error",
            error
        ).send(res);
    }
}
export const getUserOrders = async (req: Request, res: Response) => {
    try {
        const orders = await fetchOrders(req.body.user_id);
        return response.setSuccess(
            true,
            StatusCodes.OK,
            {
                message: "Orders fetched successfully",
                data: orders
            },
            "Orders fetched successfully"
        ).send(res);
    } catch (error) {
        return response.setError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "Internal server error",
            error
        ).send(res);
    }
}

export const updateOrderRating = async (req: Request, res: Response) => {
    try {
        const order = req.body;
        await updateUserRating({...order} as IorderRating);
        return response.setSuccess(
            true,
            StatusCodes.OK,
            {
                message: "Order rating updated successfully"
            },
            "Order rating updated successfully"
        ).send(res);
    } catch (error) {
        return response.setError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "Internal server error",
            error
        ).send(res);
    }
}

export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const order = req.body;
        await updateOrderDeliveryStatus(order.order_id, order.order_status);
        return response.setSuccess(
            true,
            StatusCodes.OK,
            {
                message: "Order status updated successfully"
            },
            "Order status updated successfully"
        ).send(res);
    } catch (error) {
        return response.setError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "Internal server error",
            error
        ).send(res);
    }
}
