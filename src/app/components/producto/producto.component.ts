import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { producto } from '../../interfaces/producto';
import { ModalProductoPage } from '../../pages/modal-producto/modal-producto.page';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent implements OnInit {

  @Input() producto:producto;
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}
  async mostrarModal(producto:producto) {
    const modal = await this.modalCtrl.create({
      component: ModalProductoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'producto': producto
      }
    });
    return await modal.present();
  }
}
