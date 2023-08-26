import express, { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import Hubspot from '../../core/hubspot';
import { SuccessResponse } from '../../core/apiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import types from '../../helpers/types';
import { Transaction, transactionSchema } from '../../models';
import { BadRequestError } from '../../core/apiError';

const router = express.Router();

interface UpdateTransactionParams {
    transaction: Transaction;
}

const schema = Joi.object({
    transaction: transactionSchema,
});

router.put(
    '/',
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const params = types.validateBody<UpdateTransactionParams>(
            schema,
            req.body,
            res
        );
        const transactionId = req.query.id as string;
        if (!transactionId) {
            throw new BadRequestError('transactionId not found.');
        }

        const client = Hubspot.getInstance();

        const updatedTransaction = client.updateTransaction(
            transactionId,
            params.transaction
        );
        new SuccessResponse(`Transaction updated`, {
            updated_transaction: updatedTransaction,
            id: transactionId,
        }).send(res);
    })
);

export { router as update };
