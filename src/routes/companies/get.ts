import express, { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../helpers/asyncHandler';
import Hubspot from '../../core/hubspot';
import { SuccessResponse } from '../../core/apiResponse';

const router = express.Router();

router.get(
    '/',
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const companyId = req.query.id as string;
        const client = Hubspot.getInstance();

        if (companyId) {
            const company = await client.getCompanyById(companyId);
            return new SuccessResponse('Company found', {
                company,
                id: companyId,
            }).send(res);
        }

        const companies = await client.getAllCompanies();
        new SuccessResponse('Companies founds', companies).send(res);
    })
);

export { router as get };
