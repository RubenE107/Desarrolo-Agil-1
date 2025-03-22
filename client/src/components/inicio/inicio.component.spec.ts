import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioComponent } from './inicio.component';
import { ProductosService } from 'src/services/productos.service';
import { of } from 'rxjs';
import { Producto } from 'src/models/productoModel';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

describe('InicioComponent', () => {
  let component: InicioComponent;
  let fixture: ComponentFixture<InicioComponent>;
  let mockProductosService: jasmine.SpyObj<ProductosService>;

  // Datos simulados que retornará el servicio
  const productosMock: Producto[] = [
    {
      producto_id: 1,
      producto_descripcion: "Raspberry Pi Pico W RPW2040",
      producto_precio: 150,
      producto_existencia: 2,
      producto_estado: 1,
      carrera_nombre: "Computación",
      usuario_nombre: "Ulises",
      usuario_apellidos: "Pastor Martínez"
    },
    {
      producto_id: 2,
      producto_descripcion: "Multímetro digital Truper VC301",
      producto_precio: 180,
      producto_existencia: 1,
      producto_estado: 2,
      carrera_nombre: "Electrónica",
      usuario_nombre: "Ulises",
      usuario_apellidos: "Pastor Martínez"
    },
    {
      producto_id: 3,
      producto_descripcion: "Portaplanos Ke De 95 Cm Rojo Con Negro",
      producto_precio: 406,
      producto_existencia: 1,
      producto_estado: 2,
      carrera_nombre: "Diseño",
      usuario_nombre: "Francisco",
      usuario_apellidos: "Méndez Quiroz"
    },
    {
      producto_id: 4,
      producto_descripcion: "Juego De 40 Pinceles Profesionales Con Estuche De Almacenami",
      producto_precio: 900,
      producto_existencia: 1,
      producto_estado: 1,
      carrera_nombre: "Diseño",
      usuario_nombre: "Hugo",
      usuario_apellidos: "López Mateos"
    }
  ];

  beforeEach(async () => {
    // Creamos un mock del servicio ProductosService
    mockProductosService = jasmine.createSpyObj('ProductosService', ['list']);
    
    await TestBed.configureTestingModule({
      imports: [HttpClientModule], // Agregar HttpClientModule para simular HTTP requests
      declarations: [InicioComponent],
      providers: [
        { provide: ProductosService, useValue: mockProductosService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioComponent);
    component = fixture.componentInstance;
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería obtener la lista de productos del servicio y mostrarlos en la vista', () => {
    // Simular la respuesta del servicio con datos mock
    mockProductosService.list.and.returnValue(of(productosMock));

    fixture = TestBed.createComponent(InicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Disparar la detección de cambios para actualizar la vista

    // Verificar que los productos fueron asignados correctamente
    expect(component.productos.length).toBe(4);
    expect(component.productos).toEqual(productosMock);

    // Verificar que los productos están en el HTML
    const productosElementos = fixture.debugElement.queryAll(By.css('.card'));
    expect(productosElementos.length).toBe(4);

    // Verificar que el primer producto tiene la descripción correcta en la vista
    const firstProductTitle = fixture.debugElement.query(By.css('.card-content h6')).nativeElement.textContent;
    expect(firstProductTitle).toContain("Raspberry Pi Pico W RPW2040");
  });

  it('Debería mostrar "No hay productos." cuando la lista está vacía', () => {
    // Simular que el servicio retorna una lista vacía
    mockProductosService.list.and.returnValue(of([]));

    fixture = TestBed.createComponent(InicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.productos.length).toBe(0);
    expect(component.productos).toEqual([]);

    // No deberían existir tarjetas de productos
    const productosElementos = fixture.debugElement.queryAll(By.css('.card'));
    expect(productosElementos.length).toBe(0);
  });

  it('Debería llamar al servicio una vez', () => {
    mockProductosService.list.and.returnValue(of(productosMock));

    fixture = TestBed.createComponent(InicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(mockProductosService.list).toHaveBeenCalledTimes(1);
  });
});
