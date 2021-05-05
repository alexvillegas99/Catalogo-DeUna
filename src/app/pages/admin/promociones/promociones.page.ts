import { Component, OnInit, OnDestroy } from '@angular/core';
import { promociones } from '../../../interfaces/promociones';
import { AlertController, NavController } from '@ionic/angular';
import { CrudPromocionesService } from 'src/app/services/crud-promociones.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.page.html',
  styleUrls: ['./promociones.page.scss'],
})
export class PromocionesPage implements OnInit,OnDestroy {
  suscriptionPromociones: Subscription = new Subscription(); 
  constructor(private alertCtrl:AlertController,
              private ProductosServices:CrudPromocionesService,
              private navCtrl:NavController) { }

  ngOnInit() {
   this.suscriptionPromociones=  this.ProductosServices.getProductos().subscribe(res => {
      this.promociones = res;
      
    });
  }
  ngOnDestroy(){
    this.suscriptionPromociones.unsubscribe();
  }
  promociones:promociones[]=[];
  
  async eliminarProducto(id:string){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Advertencia',
      message: '<strong>Desea eliminar esta promoción ?</strong>',
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
async actualizarStock(producto:promociones){
  producto.estado=!producto.estado;
  this.ProductosServices.updateProducto(producto,producto.id);
}
 async editarProducto(id:string){
    this.navCtrl.navigateForward(`admin/promociones/editar-promocion/${id}`);
  }
}
