import Joi from 'joi';
import { BasicInterface } from './global';

export interface Company extends BasicInterface {
    name: string;
    domain: string;
    city: string;
    industry: string;
    phone: string;
    state: string;
    lifecyclestage: string;
}

export const companySchema = Joi.object<Company>({
    name: Joi.string().required(),
    domain: Joi.string().required(),
    city: Joi.string().required(),
    industry: Joi.string().required(),
    phone: Joi.string().required(),
    state: Joi.string().required(),
    lifecyclestage: Joi.string().required(),
});
