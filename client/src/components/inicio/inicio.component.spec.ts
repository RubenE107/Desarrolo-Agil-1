import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InicioComponent } from './inicio.component';
import { ProductosService } from 'src/services/productos.service';
import { CarrerasService } from 'src/services/carreras.service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Producto } from 'src/models/productoModel';
import { HttpClientModule } from '@angular/common/http';

fdescribe('InicioComponent', () => {
  let component: InicioComponent;
  let fixture: ComponentFixture<InicioComponent>;
  //let mockProductosService: jasmine.SpyObj<ProductosService>;

  let productosService: ProductosService;
  let carrerasService: CarrerasService;
  let debugElement: DebugElement;;
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

  beforeEach(async () => {
   await TestBed.configureTestingModule({
     declarations: [ InicioComponent ],
     imports: [ HttpClientTestingModule, HttpClientModule ],
     providers: [ ProductosService, CarrerasService,]
   })
   .compileComponents();
   });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioComponent);
    component = fixture.componentInstance;
    productosService = TestBed.inject(ProductosService);
    carrerasService = TestBed.inject(CarrerasService);
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

//   it('Debería filtrar los productos por los filtros', () => {
//     // Configura el mock del servicio con productos
//     const estadoProducto='nuevo';

//     // ProductosService.filter.and.returnValue(of(productosNuevosMock)); // Mock de productos usados
//     // ProductosService.list.and.returnValue(of(productosMock)); // Mock de todos los productos
//     spyOn(productosService, 'filter').and.returnValue(of(productosUsadosMock));
//     component.ngOnInit();
//     fixture.detectChanges();
//     // Configura el TestBed
//     // TestBed.configureTestingModule({
//     //   imports: [HttpClientModule],
//     //   declarations: [InicioComponent],
//     //   providers: [
//     //     { provide: ProductosService, useValue: mockProductosService }
//     //   ]
//     // }).compileComponents();
  
//     // fixture = TestBed.createComponent(InicioComponent);
//     // component = fixture.componentInstance;
//     // fixture.detectChanges(); // Dispara la detección de cambios para inicializar los elementos
    
//     // 🟢 SIMULAR EL VALOR DE LOS INPUTS EN EL HTML
//     const inputPrecio = fixture.nativeElement.querySelector('#quantity'); 
//     const inputExistencia = fixture.nativeElement.querySelector('#quantity1');  

//     inputPrecio.value = '200';  
//     inputExistencia.value = '1';  
//         // Dispara un evento de input para que Angular reconozca el cambio
//     inputPrecio.dispatchEvent(new Event('input'));
//     inputExistencia.dispatchEvent(new Event('input'));

//     component.estado = 'nuevo'; // Filtrar productos usados

//     component.enviarFiltro();

//     expect(mockProductosService.filter).toHaveBeenCalledWith({
//       valor1: 'nuevo',  // El estado es 'usado'
//       valor2: '200',    // El valor del precio simulado
//       valor3: '2'       // El valor de existencia simulado
//     });
//     // Verificar que los productos devueltos sean los productos usados mockeados
// expect(component.productos).toEqual(productosNuevosMock);});// Verificar que los productos devueltos sean los productos usados mockeados


  it('should display carreras in <a> tags', () => {
    const mockCarreras = [
      { carrera_id: 1, carrera_nombre: 'Carrera 1' },
      { carrera_id: 2, carrera_nombre: 'Carrera 2' }
    ];

    spyOn(carrerasService, 'list').and.returnValue(of(mockCarreras));
    component.ngOnInit();
    fixture.detectChanges();

    const carreraElements = debugElement.queryAll(By.css('.carreras-list a'));
    expect(carreraElements.length).toBe(mockCarreras.length);
    carreraElements.forEach((el, index) => {
      expect(el.nativeElement.textContent).toContain(mockCarreras[index].carrera_nombre);
    });
  });

  it('should filter products by career when a career is selected', () => {
    const mockProductos = [
      { producto_id: 1, producto_descripcion: 'Producto 1', producto_precio: 100, producto_existencia: 10, producto_estado: 1, carrera_nombre: 'Carrera 1', usuario_nombre: 'Usuario 1', usuario_apellidos: 'Apellido 1' },
      { producto_id: 2, producto_descripcion: 'Producto 2', producto_precio: 200, producto_existencia: 20, producto_estado: 1, carrera_nombre: 'Carrera 2', usuario_nombre: 'Usuario 2', usuario_apellidos: 'Apellido 2' }
    ];

    spyOn(productosService, 'listByCareer').and.returnValue(of(mockProductos));
    component.seleccionarCarrera(new Event('click'), 1);
    fixture.detectChanges();

    expect(component.productos).toEqual(mockProductos);
  });

  it('should show all products when "Todas las carreras" is selected', () => {
    const mockProductos = [
      { producto_id: 1, producto_descripcion: 'Producto 1', producto_precio: 100, producto_existencia: 10, producto_estado: 1, carrera_nombre: 'Carrera 1', usuario_nombre: 'Usuario 1', usuario_apellidos: 'Apellido 1' },
      { producto_id: 2, producto_descripcion: 'Producto 2', producto_precio: 200, producto_existencia: 20, producto_estado: 1, carrera_nombre: 'Carrera 2', usuario_nombre: 'Usuario 2', usuario_apellidos: 'Apellido 2' }
    ];

    spyOn(productosService, 'list').and.returnValue(of(mockProductos));
    component.seleccionarCarrera(new Event('click'), 0);
    fixture.detectChanges();

    expect(component.productos).toEqual(mockProductos);
  });

});








  // it('Debería crear el componente', () => {
  //   expect(component).toBeTruthy();
  // });
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



