import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductCart } from '../product-cart/product-cart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-sidebar',
  imports: [ProductCart,CommonModule],
  templateUrl: './cart-sidebar.html',
  styleUrl: './cart-sidebar.css'
})
export class CartSidebar {
  isVisible = false;
  productos: any[] = [];
  ngOnInit() {
    const carrito = localStorage.getItem('carrito');
    this.productos = carrito ? JSON.parse(carrito) : [];
  }
  constructor(private cartService: CartService) {
    this.cartService.cartVisible$.subscribe((visible) => {
      this.isVisible = visible;
    });
  }
  getTotal(): number {
    return this.productos.reduce((total, producto) => {
      return total + producto.precio * producto.cantidad;
    }, 0);
  }

  cerrarCarrito() {
    this.cartService.ocultarCarrito();
  }
}
