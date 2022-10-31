import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/cart';
import { CartItem } from '../shared/models/cartItem';
import { Product } from '../shared/models/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart=this.getCartFromLocalStorage()
  private cartSubject:BehaviorSubject<Cart> =new BehaviorSubject(this.cart)

  constructor() { }
  addToCart(product:Product):void{
    let cartItem= this.cart.items.find(item=>item.product._id==product._id)
    if(cartItem)return
    this.cart.items.push(new CartItem(product))
    this.setCartToLocalStorage()
  }
  removeFromCart(productId:string):void{
    this.cart.items= this.cart.items
    .filter(item =>item.product._id !=productId)
    this.setCartToLocalStorage()
  }
  changeQuantity(productId:string, quantity:number){
     let cartItem=this.cart.items
     .find(item=>item.product._id===productId)
     if(!cartItem)return
     cartItem.quantity=quantity
     cartItem.price=quantity*cartItem.product.price
     this.setCartToLocalStorage()
  }
  clearCart(){
    this.cart= new Cart()
    this.setCartToLocalStorage()
  }
  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable()
  }
  getCart(): Cart{
    return this.cartSubject.value;
  }
  private setCartToLocalStorage():void{
    this.cart.totalPrice=this.cart.items
    .reduce((prevSum,currentItem)=>prevSum+currentItem.price,0)
    this.cart.totalCount=this.cart.items
    .reduce((prevSum,currentItem)=>prevSum+currentItem.quantity,0)

    const cartJson=JSON.stringify(this.cart)
    localStorage.setItem('cart',cartJson)
    this.cartSubject.next(this.cart)
  }
  private getCartFromLocalStorage():Cart{
    const cartJson =localStorage.getItem('cart') 
    return cartJson? JSON.parse(cartJson):new Cart()
  }
}

