import { CartItem } from "./cartItem";

export class Order{
    id!:number;
    items!:CartItem[]
    totalPrice!:number;
    userName!:string;
    paymentId!:string
    createdAt!:string
    status!:string
}