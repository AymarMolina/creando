import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  imports: [CommonModule,RouterModule],
  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.css'
})
export class AdminSidebar {
  isOpen = true;

  links = [
    { path: '/admin/productos', label: 'Productos' },
    { path: '/admin/colores', label: 'Colores' },
    { path: '/admin/categorias', label: 'Categorías' }
  ];

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
