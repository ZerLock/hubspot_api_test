import express, { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import Hubspot from '../../core/hubspot';
import { SuccessResponse } from '../../core/apiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import types from '../../helpers/types';

const router = express.Router();

interface LinkToContactParams {
    transactionId: number;
    contactId: number;
}

const schema = Joi.object<LinkToContactParams>({
    transactionId: Joi.number().required(),
    contactId: Joi.number().required(),
});

router.post(
    '/',
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const params = types.validateBody<LinkToContactParams>(
            schema,
            req.body,
            res
        );
        const client = Hubspot.getInstance();

        client.linkTransactionToContact(params.transactionId, params.contactId);
        new SuccessResponse(
            `Transaction ${params.transactionId} linked to contact ${params.contactId}`,
            {}
        ).send(res);
    })
);

export { router as linkToContact };
