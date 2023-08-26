import express, { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import Hubspot from '../../core/hubspot';
import { SuccessResponse } from '../../core/apiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import types from '../../helpers/types';
import { Company, companySchema } from '../../models';
import { BadRequestError } from '../../core/apiError';

const router = express.Router();

interface UpdateCompanyParams {
    company: Company;
}

const schema = Joi.object<UpdateCompanyParams>({
    company: companySchema,
});

router.put(
    '/',
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const params = types.validateBody<UpdateCompanyParams>(
            schema,
            req.body,
            res
        );
        const companyId = req.query.id as string;
        if (!companyId) {
            throw new BadRequestError('companyId not found.');
        }

        const client = Hubspot.getInstance();

        const updatedCompany = client.updateCompany(companyId, params.company);
        new SuccessResponse(`Contact updated`, {
            updated_company: updatedCompany,
            id: companyId,
        }).send(res);
    })
);

export { router as update };
