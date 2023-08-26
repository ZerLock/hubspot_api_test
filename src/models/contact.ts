import Joi from 'joi';
import { BasicInterface } from './global';

export interface Contact extends BasicInterface {
    email: string;
    firstname: string;
    lastname: string;
    phone: string;
    company: string;
    website: string;
    lifecyclestage: string;
}

export const contactSchema = Joi.object<Contact>({
    email: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    phone: Joi.string().required(),
    company: Joi.string().required(),
    website: Joi.string().required(),
    lifecyclestage: Joi.string().required(),
});
