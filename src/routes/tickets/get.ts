import express, { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../helpers/asyncHandler';
import Hubspot from '../../core/hubspot';
import { SuccessResponse } from '../../core/apiResponse';

const router = express.Router();

router.get(
    '/',
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const ticketId = req.query.id as string;
        const client = Hubspot.getInstance();

        if (ticketId) {
            const ticket = await client.getTicketById(ticketId);
            return new SuccessResponse('Ticket found', {
                ticket,
                id: ticketId,
            }).send(res);
        }

        const tickets = await client.getAllTickets();
        new SuccessResponse('Tickets found', tickets).send(res);
    })
);

export { router as get };
