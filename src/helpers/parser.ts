import _ from 'lodash';
import { Contact, Company, Ticket, Transaction } from '../models';

export function parseContact<T = any>(data: T): Contact {
    const defaultContact: Contact = {
        email: '',
        firstname: '',
        lastname: '',
        phone: '',
        company: '',
        website: '',
        lifecyclestage: '',
    };

    return _.defaults(defaultContact, data);
}

export function parseCompany<T = any>(data: T): Company {
    const defaultCompany: Company = {
        name: '',
        domain: '',
        city: '',
        industry: '',
        phone: '',
        state: '',
        lifecyclestage: '',
    };

    return _.defaults(defaultCompany, data);
}

export function parseTicket<T = any>(data: T): Ticket {
    const defaultTicket: Ticket = {
        hs_pipeline: '',
        hs_pipeline_stage: '',
        hs_ticket_priority: '',
        subject: '',
    };

    return _.defaults(defaultTicket, data);
}

export function parseTransaction<T = any>(data: T): Transaction {
    const defaultTransaction: Transaction = {
        amount: '',
        closedate: '',
        dealname: '',
        pipeline: '',
        dealstage: '',
        hubspot_owner_id: '',
    };

    return _.defaults(defaultTransaction, data);
}
