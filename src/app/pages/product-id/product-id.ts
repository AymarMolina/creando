import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../shared/services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-id',
  imports: [CommonModule],
  templateUrl: './product-id.html',
  styleUrl: './product-id.css'
})
export class ProductId {
producto: any;
  variantesProducto: any[] = [];
  colores: any[] = [];
  tallas: any[] = [];
  fotosProducto: any[] = [];
  constructor(private route: ActivatedRoute, private dataService: ProductoService) {}
  ngOnInit() {
      const id = Number(this.route.snapshot.paramMap.get('id')); 
      this.dataService.getProductoById(id).subscribe((data) => {
        this.producto = data;
        console.log(this.producto)
      });
      this.dataService.getColor().subscribe((data) => {
        this.colores = data;
      });
       this.dataService.getTalla().subscribe((data) => {
        this.tallas = data;
      });
      
  }
}
