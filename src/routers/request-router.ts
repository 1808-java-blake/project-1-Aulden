import { Request, Response } from 'express';
import express from 'express';
import * as requestDao from '../dao/reimb-request-dao';

export const requestRouter = express.Router(); // routers represent a subset of routes for the express application


/**
 * Find all reimbursement requests
 */
requestRouter.get('',
    async (req: Request, resp: Response) => {
        try {
            console.log('retrieving all movies');
            let movies = await requestDao.findAll();
            resp.json(movies);
        } catch (err) {
            resp.sendStatus(500);
        }
    });

/**
 * Find reimbursement request by id
 */
requestRouter.get('/:id', async (req, resp) => {
    const id = +req.params.id; // convert the id to a number
    console.log(`retrieving movie with id  ${id}`)
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
    async (req, resp) => {
        try {
            const id = await requestDao.createReimbRequest(req.body);
            resp.status(201);
            resp.json(id);
        } catch (err) {
            console.log(err);
            resp.sendStatus(500);
        }
    });