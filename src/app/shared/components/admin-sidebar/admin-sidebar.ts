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
    { path: '/admin/categorias', label: 'Categorías' },
    { path: '/admin/usuarios', label: 'Usuarios' },
    { path: '/admin/pedidos', label: 'Pedidos' },
  ];

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
