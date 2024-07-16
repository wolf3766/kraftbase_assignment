import {ObjectId} from 'mongodb';

export interface Idelivery_agent {
    user_id: ObjectId,
    available: boolean
}
