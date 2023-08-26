import express from 'express';
import {
    companiesRoute,
    contactsRoute,
    ticketsRoute,
    transactionsRoute,
} from '../helpers/consts';

import * as contacts from './contacts';
import * as companies from './companies';
import * as tickets from './tickets';
import * as transactions from './transactions';

const router = express.Router();

// Contacts routes
router.use(contactsRoute, contacts.get);
router.use(contactsRoute, contacts.create);
router.use(contactsRoute, contacts.update);
router.use(contactsRoute, contacts.delete);

// Companies routes
router.use(companiesRoute, companies.get);
router.use(companiesRoute, companies.create);
router.use(companiesRoute, companies.update);
router.use(companiesRoute, companies.delete);

// Tickets routes
router.use(ticketsRoute, tickets.get);
router.use(ticketsRoute, tickets.create);
router.use(ticketsRoute, tickets.update);
router.use(ticketsRoute, tickets.delete);
router.use(ticketsRoute, tickets.linkToCompany);
router.use(ticketsRoute, tickets.linkToContact);

// Transactions routes
router.use(transactionsRoute, transactions.get);
router.use(transactionsRoute, transactions.create);
router.use(transactionsRoute, transactions.update);
router.use(transactionsRoute, transactions.delete);
router.use(transactionsRoute, transactions.linkToCompany);
router.use(transactionsRoute, transactions.linkToContact);

export default router;
