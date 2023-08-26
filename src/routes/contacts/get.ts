import express, { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../helpers/asyncHandler';
import Hubspot from '../../core/hubspot';
import { SuccessResponse } from '../../core/apiResponse';

const router = express.Router();

router.get(
    '/',
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const contactId = req.query.id as string;
        const client = Hubspot.getInstance();

        if (contactId) {
            const contact = await client.getContactById(contactId);
            return new SuccessResponse('Contact found', {
                contact,
                id: contactId,
            }).send(res);
        }

        const contacts = await client.getAllContacts();
        new SuccessResponse('Contacts found', contacts).send(res);
    })
);

export { router as get };
