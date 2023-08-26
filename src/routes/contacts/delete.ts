import express, { Request, Response, NextFunction } from 'express';
import Hubspot from '../../core/hubspot';
import { SuccessResponse } from '../../core/apiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import { BadRequestError } from '../../core/apiError';

const router = express.Router();

router.delete(
    '/',
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const contactId = req.query.id as string;
        if (!contactId) {
            throw new BadRequestError('contactId not found.');
        }

        const client = Hubspot.getInstance();

        client.deleteContact(contactId);
        new SuccessResponse(`Contact deleted`, { id: contactId }).send(res);
    })
);

export { router as delete };
