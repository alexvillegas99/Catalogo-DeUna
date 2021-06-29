import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { producto } from '../../interfaces/producto';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.page.html',
  styleUrls: ['./modal-producto.page.scss'],
})
export class ModalProductoPage implements OnInit {

  @Input() producto: producto;

  total=0;
  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController,
    private dataLocal: DataLocalService,
    private toas:ToastrService) { }
 
  ngOnInit() {
    this.producto.cantidad=1;
    this.producto.total = (this.producto.cantidad) * this.producto.precio;
  }
  calcular(signo) {
    let total:number;
    let valor = eval( this.producto.cantidad+ signo + 1)
     if (valor <= 1) {
      this.producto.cantidad = 1;
    } else {
      this.producto.cantidad = valor;
    }
    total  =  this.producto.cantidad * this.producto.precio;
    this.producto.total=Number(total.toFixed(2));
  }
  salir() {
    this.modalCtrl.dismiss();
  }
  async continuarCompra(producto:producto){
    this.dataLocal.guardarProducto(producto);
this.toas.success(`${producto.nombre} añadido correctamente al carrito.`,'Añadido');
    this.modalCtrl.dismiss(); 
    
  }

}
