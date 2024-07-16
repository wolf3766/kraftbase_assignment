"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDeliveryAgentStatus = exports.getAvailableDeliveryAgents = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../helper/response");
const delivery_agent_service_1 = require("../services/delivery_agent_service");
const getAvailableDeliveryAgents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, delivery_agent_service_1.fetchDeliveryAgents)();
        return response_1.response.setSuccess(true, http_status_codes_1.StatusCodes.OK, {
            message: "Delivery agents fetched successfully",
            data: data
        }, "Delivery agents fetched successfully").send(res);
    }
    catch (error) {
        return response_1.response.setError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Internal server error", error).send(res);
    }
});
exports.getAvailableDeliveryAgents = getAvailableDeliveryAgents;
const updateDeliveryAgentStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { delivery_agent_id, available } = req.body;
        yield (0, delivery_agent_service_1.updateDeliveryAgentAvailability)(delivery_agent_id, available);
        return response_1.response.setSuccess(true, http_status_codes_1.StatusCodes.OK, {
            message: "Delivery agent availability updated successfully"
        }, "Delivery agent availability updated successfully").send(res);
    }
    catch (error) {
        return response_1.response.setError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Internal server error", error).send(res);
    }
});
exports.updateDeliveryAgentStatus = updateDeliveryAgentStatus;
