import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { producto } from '../../interfaces/producto';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  @Input() producto: producto;
  constructor(private modalCtrl: ModalController,
    private dataLocal: DataLocalService) { }


  ngOnInit() {
    this.producto.total = this.producto.cantidad* this.producto.precio;
  }
  async calcular(signo) {
    let valor = eval(this.producto.cantidad + signo + 1)
    if (valor === 0) {
      this.producto.cantidad = 1;
    } else {
      this.producto.cantidad = valor;
    }
    this.producto.total = this.producto.cantidad * this.producto.precio;
  }
  salir() {
    this.modalCtrl.dismiss();
  }
  continuarCompra(producto) {
    this.dataLocal.guardarProducto(producto);
    this.modalCtrl.dismiss();
  }

}
