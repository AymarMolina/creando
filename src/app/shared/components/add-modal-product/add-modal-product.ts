import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductoService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-modal-product',
  imports: [CommonModule,FormsModule],
  templateUrl: './add-modal-product.html',
  styleUrl: './add-modal-product.css'
})
export class AddModalProduct {
  @Input() isOpen = false;
  @Input() title = 'Título del Modal';
  @Output() close = new EventEmitter<void>();

  producto: any = {
    nombre: '',
    descripcion: '',
    precio: null,
    id_categoria: null
  };

  fotos: any[] = [
    { id_producto: null, url_foto: '' },
    { id_producto: null, url_foto: '' },
    { id_producto: null, url_foto: '' }
  ];

  categorias: any[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.categorias = this.productoService.getCategorias();
  }

  closeModal() {
    this.close.emit();
  }

  submitForm() {
    if (!this.isFormValid()) return;

    const formData = new FormData();
    formData.append('nombre', this.producto.nombre);
    formData.append('descripcion', this.producto.descripcion);
    formData.append('precio', this.producto.precio.toString());
    formData.append('id_categoria', this.producto.id_categoria.toString());

    this.fotos.forEach((foto, i) => {
      if (foto.file) {
        formData.append('fotos', foto.file, foto.file.name);
      }
    });
    for (const [key, value] of (formData as any).entries()) {
      console.log(`${key}:`, value);
    }


    this.productoService.addProduct(formData).subscribe({
      next: (res) => {
        console.log('Producto creado:', res);
        this.closeModal();
        // Recargar lista o lo que necesites
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }

  onFileChange(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      this.fotos[index] = {
        file,
        url_foto: URL.createObjectURL(file)
      };
    }
  }

  isFormValid(): boolean {
    return this.fotos.every(foto => foto.url_foto !== '');
  }
}
