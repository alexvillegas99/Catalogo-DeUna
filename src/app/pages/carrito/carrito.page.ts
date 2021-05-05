import { Component, OnInit , OnDestroy} from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { producto } from '../../interfaces/producto';
import { DataLocalService } from '../../services/data-local.service';
import { EditarPage } from '../editar/editar.page';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit,OnDestroy {
setInterval:any;
  productos: producto[] = [];
  finalizar=false;
  constructor(private modalCtrl: ModalController,
    private dataLocal: DataLocalService,
    private navCtrl: NavController) { }
  total = 0;
  ngOnInit() {
    this.cargarProductos();
  this.setInterval =  setInterval(() => {
  this.calculaTotal();
}, 1000);

  }
  async calculaTotal() {
    let total=0;
    this.productos.forEach(producto => {
      total += Number(producto.total.toFixed(2));
    })
    this.total=Number((total+2).toFixed(2));
  }
ngOnDestroy():void{
clearInterval(this.setInterval);
  }
  async cargarProductos() {
    let total = 0;
    this.productos = await this.dataLocal.getProductos();
    this.productos.forEach(producto => {
      total += producto.total;
    })
    this.total=total;
    if(this.productos.length===0){
      this.finalizar=false;
    }else{
      this.finalizar=true;
    }
  }


  async editar(producto: producto) {
    const modal = await this.modalCtrl.create({
      component: EditarPage,
      componentProps: {
        'producto': producto
      }
    });
    return await modal.present();
  }
  async eliminar(producto: producto) {
    await this.dataLocal.delete(producto);
    this.cargarProductos();
  }

}
