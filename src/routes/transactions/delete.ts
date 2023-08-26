import express, { Request, Response, NextFunction } from 'express';
import Hubspot from '../../core/hubspot';
import { SuccessResponse } from '../../core/apiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import { BadRequestError } from '../../core/apiError';

const router = express.Router();

router.delete(
    '/',
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const transactionId = req.query.id as string;
        if (!transactionId) {
            throw new BadRequestError('transactionId not found.');
        }

        const client = Hubspot.getInstance();

        client.deleteTransaction(transactionId);
        new SuccessResponse(`Transaction deleted`, { id: transactionId }).send(
            res
        );
    })
);

export { router as delete };
