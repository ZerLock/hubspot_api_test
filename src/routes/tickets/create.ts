import express, { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import Hubspot from '../../core/hubspot';
import { SuccessResponse } from '../../core/apiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import types from '../../helpers/types';
import { Ticket, ticketSchema } from '../../models';

const router = express.Router();

interface CreateTicketParams {
    ticket: Ticket;
}

const schema = Joi.object<CreateTicketParams>({
    ticket: ticketSchema,
});

router.post(
    '/',
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const params = types.validateBody<CreateTicketParams>(
            schema,
            req.body,
            res
        );
        const client = Hubspot.getInstance();

        const ticketId = client.createTicket(params.ticket);
        new SuccessResponse(`Ticket created`, { id: ticketId }).send(res);
    })
);

export { router as create };
