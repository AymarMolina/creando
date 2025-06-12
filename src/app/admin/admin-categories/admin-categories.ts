import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoService } from '../../shared/services/product.service';

@Component({
  selector: 'app-admin-categories',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './admin-categories.html',
  styleUrl: './admin-categories.css'
})
export class AdminCategories {
  categorias: any[] = [];
  categoriaSeleccionada: any = null;
  mostrarFormulario = false;
  nuevaCategoria: string = '';

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.productoService.getCategorias1().subscribe(data => {
      this.categorias = data;
    });
  }
  eliminarCategoria(id: number): void {
    if (confirm('¿Deseas eliminar esta categoría?')) {
      this.productoService.deleteCategoria(id).subscribe(() => {
        this.categorias = this.categorias.filter(cat => cat.id_categoria !== id);
        if (this.categoriaSeleccionada?.id_categoria === id) {
          this.categoriaSeleccionada = null;
        }
      });
    }
  }
  agregarCategoria(): void {
    if (!this.nuevaCategoria.trim()) return;
    const data = { name: this.nuevaCategoria.trim() };
    this.productoService.addCategory(data).subscribe(nueva => {
      this.categorias.push(nueva);
      this.nuevaCategoria = '';
      this.mostrarFormulario = false;
    });
  }
}
