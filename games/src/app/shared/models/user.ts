import { Cart } from "./cart";

export class User{
    id!:string;
    email!:string;
    userName!:string;
    token!:string;
    isAdmin!:boolean;
    cart!:Cart;
    data?:any

}