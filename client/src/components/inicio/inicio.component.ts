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
  mostrarModal: boolean = false;
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
          this.mostrarModal = true;
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

  seleccionarCarrera(event: Event, carrera_id: number) {
    event.preventDefault();
    console.log(`Has seleccionado: ${carrera_id}`);

    if (carrera_id == 0) {
      this.productosService.list().subscribe((resProductos: any) =>
        {
          console.log(resProductos);
          if(resProductos.length == 0){
            console.log("No hay productos.");
            this.mostrarModal = true;
          }
          else{
            this.productos = resProductos;
          }
        });
    } else {
      this.productosService.listByCareer(carrera_id).subscribe((resProductos: any) => {
        console.log(resProductos);
        if(resProductos.length == 0){
          console.log("No hay productos para esta carrera.");
          this.mostrarModal = true;
        }
        else{
          this.productos = resProductos;
        }
      });
    }
  }

  cerrarModal() {
    this.mostrarModal = false;
  }
}
