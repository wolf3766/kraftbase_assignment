import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { response } from "../helper/response";
import { fetchDeliveryAgents, updateDeliveryAgentAvailability } from "../services/delivery_agent_service";

export const getAvailableDeliveryAgents = async (req: Request, res: Response) => {
    try {
        const data = await fetchDeliveryAgents();
        return response.setSuccess(
            true,
            StatusCodes.OK,
            {
                message: "Delivery agents fetched successfully",
                data: data
            },
            "Delivery agents fetched successfully"
        ).send(res);
    } catch (error) {
        return response.setError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "Internal server error",
            error
        ).send(res);
    }
}

export const updateDeliveryAgentStatus = async (req: Request, res: Response) => {
    try {
        const { delivery_agent_id, available } = req.body;
        await updateDeliveryAgentAvailability(delivery_agent_id, available);
        return response.setSuccess(
            true,
            StatusCodes.OK,
            {
                message: "Delivery agent availability updated successfully"
            },
            "Delivery agent availability updated successfully"
        ).send(res);
    } catch (error) {
        return response.setError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "Internal server error",
            error
        ).send(res);
    }
}