import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiUrl = 'http://localhost:5000/api'; // Ajusta la URL según tu backend

  constructor(private http: HttpClient) {}

  //PRODUCTOS
  addProduct(productoData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/productos`, productoData);
  }
  getProduct(): Observable<any>{
    return this.http.get(`${this.apiUrl}/productos`);
  }
  getProductoById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/productos/${id}`);
  }
  updateProduct(id: number, productoData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/productos/${id}`, productoData);
  }

  //FOTOS
  getFotos(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/fotos`);
  }
  actualizarFoto(id_foto: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/fotos/${id_foto}`, formData);
  }

  //COLOR
  addColor(colorData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/color`, colorData);
  }
  getColor(): Observable<any> {
    return this.http.get(`${this.apiUrl}/color`);
  }
  getColorById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/color/${id}`);
  }
  updateColor(id: number, colorData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/color/${id}`, colorData);
  }
  deleteColor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/color/${id}`);
  }

  //TALLA
  getTalla(): Observable<any>{
    return this.http.get(`${this.apiUrl}/talla`);
  }

  //VARIANTE
  getVariants(): Observable<any> {
    return this.http.get(`${this.apiUrl}/variantes`);
  }
  getStocks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/variantes`);
  }
  // Método para agregar una variante
  addVariant(idProducto: number, idColor: number, idTalla: number, cantidad: number): Observable<any> {
    const body = { productId: idProducto, colorId: idColor, sizeId: idTalla, stock: cantidad };
    return this.http.post(`${this.apiUrl}/productos/${idProducto}/variantes`, body);
  }
  categorias = [
    { id_categoria: 1, nombre: "Camiseta" },
    { id_categoria: 2, nombre: "Pantalones" },
  ];

  colores = [
    { id_color: 1, nombre: "Rojo" },
    { id_color: 2, nombre: "Azul" },
    { id_color: 3, nombre: "Negro" },
  ];

  tallas = [
    { id_talla: 1, nombre: "S" },
    { id_talla: 2, nombre: "M" },
    { id_talla: 3, nombre: "L" },
    { id_talla: 4, nombre: "XL" },
  ];

  productos = [
    {
      id_producto: 1,
      nombre: "Camiseta Básica",
      descripcion: "Camiseta de algodón 100%",
      precio: 49.99,
      id_categoria: 1,
      fecha_creacion: "2024-03-30",
      estado: "Activo",
    },
    {
      id_producto: 2,
      nombre: "Jeans Skinny",
      descripcion: "Jeans ajustados para mayor comodidad",
      precio: 89.99,
      id_categoria: 2,
      fecha_creacion: "2024-03-28",
      estado: "Activo",
    },
  ];

  variantes_producto = [
    { id_variante: 1, id_producto: 1, id_color: 1, id_talla: 2 },
    { id_variante: 2, id_producto: 1, id_color: 3, id_talla: 3 },
    { id_variante: 3, id_producto: 2, id_color: 2, id_talla: 1 },
  ];

  stock = [
    { id_stock: 1, id_variante: 1, cantidad: 10 },
    { id_stock: 2, id_variante: 2, cantidad: 5 },
    { id_stock: 3, id_variante: 3, cantidad: 8 },
  ];

  fotos_productos=[
    {
        id_producto: 1,
        url_foto:"https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg"
    },
    {
        id_producto:1,
        url_foto:"https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg"
    },
    {
        id_producto:1,
        url_foto:"https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg"
    }
  ]



  getCategorias() {
    return this.categorias;
  }

  getColores() {
    return this.colores;
  }

  getTallas() {
    return this.tallas;
  }

  getVariantes() {
    return this.variantes_producto;
  }

  getStock() {
    return this.stock;
  }
  getFotosProducto(id_producto: number) {
    return this.fotos_productos.filter(foto => foto.id_producto === id_producto);
  }
  
}
