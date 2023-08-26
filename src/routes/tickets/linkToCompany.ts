import express, { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import Hubspot from '../../core/hubspot';
import { SuccessResponse } from '../../core/apiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import types from '../../helpers/types';

const router = express.Router();

interface LinkToCompanyParams {
    ticketId: number;
    companyId: number;
}

const schema = Joi.object<LinkToCompanyParams>({
    ticketId: Joi.number().required(),
    companyId: Joi.number().required(),
});

router.post(
    '/',
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const params = types.validateBody<LinkToCompanyParams>(
            schema,
            req.body,
            res
        );
        const client = Hubspot.getInstance();

        client.linkTicketToCompany(params.ticketId, params.companyId);
        new SuccessResponse(
            `Ticket ${params.ticketId} linked to company ${params.companyId}`,
            {}
        ).send(res);
    })
);

export { router as linkToCompany };
