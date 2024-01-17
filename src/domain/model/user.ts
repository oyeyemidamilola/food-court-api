import { Model } from "objection";



export class User extends Model {

    id: string

    email: string
    hashedPassword: string
    isConfirmed: boolean

    static tableName: string = 'users'
    static idColumn: string = 'id'

}