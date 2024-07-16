import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { response } from '../helper/response';
import Joi from 'joi';

export async function validateRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
        const schema = Joi.object({
            restaurant_id: Joi.string().required(),
            available: Joi.boolean().required()
        });
        
        req.body = await schema.validateAsync(req.body);
        return next();
    }catch(error : any) {
        return response.setError(
            StatusCodes.BAD_REQUEST,
            error,
            {}
        ).send(res);
    }
}

export async function validateRestaurantMenu(req: Request, res: Response, next: NextFunction) {
    try {
        const schema = Joi.object({
            food_id: Joi.string().required(),
            available: Joi.boolean().required(),
            price: Joi.number().required(),
            restaurant_id: Joi.string().required()
        });
        
        req.body = await schema.validateAsync(req.body);
        return next();
    } catch (error: any) {
        return response.setError(
            StatusCodes.BAD_REQUEST,
            error,
            {}
        ).send(res);   
    }
}

