import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { response } from "../helper/response";
import Joi from "joi"

export const validateDeliveryAgent = (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            delivery_agent_id: Joi.string().required(),
            available: Joi.boolean().required()
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

