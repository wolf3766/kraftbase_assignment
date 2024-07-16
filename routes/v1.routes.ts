import {Router} from "express"
import { createRestaurantOrder, getUserOrders, updateOrderRating, updateOrderStatus } from "../controllers/orders_controller";
import { getAvailableDeliveryAgents, updateDeliveryAgentStatus } from "../controllers/delivery_agent_controller";
import { getOnlineRestaurants, updateRestaurantAvailabilty, updateRestaurantMenu } from "../controllers/restaurants_controller";
import { validateRestaurant, validateRestaurantMenu } from "../middlewares/restaurants.middleware";
import { validateDeliveryAgent } from "../middlewares/delivery_agent.middleware";
import { validateOrder, validateOrderRating, validateOrderStatus } from "../middlewares/order.middleware";

export const apiV1=Router();

apiV1.post("/orders",validateOrder ,createRestaurantOrder);
apiV1.get("/orders/:user_id", getUserOrders);
apiV1.put("/orders/:order_id", validateOrderRating, updateOrderRating);
apiV1.put("/orders/:order_id", validateOrderStatus , updateOrderStatus);

apiV1.get("/delivery_agents", getAvailableDeliveryAgents);
apiV1.put("/delivery_agents/:delivery_agent_id", validateDeliveryAgent ,updateDeliveryAgentStatus);

apiV1.get("/restaurants", getOnlineRestaurants);
apiV1.put("/restaurants/:restaurant_id", validateRestaurant ,updateRestaurantAvailabilty);
apiV1.put("/restaurants", validateRestaurantMenu ,updateRestaurantMenu );
