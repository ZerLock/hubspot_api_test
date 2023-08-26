import express, { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../helpers/asyncHandler';
import Hubspot from '../../core/hubspot';
import { SuccessResponse } from '../../core/apiResponse';

const router = express.Router();

router.get(
    '/',
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const transactionId = req.query.id as string;
        const client = Hubspot.getInstance();

        if (transactionId) {
            const transaction = await client.getTransactionById(transactionId);
            return new SuccessResponse('Transaction found', {
                transaction,
                id: transactionId,
            }).send(res);
        }

        const transactions = await client.getAllTransactions();
        new SuccessResponse('Transactions found', transactions).send(res);
    })
);

export { router as get };
