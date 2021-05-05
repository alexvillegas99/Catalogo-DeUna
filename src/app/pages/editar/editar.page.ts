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

cantidad;
total:number;
  ngOnInit() {
    this.total = Number((this.producto.cantidad* this.producto.precio).toFixed(2));
    this.cantidad=this.producto.cantidad;
  }
  async calcular(signo) {
    let valor = eval(this.cantidad + signo + 1)
    if (valor === 0) {
      this.cantidad = 1;
    } else {
      this.cantidad = valor;
    }
    this.total = Number((this.cantidad * this.producto.precio).toFixed(2));
  }
  salir() {
    this.modalCtrl.dismiss();
  }
  continuarCompra(producto) {
    this.producto.cantidad=this.cantidad;
   this.producto.total=this.total;
    this.modalCtrl.dismiss();
  }

}
