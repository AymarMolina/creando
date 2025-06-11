import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
    private cartVisible = new BehaviorSubject<boolean>(false);
    cartVisible$ = this.cartVisible.asObservable();
  
    mostrarCarrito() {
      this.cartVisible.next(true);
    }
  
    ocultarCarrito() {
      this.cartVisible.next(false);
    }
}
