import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/models/productoModel';
import { ProductosService } from 'src/services/productos.service';
import { CarrerasService } from 'src/services/carreras.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit {
  productos : Producto[] = [];
  carreras : any[] = [];
  constructor(
    private productosService : ProductosService,
    private carrerasService: CarrerasService
  ) {}

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
    this.carrerasService.list().subscribe((resCarreras: any) => {    
      console.log(resCarreras);
      if(resCarreras.length == 0){
        console.log("No hay carreras.");
      }
      else{
        this.carreras = resCarreras;
      }
    });
  }

  mostrarMensaje(event: Event, opcion: string) {
    event.preventDefault();
    console.log(`Has seleccionado: ${opcion}`);
  }

}
