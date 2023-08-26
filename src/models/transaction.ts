import Joi from 'joi';
import { BasicInterface } from './global';

export interface Transaction extends BasicInterface {
    amount: string;
    closedate: string;
    dealname: string;
    pipeline: string;
    dealstage: string;
    hubspot_owner_id: string;
}

export const transactionSchema = Joi.object<Transaction>({
    amount: Joi.string().required(),
    closedate: Joi.string().required(),
    dealname: Joi.string().required(),
    pipeline: Joi.string().required(),
    dealstage: Joi.string().required(),
    hubspot_owner_id: Joi.string().required(),
});
