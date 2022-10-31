import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { product_sample } from 'src/data';
import { PRODUCTS_BY_ID_URL, PRODUCTS_URL, PRODUCT_BY_URL } from '../shared/models/constants/urls';
import { Product } from '../shared/models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  producservice: any;
  productsArray: any;

  constructor(private http:HttpClient) { }
  getAll():Observable<any>{
    return this.http.get(PRODUCTS_URL)
  }
  getAllProductsBySearch(search:string):Observable<any>{
    console.log(this.http.get(PRODUCTS_URL+ search))
    return  this.http.get(PRODUCT_BY_URL+ search)
  }
  getProductById(productId:string):Observable<any>{
    
    return this.http.get(PRODUCTS_BY_ID_URL+ productId)
  }
   getAllPro() {
    //  this.getAll().subscribe(
    //   (res:any) => {
    //     console.log(res.data.products)
    //     this.productsArray = res.data.products
    //     return [this.productsArray]
    //   },
    //   (err:any) => {
    //    }
    //  )
   }
}
