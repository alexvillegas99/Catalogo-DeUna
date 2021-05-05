import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CrudProductosService } from '../../services/crud-productos.service';
import { producto } from '../../interfaces/producto';
import { CarritoPage } from '../carrito/carrito.page';
import { IonSegment, ModalController, NavController } from '@ionic/angular';
import { categoria } from '../../interfaces/categoria';
import { CrudCategoriasService } from '../../services/crud-categorias.service';
import { Subscription } from 'rxjs';
import { CrudPromocionesService } from '../../services/crud-promociones.service';
import { promociones } from '../../interfaces/promociones';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit, OnDestroy{
  @ViewChild(IonSegment) segment: IonSegment;

  sucriptionProductos: Subscription = new Subscription(); 
  sucriptionCategorias: Subscription = new Subscription();
  suscripcionPromociones: Subscription = new Subscription();
  tipos = ['Categorias', 'Todo'];
  cambiar = true;
  busqueda = false;
  productosFiltrados: producto[] = [];
  Categorias: categoria[] = [];
  promociones:promociones[]=[];
  mensaje = '';
  constructor(private crudService: CrudProductosService,
    private modalCtrl: ModalController,
    private CategoriasService: CrudCategoriasService,
    private PromosionesSercices:CrudPromocionesService) { }
  textoBuscar = '';
  productos: producto[] = [];
  ngOnInit() {
   this.sucriptionProductos = this.crudService.getProductos().subscribe(res => {
      this.productos = res;
      this.productos = this.productos.filter(prod=>
      prod.estado===true
      )
    });
    this.cargarCategorias();
    this.suscripcionPromociones= this.PromosionesSercices.getProductos().subscribe(res => {
      this.promociones = res;
      this.promociones = this.promociones.filter(prod=>
        prod.estado===true
        )
    });
  }
    ngOnDestroy():void{
    this.sucriptionProductos.unsubscribe();
    this.sucriptionCategorias.unsubscribe();
    this.suscripcionPromociones.unsubscribe();
  }
  async cargarCategorias() {
  this.sucriptionCategorias=  await this.CategoriasService.getCategorias().subscribe(res => {
      this.Categorias = res;
    });

  }

  buscar(ev) {
    this.textoBuscar = ev.detail.value

    if (this.textoBuscar.length == 0) {
      this.busqueda = false;
    } else {
      this.busqueda = true;

    }

    this.productosFiltrados = [];
    let longitud: number = this.textoBuscar.length;
    this.productos.forEach(producto => {
      if (this.textoBuscar.toLocaleLowerCase() === producto.nombre.substring(0, longitud).toLocaleLowerCase()) {
        this.productosFiltrados.push(producto);
      }
    })

    if (this.productosFiltrados.length == 0) {
      this.mensaje = 'No se encontraron coincidencias'
    } else {
      this.mensaje = ''
    }
  }

  async carrito() {
    const modal = await this.modalCtrl.create({
      component: CarritoPage
    });

    return await modal.present();

  }
  CambioTipo(event) {
    if (event.detail.value == 'Categorias') {
      this.cambiar = true;
    } else {
      this.cambiar = false;
    }
  }

}
