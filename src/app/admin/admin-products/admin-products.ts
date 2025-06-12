import { Component } from '@angular/core';
import { ProductoService } from '../../shared/services/product.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminNavbar } from '../../shared/components/admin-navbar/admin-navbar';
import { ModalProduct } from '../../shared/components/modal-product/modal-product';
import { AddModalProduct } from '../../shared/components/add-modal-product/add-modal-product';

@Component({
  selector: 'app-admin-products',
  imports: [CommonModule,RouterModule,ModalProduct,AddModalProduct],
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.css'
})
export class AdminProducts {
  productos: any[] = [];

  constructor(private productoService: ProductoService, private router: Router) { }

  ngOnInit(): void {
    this.productoService.getProduct().subscribe(
      (response) => {
        this.productos = response;
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }
  recargarProductos() {
    this.productoService.getProduct().subscribe(
      (productos) => this.productos = productos
    );
  }

  verDetalles(id: number) {

    this.router.navigate(['admin/productos', id]);
  }
  modalAbierto = false;
  modalAgregarAbierto=false;
  productoSeleccionado: any = null;

  abrirModal(producto: any) {
    
    this.productoSeleccionado = producto;
    console.log(this.productoSeleccionado)
    this.modalAbierto = true;
  }
  abrirModalAgregar(){
    this.modalAgregarAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.productoSeleccionado = null;
  }
  cerrarModalAgregar(){
    this.modalAgregarAbierto = false;
    this.productoSeleccionado = null;
  }
  
}
