import { Request, Response } from 'express';
import express from 'express';
import * as requestDao from '../dao/reimb-request-dao';
import {authMiddleware} from "../security/authorization-middleware";

export const requestRouter = express.Router(); // routers represent a subset of routes for the express application


/**
 * Find all reimbursement requests
 */
requestRouter.get('', [authMiddleware('EMPLOYEE', 'MANAGER'),
    async (req: Request, resp: Response) => {
        try {
            console.log('retrieving all reimbursement requests');
            let requests = await requestDao.findAll();
            resp.json(requests);
        } catch (err) {
            resp.sendStatus(500);
        }
    }]);

/**
 * Find reimbursement request by id
 */
requestRouter.get('/:id', async (req, resp) => {
    const id = +req.params.id; // convert the id to a number
    console.log(`retrieving request with id  ${id}`)
    try {
        let request = await requestDao.findById(id);
        if (request !== undefined) {
            resp.json(request);
        } else {
            resp.sendStatus(400);
        }
    } catch (err) {
        console.log(err);
        resp.sendStatus(500);
    }
});


/**
 * Create Request
 */
requestRouter.post('',
    [authMiddleware('MANAGER'), async (req, resp) => {
        try {
            const id = await requestDao.createReimbRequest(req.body);
            resp.status(201);
            resp.json(id);
        } catch (err) {
            console.log(err);
            resp.sendStatus(500);
        }
    }]);

/**
 * Get reimbursements for specified user
 */
requestRouter.get('/user/:id',
    async (req, resp) => {
        try{
            const id = +req.params.id;
            console.log("Finding requests for user with id "+id);
            let requests = await requestDao.findByUserId(id);
            resp.json(requests);
        }
        catch (err) {
            console.log(err);
            resp.sendStatus(500);
        }
    });