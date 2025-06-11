import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private carrito = new BehaviorSubject<any[]>([]);
  private cartVisible = new BehaviorSubject<boolean>(false);

  carrito$ = this.carrito.asObservable();
  cartVisible$ = this.cartVisible.asObservable();

  mostrarCarrito() {
    this.cartVisible.next(true);
  }

  ocultarCarrito() {
    this.cartVisible.next(false);
  }

  agregarProducto(producto: any) {
    const productosActuales = this.carrito.value;

    // Si ya existe esa variante (mismo id_variante), solo aumenta cantidad
    const indice = productosActuales.findIndex(p => p.id_variante === producto.id_variante);
    if (indice !== -1) {
      productosActuales[indice].cantidad += producto.cantidad;
    } else {
      productosActuales.push(producto);
    }

    this.carrito.next([...productosActuales]);
  }

  obtenerProductos() {
    return this.carrito.value;
  }

  limpiarCarrito() {
    this.carrito.next([]);
  }
  
}
