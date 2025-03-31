import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { MercadoPagoService } from 'src/app/services/mercado-pago.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {
  // Datos del producto
  producto: any = {
    id: 0,
    title: '',
    unit_price: 0,
    quantity: 0,
    description: '',
    available_quantity: 0
  };
  
  // Datos de la compra
  compra: any = {
    cantidad: 1,
    subtotal: 0,
    total: 0
  };
  isLoading: boolean = false;
  currentUrl: string = '';
  pagoExitoso: string ='' ;
  ErrorDePago: string ='';
  PagoPendiente: string ='';
  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private pagoService: MercadoPagoService
    ,private location: Location
  ) {
  }

  ngOnInit(): void {
    this.loadProductData();
  }

  private loadProductData(): void {
    this.producto.id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.productosService.listOne(this.producto.id).subscribe({
      next: (resProducto: any) => {
        if (resProducto) {
          this.setProductData(resProducto);
        } else {
          console.error("No se encontró el producto");
        }
      },
      error: (err) => {
        console.error("Error al cargar el producto:", err);
      }
    });
    
  }

  private setProductData(productData: any): void {
    this.producto = {
      ...this.producto,
      title: productData.producto_descripcion,
      unit_price: productData.producto_precio,
      available_quantity: productData.producto_existencia,
      description: productData.producto_descripcion
    };
    
    this.logProductData();
   
  }

  private logProductData(): void {
    console.log('Datos del producto:', {
      id: this.producto.id,
      title: this.producto.title,
      price: this.producto.unit_price,
      stock: this.producto.available_quantity,
      description: this.producto.description
    });
    this.updateTotals();
  }
  
  updateTotals(): void {
    this.compra.subtotal = this.producto.unit_price * this.compra.cantidad;
    this.compra.total = this.compra.subtotal;
    
    console.log('Resumen de compra:', {
      cantidad: this.compra.cantidad,
      subtotal: this.compra.subtotal,
      total: this.compra.total
    });
    
  }

  checkout(): void {
    
    this.isLoading = true;
    const orderData = {
      items: [{
        id: this.producto.id,
        title: this.producto.title,
        unit_price: this.producto.unit_price,
        quantity: this.compra.cantidad,
        description: this.producto.description
      }]
    };
    this.pagoService.crearOrden(this.producto.title, this.compra.cantidad, this.producto.unit_price).subscribe({
      next: (res: any) => {
        console.log('Orden creada:', res);
        window.location.href = res.init_point;
      }
      // error: (err) => {
      //   console.error("Error al cargar el producto:", err);
      // }
      
    });
    //console.log('Datos enviados al servidor:', orderData);
    //alert();
    
    // Aquí deberías llamar a tu servicio para enviar los datos al backend
    // this.pagoService.crearOrden(orderData).subscribe(...);
  }
}