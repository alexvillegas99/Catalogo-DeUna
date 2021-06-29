import { Component, OnInit, Input } from '@angular/core';
import { promociones } from '../../interfaces/promociones';
import { PromocionPage } from '../../pages/promociones/promocion/promocion.page';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.scss'],
})
export class PromocionesComponent implements OnInit {
@Input() productos:promociones[]=[];
  constructor(private modalCtrl:ModalController,
              private navController:NavController) { }

  ngOnInit() {
    
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
  navegar(): void {
    this.navController.navigateForward(['/promociones']);
  }
}
