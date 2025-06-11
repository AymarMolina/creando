import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
  @Input() id:any
  @Input() img:any
  @Input() nombre:any
  @Input() precio:any

  constructor(private router: Router){}

  verDetalles(id: number) {
    console.log("bruh")
    this.router.navigate(['/productos', id]);
  }
}
