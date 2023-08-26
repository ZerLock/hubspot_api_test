import Joi from 'joi';
import { BasicInterface } from './global';

export interface Ticket extends BasicInterface {
    hs_pipeline: string;
    hs_pipeline_stage: string;
    hs_ticket_priority: string;
    subject: string;
}

export const ticketSchema = Joi.object<Ticket>({
    hs_pipeline: Joi.string().required(),
    hs_pipeline_stage: Joi.string().required(),
    hs_ticket_priority: Joi.string().required(),
    subject: Joi.string().required(),
});
