import _ from 'lodash';
import { Client } from '@hubspot/api-client';
import * as parser from '../helpers/parser';
import { hubspot_token } from '../config';
import {
    Contact,
    Company,
    Ticket,
    Transaction,
    BasicInterface,
} from '../models';
import { SimplePublicObjectInputForCreate } from '@hubspot/api-client/lib/codegen/crm/companies';

class Hubspot {
    private static _instance: Hubspot;

    private _client: Client;

    constructor() {
        this._client = new Client({ accessToken: hubspot_token });
    }

    public static getInstance(): Hubspot {
        if (!Hubspot._instance) {
            this._instance = new Hubspot();
        }
        return Hubspot._instance;
    }

    private _castToInput<T extends BasicInterface>(
        data: T
    ): SimplePublicObjectInputForCreate {
        const keys = Object.keys(data);
        const properties: BasicInterface = {};

        for (const key of keys) {
            properties[key] = data[key];
        }
        return { associations: [], properties };
    }

    public async getAllContacts(): Promise<Contact[]> {
        const responses = await this._client.crm.contacts.getAll();
        return _.map(responses, (response) => parser.parseContact(response));
    }

    public async getContactById(id: string): Promise<Contact> {
        const response = await this._client.crm.contacts.basicApi.getById(id);
        return parser.parseContact(response);
    }

    public async createContact(contact: Contact): Promise<string> {
        const { id } = await this._client.crm.contacts.basicApi.create(
            this._castToInput(contact)
        );
        return id;
    }

    public async updateContact(
        id: string,
        contact: Partial<Contact>
    ): Promise<Contact> {
        const response = await this._client.crm.contacts.basicApi.update(
            id,
            this._castToInput(parser.parseContact(contact))
        );
        return parser.parseContact(response);
    }

    public async deleteContact(id: string): Promise<void> {
        await this._client.crm.contacts.basicApi.archive(id);
    }

    public async getAllCompanies(): Promise<Company[]> {
        const responses = await this._client.crm.companies.getAll();
        return _.map(responses, (response) => parser.parseCompany(response));
    }

    public async getCompanyById(id: string): Promise<Company> {
        const response = this._client.crm.companies.basicApi.getById(id);
        return parser.parseCompany(response);
    }

    public async createCompany(company: Company): Promise<string> {
        const { id } = await this._client.crm.companies.basicApi.create(
            this._castToInput(company)
        );
        return id;
    }

    public async updateCompany(
        id: string,
        company: Partial<Contact>
    ): Promise<Contact> {
        const response = await this._client.crm.companies.basicApi.update(
            id,
            this._castToInput(parser.parseCompany(company))
        );
        return parser.parseContact(response);
    }

    public async deleteCompany(id: string): Promise<void> {
        await this._client.crm.companies.basicApi.archive(id);
    }

    public async getAllTickets(): Promise<Ticket[]> {
        const responses = await this._client.crm.tickets.getAll();
        return _.map(responses, (response) => parser.parseTicket(response));
    }

    public async getTicketById(id: string): Promise<Ticket> {
        const response = await this._client.crm.tickets.basicApi.getById(id);
        return parser.parseTicket(response);
    }

    public async createTicket(ticket: Ticket): Promise<string> {
        const { id } = await this._client.crm.tickets.basicApi.create(
            this._castToInput(ticket)
        );
        return id;
    }

    public async updateTicket(
        id: string,
        ticket: Partial<Ticket>
    ): Promise<Ticket> {
        const response = await this._client.crm.tickets.basicApi.update(
            id,
            this._castToInput(parser.parseTicket(ticket))
        );
        return parser.parseTicket(response);
    }

    public async deleteTicket(id: string): Promise<void> {
        await this._client.crm.tickets.basicApi.archive(id);
    }

    public async getAllTransactions(): Promise<Transaction[]> {
        const responses = await this._client.crm.deals.getAll();
        return _.map(responses, (response) =>
            parser.parseTransaction(response)
        );
    }

    public async getTransactionById(id: string): Promise<Transaction> {
        const response = await this._client.crm.deals.basicApi.getById(id);
        return parser.parseTransaction(response);
    }

    public async createTransaction(transaction: Transaction): Promise<string> {
        const { id } = await this._client.crm.deals.basicApi.create(
            this._castToInput(transaction)
        );
        return id;
    }

    public async updateTransaction(
        id: string,
        transaction: Partial<Transaction>
    ): Promise<Transaction> {
        const response = await this._client.crm.deals.basicApi.update(
            id,
            this._castToInput(parser.parseTransaction(transaction))
        );
        return parser.parseTransaction(response);
    }

    public async deleteTransaction(id: string): Promise<void> {
        await this._client.crm.deals.basicApi.archive(id);
    }

    public async linkTicketToContact(
        ticketId: number,
        contactId: number
    ): Promise<void> {
        await this._client.crm.associations.v4.basicApi.create(
            'tickets',
            ticketId,
            'contacts',
            contactId,
            []
        );
    }

    public async linkTicketToCompany(
        ticketId: number,
        companyId: number
    ): Promise<void> {
        await this._client.crm.associations.v4.basicApi.create(
            'tickets',
            ticketId,
            'companies',
            companyId,
            []
        );
    }

    public async linkTransactionToContact(
        transactionId: number,
        contactId: number
    ): Promise<void> {
        await this._client.crm.associations.v4.basicApi.create(
            'transactions',
            transactionId,
            'contacts',
            contactId,
            []
        );
    }

    public async linkTransactionToCompany(
        transactionId: number,
        companyId: number
    ): Promise<void> {
        await this._client.crm.associations.v4.basicApi.create(
            'transactions',
            transactionId,
            'companies',
            companyId,
            []
        );
    }
}

export default Hubspot;
