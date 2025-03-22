import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/models/productoModel';
import { ProductosService } from 'src/services/productos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit {
  productos : Producto[] = [];
  constructor(private productosService : ProductosService) {}

  ngOnInit(): void {
    this.productosService.list().subscribe((resProductos: any) =>
      {
        console.log(resProductos);
        if(resProductos.length == 0){
          console.log("No hay productos.");
        }
        else{
          this.productos = resProductos;
        }
      });
  }

}
