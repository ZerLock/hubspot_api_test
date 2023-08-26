import express, { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import Hubspot from '../../core/hubspot';
import { SuccessResponse } from '../../core/apiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import types from '../../helpers/types';
import { Contact, contactSchema } from '../../models';
import { BadRequestError } from '../../core/apiError';

const router = express.Router();

interface UpdateContactParams {
    contact: Contact;
}

const schema = Joi.object({
    contact: contactSchema,
});

router.put(
    '/',
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const params = types.validateBody<UpdateContactParams>(
            schema,
            req.body,
            res
        );
        const contactId = req.query.id as string;
        if (!contactId) {
            throw new BadRequestError('contactId not found.');
        }

        const client = Hubspot.getInstance();

        const updatedContact = client.updateContact(contactId, params.contact);
        new SuccessResponse(`Contact updated`, {
            updated_contact: updatedContact,
            id: contactId,
        }).send(res);
    })
);

export { router as update };
