import { connectionPool } from "../util/connection-util";
import {ReimbRequest} from "../model/ReimbRequest";
import {reimbRequestConverter} from "../util/reimb-request-converter";
import {SqlReimbRequest} from "../dto/sql-reimb-request";
import * as userDao from '../dao/user-dao';

export async function findAll(): Promise<ReimbRequest[]> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(`SELECT * FROM ers.ers_reimbursement LEFT JOIN
                                          ers.ers_reimbursement_status USING(reimb_status_id)
                                          LEFT JOIN ers.ers_reimbursement_type USING(reimb_type_id);`);
        return resp.rows.map(reimbRequestConverter);
    } finally {
        client.release();
    }
}

export async function findById(id: number): Promise<ReimbRequest> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(`SELECT * FROM ers.ers_reimbursement LEFT JOIN
                                          ers.ers_reimbursement_status USING(reimb_status_id)
                                          LEFT JOIN ers.ers_reimbursement_type USING(reimb_type_id)
                                          WHERE reimb_id = $1`, [id]);
        let movie: SqlReimbRequest = resp.rows[0];
        if (movie !== undefined) {
            return reimbRequestConverter(movie);
        } else {
            return undefined;
        }
    } finally {
        client.release();
    }
}

export async function createReimbRequest(request): Promise<number> {
    const client = await connectionPool.connect();
    let date = new Date();
    let auth = await userDao.findByUsernameAndPassword(request.author, request.password);

    try {
        const resp = await client.query(
            `INSERT INTO ers.ers_reimbursement 
        (reimb_amount, reimb_submitted, reimb_description, reimb_author, reimb_status_id, reimb_type_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING reimb_id`, [request.amount, `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`, request.description, auth.id, 1, request.type]);
        return resp.rows[0].reimb_id;
    } finally {
        client.release();
    }
}