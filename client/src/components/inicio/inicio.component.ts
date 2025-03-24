import { Component, OnInit } from '@angular/core';
import { IntegerType } from 'mongodb';
import { Producto } from 'src/models/productoModel';
import { ProductosService } from 'src/services/productos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit {
  estado:string="";  // Valor inicial, desmarcado

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

  enviarFiltro(){//enviar filtro al servidor
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
      console.log(resProductos);
      if(resProductos.length == 0){
        this.productosService.list().subscribe((resProductos: any) =>
          {
              this.productos = resProductos;
            
          });
      }
      else{
        this.productos = resProductos;
        console.log(this.productos);
      }
    });

  }
}
