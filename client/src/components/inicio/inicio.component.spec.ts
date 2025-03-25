import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InicioComponent } from './inicio.component';
import { ProductosService } from 'src/services/productos.service';
import { CarrerasService } from 'src/services/carreras.service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('InicioComponent', () => {
  let component: InicioComponent;
  let fixture: ComponentFixture<InicioComponent>;
  let productosService: ProductosService;
  let carrerasService: CarrerasService;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ ProductosService, CarrerasService ]
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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