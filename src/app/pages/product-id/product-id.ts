import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../shared/services/product.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../shared/services/cart.service';
interface ItemCarrito {
  id_producto: number;
  nombre: string;
  imagen: string;
  precio: number;
  color: string;
  talla: string;
  cantidad: number;
}

@Component({
  selector: 'app-product-id',
  imports: [CommonModule],
  templateUrl: './product-id.html',
  styleUrl: './product-id.css'
})
export class ProductId {
  producto: any;
  colorSeleccionado: string = '';
  tallaSeleccionada: string = '';
  variantesProducto: any[] = [];
  colores: any[] = [];
  tallas: any[] = [];
  fotosProducto: any[] = [];
  constructor(private route: ActivatedRoute, private dataService: ProductoService,private cartService: CartService) {}
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.dataService.getProductoById(id).subscribe((data) => {
      this.producto = data;
      console.log(this.producto)

      // IDs de color y talla usados por el producto
      const colorIds = data.variantes.map((v: any) => v.id_color);
      const tallaIds = data.variantes.map((v: any) => v.id_talla);

      // Colores filtrados
      this.dataService.getColor().subscribe((coloresData) => {
        this.colores = coloresData.filter((c: any) => colorIds.includes(c.id_color));
      });

      // Tallas filtradas
      this.dataService.getTalla().subscribe((tallasData) => {
        this.tallas = tallasData.filter((t: any) => tallaIds.includes(t.id_talla));
      });
    });
  }
  anadirAlCarrito() {
      if (!this.colorSeleccionado || !this.tallaSeleccionada) {
      alert('Por favor selecciona color y talla');
      return;
    }

    const productoEnCarrito: ItemCarrito = {
      id_producto: this.producto.id_producto,
      nombre: this.producto.nombre,
      imagen: this.producto.fotos[0], // primera imagen como miniatura
      precio: parseFloat(this.producto.precio),
      color: this.colorSeleccionado,
      talla: this.tallaSeleccionada,
      cantidad: 1
    };

    // Obtener el carrito actual desde localStorage
    let carrito: ItemCarrito[] = JSON.parse(localStorage.getItem('carrito') || '[]');

    // Verificar si ya existe ese producto con misma talla y color
    const existente = carrito.find(item =>
      item.id_producto === productoEnCarrito.id_producto &&
      item.color === productoEnCarrito.color &&
      item.talla === productoEnCarrito.talla
    );

    if (existente) {
      existente.cantidad += 1;
    } else {
      carrito.push(productoEnCarrito);
    }

    // Guardar nuevamente en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert('Producto añadido al carrito');
  }
}