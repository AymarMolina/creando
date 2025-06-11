import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-admin-detail-product',
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-detail-product.html',
  styleUrl: './admin-detail-product.css'
})
export class AdminDetailProduct {
  @ViewChildren('fileInputs') fileInputs!: QueryList<ElementRef<HTMLInputElement>>;
  producto: any;
  variantesProducto: any[] = [];
  colores: any[] = [];
  tallas: any[] = [];
  nuevaVariante = { id_color: null, id_talla: null, cantidad: 0 };
  fotosProducto: any[] = [];
  imagenSeleccionadaIndex: number | null = null; 
  nuevaImagen: string | ArrayBuffer | null = null; 
  constructor(private route: ActivatedRoute, private dataService: ProductoService) {}
  recargar(){
    const id = Number(this.route.snapshot.paramMap.get('id')); 
    this.dataService.getProductoById(id).subscribe((data) => {
      this.producto = data;
      this.variantesProducto = this.producto.variantes
    });
  }
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id')); 
    this.dataService.getProductoById(id).subscribe((data) => {
      this.producto = data;
      this.variantesProducto=this.producto.variantes
    });
    this.dataService.getColor().subscribe((data) => {
      this.colores = data;
    });
     this.dataService.getTalla().subscribe((data) => {
      this.tallas = data;
    });
    this.dataService.getFotos(id).subscribe((data) => {
      this.fotosProducto = data;
    });
    
  }

  getColorNombre(id_color: number) {
    return this.colores.find(c => c.id_color === id_color)?.nombre || 'Desconocido';
  }

  getTallaNombre(id_talla: number) {
    return this.tallas.find(t => t.id_talla === id_talla)?.nombre || 'Desconocido';
  }

  getStockCantidad(id_variante: number) {
    return this.dataService.getStock().find(s => s.id_variante === id_variante)?.cantidad || 0;
  }
  
  agregarVariante() {
    const idProducto = this.producto.id_producto; 
    const { id_color, id_talla, cantidad } = this.nuevaVariante;
  
    if (id_color == null || id_talla == null || cantidad <= 0) {
      console.error('Todos los campos deben estar completos y el stock debe ser mayor que cero.');
      return;
    }
  
    this.dataService.addVariant(idProducto, id_color, id_talla, cantidad).subscribe(
      (response) => {
        console.log('Variante agregada con éxito', response);
        this.variantesProducto.push(response);
        this.nuevaVariante = { id_color: null, id_talla: null, cantidad: 0 };
        this.recargar()
      },
      (error) => {
        console.error('Error al agregar variante', error);
      }
    );
  }
  
  seleccionarImagen(index: number) {
    const inputFile = document.querySelectorAll('input[type=file]')[index] as HTMLElement;
    inputFile.click();
  }

  onFileSelected(event: any, index: number) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('foto', file);

      const id_foto = this.fotosProducto[index].id_foto;

      this.dataService.actualizarFoto(id_foto, formData).subscribe({
        next: (res) => {
          console.log('Foto actualizada', res);
          this.fotosProducto[index].url_foto = res.url_foto;
        },
        error: (err) => {
          console.error('Error al actualizar foto', err);
        }
      });
    }
  }

}
