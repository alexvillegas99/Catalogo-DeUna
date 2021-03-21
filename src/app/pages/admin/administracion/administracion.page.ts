import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NavController, ModalController } from '@ionic/angular';
import { CrudProductosService } from '../../../services/crud-productos.service';
import { DataLocalService } from '../../../services/data-local.service';
import { CrudCategoriasService } from '../../../services/crud-categorias.service';
import { producto } from 'src/app/interfaces/producto';
import { categoria } from '../../../interfaces/categoria';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.page.html',
  styleUrls: ['./administracion.page.scss'],
})
export class AdministracionPage implements OnInit {

  constructor(private AuthService: AuthService,
    private navCtrl: NavController,
    private crudService: CrudProductosService,
    private modalCtrl: ModalController,
    private dataLocal: DataLocalService,
    private CategoriasService: CrudCategoriasService) { }
  tipos = ['Categorias', 'Todo'];
  cambiar = true;
  productos: producto[] = [];
  Categorias: categoria[] = [];
  textoBuscar = '';
  busqueda = false;
  ngOnInit() {
    this.dataLocal.setear();
    this.crudService.getProductos().subscribe(res => {
      this.productos = res;
    });
    this.cargarCategorias();

  }
  async cargarCategorias() {
    await this.CategoriasService.getCategorias().subscribe(res => {
      this.Categorias = res;
    });
  }
  cerrarSesion() {
    this.AuthService.logout();
    this.navCtrl.navigateForward('/admin');
  }
  CambioTipo(event) {
    if (event.detail.value == 'Categorias') {
      this.cambiar = true;
    } else {
      this.cambiar = false;
    }
  }
  buscar(ev) {
    this.textoBuscar = ev.detail.value

    if (this.textoBuscar.length == 0) {
      this.busqueda = false;
    } else {
      this.busqueda = true;

    }
  }
}
