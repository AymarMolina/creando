import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-product-cart',
  imports: [CommonModule],
  templateUrl: './product-cart.html',
  styleUrl: './product-cart.css'
})
export class ProductCart {
  productos: any[] = [];

  ngOnInit() {
    const carrito = localStorage.getItem('carrito');
    this.productos = carrito ? JSON.parse(carrito) : [];
  }
  eliminarDelCarrito(index: number) {
    // Eliminar el producto del array
    this.productos.splice(index, 1);

    // Actualizar el localStorage
    localStorage.setItem('carrito', JSON.stringify(this.productos));
  }

}
