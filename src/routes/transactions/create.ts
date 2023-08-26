import express, { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import Hubspot from '../../core/hubspot';
import { SuccessResponse } from '../../core/apiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import types from '../../helpers/types';
import { Transaction, transactionSchema } from '../../models';

const router = express.Router();

interface CreateTransactionParams {
    transaction: Transaction;
}

const schema = Joi.object<CreateTransactionParams>({
    transaction: transactionSchema,
});

router.post(
    '/',
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const params = types.validateBody<CreateTransactionParams>(
            schema,
            req.body,
            res
        );
        const client = Hubspot.getInstance();

        const transactionId = client.createTransaction(params.transaction);
        new SuccessResponse(`Transaction created`, { id: transactionId }).send(
            res
        );
    })
);

export { router as create };
