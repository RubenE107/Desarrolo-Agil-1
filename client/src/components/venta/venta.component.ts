import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Carrera } from 'src/models/carreraModel';
import { Producto } from 'src/models/productoModel';
import { CarrerasService } from 'src/services/carreras.service';
import { ProductosService } from 'src/services/productos.service';
import { environment } from 'src/environments/environment';
import { ImagenesService } from 'src/services/imagenes.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  carreras: Carrera[] = [];
  productos: Producto[] = [];
  producto : Producto = new Producto();

  url: string | null | ArrayBuffer = null;
  liga = '';
  imgUsuario: any;
  fileToUpload: any;
  blob: any;
  estado: any;
  selectedCarreraIndex: number = 0;
  selectedEstado: number = -1;

  constructor(private carrerasService: CarrerasService, private productosService: ProductosService,private imagenesService: ImagenesService, private router: Router) {
    this.imgUsuario = null;
    this.fileToUpload = null;
    this.liga = environment.API_URI_IMAGENES;
   }

  ngOnInit(): void {
    this.carrerasService.list().subscribe((resCarreras: any) => {
      console.log(resCarreras);
      if (resCarreras.length === 0) {
        console.log("No hay carreras.");
      } else {
        this.carreras = resCarreras;
      }
    });
    this.productosService.list().subscribe((resProductos: any) => {
      console.log(resProductos);
      if (resProductos.length == 0) {
        console.log("No hay productos.");
      } else {
        this.productos = resProductos;
      }
    });
  }

  irAHome() {
    this.router.navigate(['/home/inicio']);
  }

  cargandoImagen(archivo: any) {
    if (archivo.files.length == 0) {
      this.imgUsuario = null;
      this.liga = environment.API_URI_IMAGENES;
    } else {
      this.imgUsuario = null;
      this.liga = environment.API_URI_IMAGENES;
      this.fileToUpload = archivo.files.item(0);
      let imgPromise = this.getFileBlob(this.fileToUpload);
      imgPromise.then(blob => {//Espera a que se cargue la img
        //console.log("convirtiendo imagen");
        this.blob = blob;//Se convierte la imagen a blob
        this.url = blob as string; // Asignar el blob como URL
      });
    }
  }

  getFileBlob(file: any) {
    var reader = new FileReader();
    return new Promise(function (resolve, reject) { //Espera a que se cargue la img
      reader.onload = (function (thefile) {
        return function (e) {
          // console.log(e.target?.result)
          resolve(e.target?.result);
        };

      })(file);
      reader.readAsDataURL(file);
    });
  }
  
  onSubmit(event: any){
    this.selectedEstado = event.target.value;
    this.producto.producto_estado = this.selectedEstado;
    console.log(this.selectedEstado)
  }
  onCarrera(event: any){
    this.selectedCarreraIndex = event.target.value;
  }
  NuevoProducto(){
    this.productosService.create(this.producto.producto_descripcion, this.producto.producto_precio, this.producto.producto_existencia, this.producto.producto_estado, this.selectedCarreraIndex).subscribe((resProducto: any) =>{
      console.log(resProducto);
      if (resProducto && resProducto.productoId) {
        this.guardarImagen(resProducto.productoId);
      }
      Swal.fire({
        title: '¡Producto Registrado!',
        text: 'Nuevo Producto Añadido.',
        icon: "success"
      }).then(() => { // Agrega la propiedad 'then'
        this.irAHome();
      });
    },
    err => console.error(err)
    );
  }
  guardarImagen(productoId: number){
    if (this.fileToUpload != null){
      this.imagenesService.guardarImagen(productoId, this.blob).subscribe((res: any) => {
        this.imgUsuario = this.blob;
          //console.log(resProductos);
      },err => console.error(err));
      // Actualizar la variable 'liga' después de cargar la imagen
      this.liga = '';
      this.liga = environment.API_URI_IMAGENES;
    }
  }
}