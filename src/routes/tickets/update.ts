import express, { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import Hubspot from '../../core/hubspot';
import { SuccessResponse } from '../../core/apiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import types from '../../helpers/types';
import { Ticket, ticketSchema } from '../../models';
import { BadRequestError } from '../../core/apiError';

const router = express.Router();

interface UpdateTicketParams {
    ticket: Ticket;
}

const schema = Joi.object({
    ticket: ticketSchema,
});

router.put(
    '/',
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const params = types.validateBody<UpdateTicketParams>(
            schema,
            req.body,
            res
        );
        const ticketId = req.query.id as string;
        if (!ticketId) {
            throw new BadRequestError('ticketId not found.');
        }

        const client = Hubspot.getInstance();

        const updatedTicket = client.updateTicket(ticketId, params.ticket);
        new SuccessResponse(`Ticket updated`, {
            updated_ticked: updatedTicket,
            id: ticketId,
        }).send(res);
    })
);

export { router as update };
