import { connectionPool } from "../util/connection-util";
import {ReimbRequest} from "../model/ReimbRequest";
import {reimbRequestConverter} from "../util/reimb-request-converter";
import {SqlReimbRequest} from "../dto/sql-reimb-request";

export async function findAll(): Promise<ReimbRequest[]> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query('SELECT * FROM ers.ers_reimbursement;');
        return resp.rows.map(reimbRequestConverter);
    } finally {
        client.release();
    }
}

export async function findById(id: number): Promise<ReimbRequest> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query('SELECT * FROM ers.ers_reimbursement WHERE reimb_id = $1', [id]);
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
    try {
        const resp = await client.query(
            `INSERT INTO ers.ers_reimbursement 
        (reimb_amount, reimb_submitted, reimb_description, reimb_author, reimb_status_id, reimb_type_id)
        VALUES ($1, $2, $3, $3, $4, $5, $6)
        RETURNING reimb_id`, [request.id, request.submitted, request.description, request.author, request.status, request.type]);
        return resp.rows[0].reimb_id;
    } finally {
        client.release();
    }
}