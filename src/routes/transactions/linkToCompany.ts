import express, { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import Hubspot from '../../core/hubspot';
import { SuccessResponse } from '../../core/apiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import types from '../../helpers/types';

const router = express.Router();

interface LinkToCompanyParams {
    transactionId: number;
    companyId: number;
}

const schema = Joi.object<LinkToCompanyParams>({
    transactionId: Joi.number().required(),
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

        client.linkTransactionToCompany(params.transactionId, params.companyId);
        new SuccessResponse(
            `Transaction ${params.transactionId} linked to company ${params.companyId}`,
            {}
        ).send(res);
    })
);

export { router as linkToCompany };
