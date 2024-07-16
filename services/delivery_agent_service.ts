import { Collections } from "../constants/enums";
import { ObjectId } from "mongodb";
import { cachedDbConnection } from "../config/database";

export const fetchDeliveryAgents = async () => {
    return await (await cachedDbConnection())
        .collection(Collections.DELIVERY_AGENT)
        .find({available: true})
        .toArray();
}

export const updateDeliveryAgentAvailability = async (delivery_agent_id: string, available: boolean) => {
    return await (await cachedDbConnection())
        .collection(Collections.DELIVERY_AGENT)
        .updateOne(
            {
                _id: new ObjectId(delivery_agent_id)
            },
            {
                $set: {
                    available
                }
            }
        );
}
