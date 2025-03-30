import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductosService } from 'src/app/services/productos.service';
import { of } from 'rxjs';
import { VentaComponent } from './venta.component';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router'; 
import { HomeComponent } from 'src/app/components/home/home.component';
import { InicioComponent } from 'src/app/components/inicio/inicio.component';

fdescribe('VentaComponent - NuevoProducto', () => {
  let component: VentaComponent;
  let fixture: ComponentFixture<VentaComponent>;
  let productosService: ProductosService;
  let router: Router;  

  const routes = [
    { path: 'home', component: HomeComponent, children: [
      { path: 'inicio', component: InicioComponent },
      { path: 'ventas', component: VentaComponent }
    ]}
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VentaComponent],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule.withRoutes(routes)],
      providers: [ProductosService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaComponent);
    component = fixture.componentInstance;
    productosService = TestBed.inject(ProductosService);
    router = TestBed.inject(Router);  
    fixture.detectChanges();
  });

  it('debería registrar un nuevo producto correctamente', (done) => {
    const productoMock = { productoId: 1 };
    spyOn(productosService, 'create').and.returnValue(of(productoMock));
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({
      isConfirmed: true,
      isDenied: false,
      isDismissed: false
    }));
    spyOn(router, 'navigate');  

    component.producto = {
      producto_id: 1,
      producto_descripcion: 'Producto de prueba',
      producto_precio: 100,
      producto_existencia: 5,
      producto_estado: 1,
      carrera_nombre: 'Test Carrera',
      usuario_nombre: 'Test Usuario',
      usuario_apellidos: 'Test Apellidos'
    };
    component.selectedCarreraIndex = 2;

    component.NuevoProducto();

    expect(productosService.create).toHaveBeenCalledWith(
      component.producto.producto_descripcion,
      component.producto.producto_precio,
      component.producto.producto_existencia,
      component.producto.producto_estado,
      component.selectedCarreraIndex
    );

    // Verifica que Swal.fire fue llamado
    expect(Swal.fire).toHaveBeenCalled();

    Swal.fire().then(() => {
      expect(router.navigate).toHaveBeenCalledWith(['/home/inicio']);
      done();  
    });
  });
});
