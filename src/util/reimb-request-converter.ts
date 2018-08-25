import {ReimbRequest} from "../model/ReimbRequest";
import {SqlReimbRequest} from "../dto/sql-reimb-request";

/**
 * This is used to convert a sql user into an actual user
 */

export function reimbRequestConverter(reimbRequest: SqlReimbRequest){
    return new ReimbRequest(reimbRequest.reimb_id, reimbRequest.reimb_amount, reimbRequest.reimb_submitted, reimbRequest.reimb_resolved, reimbRequest.reimb_description, reimbRequest.reimb_resolver, reimbRequest.reimb_author, reimbRequest.reimb_status, reimbRequest.reimb_type);
}