import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { CrudProductosService } from '../../../services/crud-productos.service';
import { DataLocalService } from '../../../services/data-local.service';
import { CrudCategoriasService } from '../../../services/crud-categorias.service';
import { producto } from 'src/app/interfaces/producto';
import { categoria } from '../../../interfaces/categoria';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.page.html',
  styleUrls: ['./administracion.page.scss'],
})
export class AdministracionPage implements OnInit,OnDestroy {

  constructor(private AuthService: AuthService,
    private navCtrl: NavController,
    private crudService: CrudProductosService,
    private modalCtrl: ModalController,
    private dataLocal: DataLocalService,
    private CategoriasService: CrudCategoriasService,
    private alertCtrl: AlertController,
    private ProductosServices: CrudProductosService) { }
  tipos = ['Categorias', 'Activos', 'Inactivos'];
  categoria = true;
  cambiar = true;
  inactivos = false;
  activos = false;
  productos: producto[] = [];
  productosFiltrados: producto[] = [];
  productosInactivos: producto[] = [];
  Categorias: categoria[] = [];
  mensaje = '';
  textoBuscar = '';
  busqueda = false;
  sucriptionProductos: Subscription = new Subscription(); 
  sucriptionCategorias: Subscription = new Subscription();
  ngOnInit() {
    this.dataLocal.setear();
    this.sucriptionProductos = this.crudService.getProductos().subscribe(res => {
      this.productos=res;
      this.productosInactivos = this.productos.filter(prod =>
        prod.estado === false
      )
      this.productos = this.productos.filter(prod =>
        prod.estado === true
      )
        console.log(this.productosInactivos);
        console.log(this.productos);
    });
    this.cargarCategorias();

  }
  ngOnDestroy(){
    this.sucriptionCategorias.unsubscribe();
    this.sucriptionProductos.unsubscribe();
  }
  async cargarCategorias() {
  this.sucriptionCategorias =  await this.CategoriasService.getCategorias().subscribe(res => {
      this.Categorias = res;
    });

  }
  async editarProducto(id: string) {
    this.navCtrl.navigateForward(`admin/editar-producto/${id}`);
  }
  async eliminarProducto(id: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Advertencia',
      message: '<strong>Desea eliminar el producto ?</strong>',
      buttons: [
        {
          text: 'Cancerlar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.ProductosServices.deleteProducto(id);
          }
        }
      ]
    });

    await alert.present();
  }
  async editarCategoria(id: string) {
    this.navCtrl.navigateForward(`admin/editar-categoria/${id}`);
  }
  async eliminarCategoria(id: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Advertencia',
      message: '<strong>Desea eliminar la categoria ?</strong>',
      buttons: [
        {
          text: 'Cancerlar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.CategoriasService.deleteCategoria(id);
          }
        }
      ]
    });

    await alert.present();

  }
  cerrarSesion() {
    this.AuthService.logout();
    this.navCtrl.navigateForward('/admin');
  }
  CambioTipo(event) {
    if (event.detail.value == 'Categorias') {
      this.categoria = true;
      this.activos = false;
      this.inactivos = false;
    } else if (event.detail.value == 'Activos') {
      this.categoria = false;
      this.activos = true;
      this.inactivos = false;
    } else {
      this.categoria = false;
      this.activos = false;
      this.inactivos = true;
    }
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
      this.mensaje = 'No se encontraron coincidencias';
    } else {
      this.mensaje = ''
    }
  }
  async actualizarStock(producto: producto) {
    producto.estado = !producto.estado;
    this.ProductosServices.updateProducto(producto, producto.id);
  }

}
