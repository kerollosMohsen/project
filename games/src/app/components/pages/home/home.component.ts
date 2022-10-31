import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Producservice } from 'src/app/shared/models/producservis';
import { Product } from 'src/app/shared/models/products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products:Product[]=[]
  allArry:Producservice[]=[]
  constructor(private productservice:ProductService, activatedRoute:ActivatedRoute) {
    let productObservble:Observable<any>
    activatedRoute.params.subscribe((params)=>{
      if(params['search']){
        productObservble=this.productservice.getAllProductsBySearch(params['search'])
        productObservble.subscribe((se)=>{
          this.products=se.data.found
        })
      }else{
        productObservble= productservice.getAll()

        productObservble.subscribe((serverProducts)=>{
          this.products=serverProducts.data.products
        })
      }
    })
   }

  ngOnInit(): void {
    this.productservice.getAllPro()  
  }

  // getAllPro() {
  //   this.productservice.getAll().subscribe(
  //     (res) => {
  //       console.log(res)
  //       this.productsArray = res.data.product
  //     },
  //     (err) => {
  //     }
  //   )
  // }

}

