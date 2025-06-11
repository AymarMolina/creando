import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoService } from '../../shared/services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-color',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './admin-color.html',
  styleUrl: './admin-color.css'
})
export class AdminColor implements OnInit {
  colorForm: FormGroup;
  colores: any[] = [];
  editando: boolean = false;
  idEditando: number | null = null;

  constructor(private fb: FormBuilder, private colorService:ProductoService) {
    this.colorForm = this.fb.group({
      nombre: ['', Validators.required],
      codigo_color: ['#000000', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarColores();
  }

  cargarColores(): void {
    this.colorService.getColor().subscribe({
      next: (res) => {
        this.colores = res;
      },
      error: (err) => {
        console.error('Error al obtener colores', err);
      }
    });
  }

  onSubmit(): void {
    if (this.colorForm.invalid) return;

    const data = this.colorForm.value;

    if (this.editando && this.idEditando !== null) {
      // Editar color
      this.colorService.updateColor(this.idEditando, data).subscribe({
        next: () => {
          this.cancelarEdicion();
          this.cargarColores();
        },
        error: (err) => {
          console.error('Error al editar color', err);
        }
      });
    } else {
      // Agregar nuevo color
      this.colorService.addColor(data).subscribe({
        next: () => {
          this.colorForm.reset({ codigo_color: '#000000' });
          this.cargarColores();
        },
        error: (err) => {
          console.error('Error al agregar color', err);
        }
      });
    }
  }

  editarColor(color: any): void {
    this.editando = true;
    this.idEditando = color.id_color;
    this.colorForm.setValue({
      nombre: color.nombre,
      codigo_color: color.codigo_color
    });
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.idEditando = null;
    this.colorForm.reset({ codigo_color: '#000000' });
  }

  eliminarColor(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este color?')) {
      this.colorService.deleteColor(id).subscribe({
        next: () => this.cargarColores(),
        error: (err) => {
          console.error('Error al eliminar color', err);
        }
      });
    }
  }
}
