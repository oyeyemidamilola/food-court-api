import { Model } from "objection";



export class User extends Model {

    id: string

    email: string
    hashed_password: string
    is_confirmed: boolean

    static tableName: string = 'users'
    static idColumn: string = 'id'

}