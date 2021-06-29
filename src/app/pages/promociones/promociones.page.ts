import { Component, OnDestroy, OnInit } from '@angular/core';
import { promociones } from '../../interfaces/promociones';
import { ModalController } from '@ionic/angular';
import { PromocionPage } from './promocion/promocion.page';
import { CrudPromocionesService } from '../../services/crud-promociones.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.page.html',
  styleUrls: ['./promociones.page.scss'],
})
export class PromocionesPage implements OnInit ,OnDestroy{

  constructor(private modalCtrl:ModalController,
    private ProductosServices:CrudPromocionesService) { }
promociones:promociones[]=[];
sucriptionProductos: Subscription = new Subscription();
  ngOnInit() {
   this.sucriptionProductos= this.ProductosServices.getProductos().subscribe(res => {
      this.promociones = res;
      this.promociones = this.promociones.filter(prod=>
        prod.estado===true
        )
        this.promociones.sort(function (a, b){
          if ( a.nombre < b.nombre )
          return -1;
          if ( a.nombre > b.nombre )
            return 1;
          return 0;
        })
    });
  }
  ngOnDestroy():void{
    this.sucriptionProductos.unsubscribe();
  }
  async mostrarModal(producto:promociones){
    const modal = await this.modalCtrl.create({
      component: PromocionPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'producto': producto
      }
    });
    return await modal.present();
  }
}
