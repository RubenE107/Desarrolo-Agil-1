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
  const productosNuevosMock:Producto[]=[
    {
      "producto_id": 1,
      "producto_descripcion": "Raspberry Pi Pico W RPW2040",
      "producto_precio": 150,
      "producto_existencia": 2,
      "producto_estado": 1,
      "carrera_nombre": "Computación",
      "usuario_nombre": "Ulises",
      "usuario_apellidos": "Pastor Martínez"
    },
    {
      "producto_id": 4,
      "producto_descripcion": "Juego De 40 Pinceles Profesionales Con Estuche De Almacenami",
      "producto_precio": 900,
      "producto_existencia": 1,
      "producto_estado": 1,
      "carrera_nombre": "Diseño",
      "usuario_nombre": "Hugo",
      "usuario_apellidos": "López Mateos"
    },
    {
      "producto_id": 8,
      "producto_descripcion": "Mechero de Bunsen",
      "producto_precio": 200,
      "producto_existencia": 2,
      "producto_estado": 1,
      "carrera_nombre": "Alimentos",
      "usuario_nombre": "Ana Lucía",
      "usuario_apellidos": "García Álvarez"
    }
  ]

  const productosUsadosMock:Producto[]=[
    {
      "producto_id": 2,
      "producto_descripcion": "Multímetro digital Truper VC301",
      "producto_precio": 180,
      "producto_existencia": 1,
      "producto_estado": 2,
      "carrera_nombre": "Electrónica",
      "usuario_nombre": "Ulises",
      "usuario_apellidos": "Pastor Martínez"
    },
    {
      "producto_id": 3,
      "producto_descripcion": "Portaplanos Ke De 95 Cm Rojo Con Negro",
      "producto_precio": 406,
      "producto_existencia": 1,
      "producto_estado": 2,
      "carrera_nombre": "Diseño",
      "usuario_nombre": "Francisco",
      "usuario_apellidos": "Méndez Quiroz"
    },
    {
      "producto_id": 5,
      "producto_descripcion": "Logitech M100 - Mouse USB con Cable, 3 Botones, Seguimiento óptico de 1000 dpi",
      "producto_precio": 540,
      "producto_existencia": 1,
      "producto_estado": 2,
      "carrera_nombre": "Computación",
      "usuario_nombre": "Ulises",
      "usuario_apellidos": "Pastor Martínez"
    },
    {
      "producto_id": 6,
      "producto_descripcion": "Álgebra de Baldor Original",
      "producto_precio": 270,
      "producto_existencia": 1,
      "producto_estado": 2,
      "carrera_nombre": "Matemáticas aplicadas",
      "usuario_nombre": "Gerardo",
      "usuario_apellidos": "Díaz Rodríguez"
    },
    {
      "producto_id": 7,
      "producto_descripcion": "Kit de laboratorio de química : Industrial y Científico",
      "producto_precio": 1900,
      "producto_existencia": 1,
      "producto_estado": 2,
      "carrera_nombre": "Alimentos",
      "usuario_nombre": "Ana Lucía",
      "usuario_apellidos": "García Álvarez"
    }
  ]


  // beforeEach(async () => {
  //   // Creamos un mock del servicio ProductosService
  //   mockProductosService = jasmine.createSpyObj('ProductosService', ['list','filter']);//agregar aqui los servicios que se usan en el componente
    
  //   await TestBed.configureTestingModule({
  //     imports: [HttpClientModule], // Agregar HttpClientModule para simular HTTP requests
  //     declarations: [InicioComponent],
  //     providers: [
  //       { provide: ProductosService, useValue: mockProductosService }
  //     ]
  //   }).compileComponents();
  // });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(InicioComponent);
  //   component = fixture.componentInstance;

  //   fixture.detectChanges();
  // });

  // it('Debería crear el componente', () => {
  //   expect(component).toBeTruthy();
  // });

  it('Debería filtrar los productos por los filtros', () => {
    // Configura el mock del servicio con productos
    const estadoProducto='nuevo';
    const mockProductosService = jasmine.createSpyObj('ProductosService', ['list', 'filter']);
    mockProductosService.filter.and.returnValue(of(productosNuevosMock)); // Mock de productos usados
    mockProductosService.list.and.returnValue(of(productosMock)); // Mock de todos los productos
    // Configura el TestBed
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [InicioComponent],
      providers: [
        { provide: ProductosService, useValue: mockProductosService }
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(InicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Dispara la detección de cambios para inicializar los elementos
    
    // 🟢 SIMULAR EL VALOR DE LOS INPUTS EN EL HTML
    const inputPrecio = fixture.nativeElement.querySelector('#quantity'); 
    const inputExistencia = fixture.nativeElement.querySelector('#quantity1');  
  
    // Asignar valores simulados a los inputs
    inputPrecio.value = '200';  
    inputExistencia.value = '2';  
  
    // Dispara un evento de input para que Angular reconozca el cambio
    inputPrecio.dispatchEvent(new Event('input'));
    inputExistencia.dispatchEvent(new Event('input'));
    
    // Establecer el estado a "usado"
    component.estado = 'nuevo'; // Filtrar productos usados
    
    // Llamar a la función de filtrado
    component.enviarFiltro();
  
    // Verificar que el servicio filter haya sido llamado con los valores correctos
    expect(mockProductosService.filter).toHaveBeenCalledWith({
      valor1: 'nuevo',  // El estado es 'usado'
      valor2: '200',    // El valor del precio simulado
      valor3: '2'       // El valor de existencia simulado
    });
  
    // Verificar que los productos devueltos sean los productos usados mockeados
    expect(component.productos).toEqual(productosNuevosMock);
  });
  
  
  

  // it('Debería obtener la lista de productos del servicio y mostrarlos en la vista', () => {
  //   // Simular la respuesta del servicio con datos mock
  //   mockProductosService.list.and.returnValue(of(productosMock));

  //   fixture = TestBed.createComponent(InicioComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges(); // Disparar la detección de cambios para actualizar la vista

  //   // Verificar que los productos fueron asignados correctamente
  //   expect(component.productos.length).toBe(4);
  //   expect(component.productos).toEqual(productosMock);

  //   // Verificar que los productos están en el HTML
  //   const productosElementos = fixture.debugElement.queryAll(By.css('.card'));
  //   expect(productosElementos.length).toBe(4);

  //   // Verificar que el primer producto tiene la descripción correcta en la vista
  //   const firstProductTitle = fixture.debugElement.query(By.css('.card-content h6')).nativeElement.textContent;
  //   expect(firstProductTitle).toContain("Raspberry Pi Pico W RPW2040");
  // });

  // it('Debería mostrar "No hay productos." cuando la lista está vacía', () => {
  //   // Simular que el servicio retorna una lista vacía
  //   mockProductosService.list.and.returnValue(of([]));

  //   fixture = TestBed.createComponent(InicioComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();

  //   expect(component.productos.length).toBe(0);
  //   expect(component.productos).toEqual([]);

  //   // No deberían existir tarjetas de productos
  //   const productosElementos = fixture.debugElement.queryAll(By.css('.card'));
  //   expect(productosElementos.length).toBe(0);
  // });

  // it('Debería llamar al servicio una vez', () => {
  //   mockProductosService.list.and.returnValue(of(productosMock));

  //   fixture = TestBed.createComponent(InicioComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();

  //   expect(mockProductosService.list).toHaveBeenCalledTimes(1);
  // });
});
