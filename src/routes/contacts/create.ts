import express, { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import Hubspot from '../../core/hubspot';
import { SuccessResponse } from '../../core/apiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import types from '../../helpers/types';
import { Contact, contactSchema } from '../../models';

const router = express.Router();

interface CreateContactParams {
    contact: Contact;
}

const schema = Joi.object<CreateContactParams>({
    contact: contactSchema,
});

router.post(
    '/',
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const params = types.validateBody<CreateContactParams>(
            schema,
            req.body,
            res
        );
        const client = Hubspot.getInstance();

        const contactId = client.createContact(params.contact);
        new SuccessResponse(`Contact created`, { id: contactId }).send(res);
    })
);

export { router as create };
