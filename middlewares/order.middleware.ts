import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { response } from "../helper/response";
import Joi from "joi"

export const validateOrder = (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            user_id: Joi.string().required(),
            restaurant_id: Joi.string().required(),
            delivery_agent_id: Joi.string().required(),
            order_status: Joi.string().required(),
            order_time: Joi.date().required(),
            delivery_time: Joi.date().required(),
            total_price: Joi.number().required(),
            payment_method: Joi.string().required(),
            order_rating: Joi.string().required(),
            delivery_rating: Joi.string().required()
        });

        req.body = schema.validate(req.body);
        return next();
    } catch (error: any) {
        return response.setError(
            StatusCodes.BAD_REQUEST,
            error,
            {}
        ).send(res);
    }
}

export const validateOrderRating = (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            order_id: Joi.string().required(),
            order_rating: Joi.string().required(),
            delivery_rating: Joi.string().required(),
            status: Joi.string().optional()
        });

        req.body = schema.validate(req.body);
        return next();
    } catch (error: any) {
        return response.setError(
            StatusCodes.BAD_REQUEST,
            error,
            {}
        ).send(res);
    }
}

export const validateOrderStatus = (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            order_id: Joi.string().required(),
            order_status: Joi.string().required()
        });

        req.body = schema.validate(req.body);
        return next();
    } catch (error: any) {
        return response.setError(
            StatusCodes.BAD_REQUEST,
            error,
            {}
        ).send(res);
    }
}
