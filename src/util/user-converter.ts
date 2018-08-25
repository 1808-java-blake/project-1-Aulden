import {SqlUser} from "../dto/sql-user";
import {User} from "../model/User";

/**
 * This is used to convert a sql user into an actual user
 */

export function userConverter(user: SqlUser){
    return new User(user.ers_users_id, user.ers_username, user.ers_password, user.user_first_name, user.user_last_name, user.user_email, user.user_role);
}