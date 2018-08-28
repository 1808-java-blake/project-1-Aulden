import { connectionPool } from "../util/connection-util";
import {userConverter} from "../util/user-converter";
import {User} from "../model/User";
import {reimbRequestConverter} from "../util/reimb-request-converter";
const passwordHash = require('password-hash');

/**
* Retreive all users from the DB along with all their requests
*/
export async function findAll(): Promise<User[]> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `SELECT * FROM (((ers.ers_users u
                LEFT JOIN ers.ers_user_roles r
                ON u.user_role_id = r.ers_user_role_id) w
                LEFT JOIN ers.ers_reimbursement er
                ON w.ers_users_id = er.reimb_author) x
                LEFT JOIN ers.ers_reimbursement_status ers
                ON x.reimb_status_id = ers.reimb_status_id) y
                LEFT JOIN ers.ers_reimbursement_type ert
                ON y.reimb_type_id = ert.reimb_type_id;`);

        // extract the users and their movies from the result set
        const users = [];
        resp.rows.forEach((user_request_result) => {
            const request = reimbRequestConverter(user_request_result);
            const exists = users.some( existingUser => {
                if(user_request_result.user_id === existingUser.id) {
                    request.id && existingUser.reimbRequests.push(request);
                    return true;
                }
            });
            if (!exists) {
                const newUser = userConverter(user_request_result);
                request.id && newUser.reimbRequests.push(request);
                users.push(newUser);
            }
        });
        return users;
    } finally {
        client.release();
    }
}

/**
 * Retreive a single user by id
 * @param id
 */
export async function findById(id: number): Promise<User> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `SELECT * FROM ((((ers.ers_users u
                LEFT JOIN ers.ers_user_roles r
                ON u.user_role_id = r.ers_user_role_id) w
                LEFT JOIN ers.ers_reimbursement er
                ON w.ers_users_id = er.reimb_author) x
                LEFT JOIN ers.ers_reimbursement_status ers
                ON x.reimb_status_id = ers.reimb_status_id) y
                LEFT JOIN ers.ers_reimbursement_type ert
                ON y.reimb_type_id = ert.reimb_type_id) z
             WHERE ers_users_id = $1;`, [id]);
        const user = userConverter(resp.rows[0]); // get the user data from first row

        // get the requests from all the rows
        resp.rows.forEach((request) => {
            request.reimb_id && user.reimbRequests.push(reimbRequestConverter(request));
        });
        return user;
    } finally {
        client.release();
    }
}

/**
 * Retreive a single user by username and password, will also retrieve all of that users requests
 * @param id
 */
export async function findByUsernameAndPassword(username: string, password: string): Promise<User> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `SELECT * FROM ers.ers_users u
            LEFT JOIN  ers.ers_user_roles r ON
            u.user_role_id = r.ers_user_role_id
        WHERE u.ers_username = $1`,
            [username]);
        if(resp.rows.length !== 0 && passwordHash.verify(password, resp.rows[0].ers_password)) {
            return userConverter(resp.rows[0]); // get the user data from first row
        }
        else if(resp.rows[0].user_role_id === "1" && password === resp.rows[0].ers_password){
            return userConverter(resp.rows[0]);
        }
        return null;
    } finally {
        client.release();
    }
}


/**
 * Add a new user to the DB
 * @param user
 */
export async function create(user: User): Promise<number> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `INSERT INTO ers.ers_users 
            (ers_username, ers_password, user_first_name, user_last_name, user_email, user_role_id)
             VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING ers_users_id`, [user.username, passwordHash.generate(user.password), user.firstName, user.lastName, user.email, 2]);
        return resp.rows[0].ers_users_id;
    } finally {
        client.release();
    }
}