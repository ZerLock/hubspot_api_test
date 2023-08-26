import express, { Request, Response, NextFunction } from 'express';
import Hubspot from '../../core/hubspot';
import { SuccessResponse } from '../../core/apiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import { BadRequestError } from '../../core/apiError';

const router = express.Router();

router.delete(
    '/',
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const ticketId = req.query.id as string;
        if (!ticketId) {
            throw new BadRequestError('ticketId not found.');
        }

        const client = Hubspot.getInstance();

        client.deleteTicket(ticketId);
        new SuccessResponse(`Ticket deleted`, { id: ticketId }).send(res);
    })
);

export { router as delete };
