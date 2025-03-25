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
  estado:string="";  // Valor inicial, desmarcado

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
      document.getElementById("quantity")?.setAttribute("value", "0");
      document.getElementById("quantity1")?.setAttribute("value", "1");
    }


  

  onSubmit(numero : number){//enviar filtro al servidor{
    console.log(numero);
    if (numero === 1) {
      this.estado = "nuevo";
      (document.getElementById("redCheckbox") as HTMLInputElement).checked = true;
      (document.getElementById("redCheckbox1") as HTMLInputElement).checked = false;

    }
    else if (numero === 2) {
      this.estado = "usado";
      (document.getElementById("redCheckbox") as HTMLInputElement).checked = false;
      (document.getElementById("redCheckbox1") as HTMLInputElement).checked = true;
    }


  }
  limpiarFiltros(){//limpiar filtro
    this.estado="";
    (document.getElementById("quantity") as HTMLInputElement).value = "0"; // Poner 0 en el campo quantity
    (document.getElementById("quantity1") as HTMLInputElement).value = "0"; //

    (document.getElementById("redCheckbox") as HTMLInputElement).checked = false;
    (document.getElementById("redCheckbox1") as HTMLInputElement).checked = false;

    this.productosService.list().subscribe((resProductos: any) =>
      {
          this.productos = resProductos;
        
      });
    }

  enviarFiltro()
  {//enviar filtro al servidor
    let valorEstado=this.estado;//si esta llena se selecciono un estado,si no va vacio
    let valorPrecio = (document.getElementById("quantity") as HTMLInputElement).value;
    console.log(valorPrecio);
    let valorExistencia=(document.getElementById("quantity1") as HTMLInputElement).value;
    const valores={
      valor1:valorEstado,
      valor2:valorPrecio,
      valor3:valorExistencia
    }

    this.productosService.filter(valores).subscribe((resProductos: any) =>
    {
      if(resProductos.length == 0){
        //Mostar modal de que no hay productos

        console.log("No hay productos.");
      
        this.mostrarModal = true;
          
        this.productosService.list().subscribe((resProductos: any) =>
          {
              this.productos = resProductos;
            
          });
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
