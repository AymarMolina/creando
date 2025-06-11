import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from '../../shared/components/navbar/navbar';
import { CartSidebar } from '../../shared/components/cart-sidebar/cart-sidebar';

@Component({
  selector: 'app-layout',
  imports: [RouterModule,Navbar,CartSidebar],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

}
