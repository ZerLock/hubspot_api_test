import express, { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import Hubspot from '../../core/hubspot';
import { SuccessResponse } from '../../core/apiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import types from '../../helpers/types';
import { Company, companySchema } from '../../models';

const router = express.Router();

interface CreateCompanyParams {
    company: Company;
}

const schema = Joi.object<CreateCompanyParams>({
    company: companySchema,
});

router.post(
    '/',
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const params = types.validateBody<CreateCompanyParams>(
            schema,
            req.body,
            res
        );
        const client = Hubspot.getInstance();

        const companyId = client.createCompany(params.company);
        new SuccessResponse(`Company created`, { id: companyId }).send(res);
    })
);

export { router as create };
