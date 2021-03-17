import { Component, OnInit } from '@angular/core';
import { CrudProductosService } from '../../services/crud-productos.service';
import { producto } from '../../interfaces/producto';
import { CarritoPage } from '../carrito/carrito.page';
import { ModalController, NavController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor( private crudService:CrudProductosService,
                private modalCtrl:ModalController,
                private navCtrl:NavController,
                private dataLocal:DataLocalService) { }
  textoBuscar='';
  productos:producto[]=[];
  ngOnInit() {
    this.dataLocal.setear();
    this.crudService.getProductos().subscribe(res=>{
      this.productos = res;
    }) ;
  }
  buscar(event){
  }
  async carrito(){
  /*  const modal = await this.modalCtrl.create({
      component: CarritoPage
    });
    
    return await modal.present();
    */
   this.navCtrl.navigateForward('/carrito');
  }

}
