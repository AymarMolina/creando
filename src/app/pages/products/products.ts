import { Component } from '@angular/core';
import { filter } from 'rxjs';
import { Filter } from '../../shared/components/filter/filter';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../shared/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [Filter,ProductCard,CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {
  productos: any[] = [];
  
  constructor(private productoService: ProductoService, private router: Router) { }
  
  ngOnInit(): void {
    this.productoService.getProduct().subscribe(
      (response) => {
        this.productos = response.filter((producto: any) => producto.estado === 'activo');
        console.log(this.productos);
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }
}
