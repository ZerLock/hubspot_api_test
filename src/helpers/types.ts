import Joi from 'joi';
import { Response } from 'express';
import { BadDataError } from '../core/apiError';

const types = {
    validateBody: function <T>(
        schema: Joi.ObjectSchema,
        data: unknown,
        res: Response
    ): T {
        const { error, value } = schema.validate(data);
        if (error) {
            throw new BadDataError(error.message);
        }
        return value as T;
    },
};

export default types;
