import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/product.service';

@Component({
  selector: 'app-modal-product',
  imports: [FormsModule,CommonModule],
  templateUrl: './modal-product.html',
  styleUrl: './modal-product.css'
})
export class ModalProduct {
  @Input() isOpen = false;
  @Input() title = 'Título del Modal';
  @Input() product:any={}
  @Output() close = new EventEmitter<void>();
  @Output() updated = new EventEmitter<any>();
   constructor(private route: ActivatedRoute, private productoService: ProductoService) {}
  
  closeModal() {
    this.close.emit();
    console.log(this.product)
  }
  autoGrow(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Reinicia para calcular correctamente
    textarea.style.height = textarea.scrollHeight + 'px'; // Ajusta a contenido
  }

  submitForm() {
    if (!this.product.id_producto) {
      console.error('El producto no tiene ID para actualizar');
      return;
    }

    this.productoService.updateProduct(this.product.id_producto, {
      nombre: this.product.nombre,
      descripcion: this.product.descripcion,
      precio: this.product.precio,
      estado: this.product.estado
    }).subscribe(
      (response) => {
        console.log('Producto actualizado:', response);
        this.updated.emit()
        this.closeModal(); 
      },
      (error) => {
        console.error('Error al actualizar producto:', error);
      }
    );
  }
}
