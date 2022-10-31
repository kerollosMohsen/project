import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  order:Order=new Order()
  checkoutForm!: FormGroup;

  constructor(cartService:CartService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService,
    private orderService: OrderService,
    private router: Router) { 
      const cart = cartService.getCart();
                this.order.items = cart.items;
                this.order.totalPrice = cart.totalPrice;
    }

  ngOnInit(): void {
    let {userName} = this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      userName:[userName, Validators.required],
    });
  }
  get fc(){
    return this.checkoutForm.controls;
  }

  createOrder(){
    if(this.checkoutForm.invalid){
      this.toastrService.warning('Please fill the inputs', 'Invalid Inputs');
      return;
    }

    console.log(
     this.fc.userName.value

    )

    this.order.userName = this.fc.userName.value;

    this.orderService.create(this.order).subscribe({
      next:() => {
        localStorage.removeItem('cart')
        this.router.navigateByUrl('/');
      },
      error:(errorResponse) => {
        console.log(errorResponse.error)
        this.toastrService.error(errorResponse.error, 'Cart');
      }
    })
  }
}
