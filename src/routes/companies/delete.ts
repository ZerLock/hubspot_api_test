import express, { Request, Response, NextFunction } from 'express';
import Hubspot from '../../core/hubspot';
import { SuccessResponse } from '../../core/apiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import { BadRequestError } from '../../core/apiError';

const router = express.Router();

router.delete(
    '/',
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const companyId = req.query.id as string;
        if (!companyId) {
            throw new BadRequestError('companyId not found.');
        }

        const client = Hubspot.getInstance();

        client.deleteCompany(companyId);
        new SuccessResponse(`Company deleted`, { id: companyId }).send(res);
    })
);

export { router as delete };
