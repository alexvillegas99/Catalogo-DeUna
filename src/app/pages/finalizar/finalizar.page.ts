import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { producto } from '../../interfaces/producto';
import { DataLocalService } from '../../services/data-local.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-finalizar',
  templateUrl: './finalizar.page.html',
  styleUrls: ['./finalizar.page.scss'],
})
export class FinalizarPage implements OnInit {

  productos: producto[] = [];
  constructor( private iab: InAppBrowser,
    private dataLocal: DataLocalService,
    private alertCtrl:AlertController,
    private modalCtrl:ModalController,
    private navCtrl:NavController) { }
  numero = '593992734448';
  
  //
nombre='';
direccion='';
referencia='';
comentario='';
envio='Domicilio';
pago='Efectivo';
total=0;
strinProductos ='';
  ngOnInit() {
    this.cargarProductos();
  }
  async cargarProductos() {
    this.productos = await this.dataLocal.getProductos();
   
    let cont=1;
    this.productos.forEach(producto => {
      this.strinProductos+= '    *N'+cont+'*: '     + producto.nombre  ;
      this.strinProductos+= '   *Precio*: ' + producto.precio ;
      this.strinProductos+= '    *Cantidad*: ' + producto.cantidad  ;
      this.strinProductos+= '    *Total Artículo*: ' + producto.total;
      this.total += producto.total;
      cont++;
    })
    this.strinProductos +='    *Total Compra*: ' + this.total;
  }
async enviar(){
  if(this.nombre !== ' ' && this.envio!=='' && this.pago!=='' 
  && this.direccion!=='' && this.referencia!=='' && this.comentario !== ''){

  
 
  let texto = '*Cliente*: ' +this.nombre;
  texto += '     *Tipo de envio*: ' + this.envio;
  texto += '     *Tipo de pago*:' + this.pago;
  texto += '    *Dirección*: ' + this.direccion;
  texto += '    *Referencia Dirección*: ' + this.referencia;
  texto += '    *Comentario* ' + this.comentario;
  texto += '    *Artículos* ' ;
  texto+=this.strinProductos;
  texto += ' *Para que tu pedido llegue de inmediato, por favor envíanos tu ubicación.* '
  let url = 'https://wa.me/' + this.numero + '?text=' + texto;
  const browser = this.iab.create(url,'_system');
  this.dataLocal.setear();
  this.navCtrl.navigateForward('/inicio')
}else{
  const alert = await this.alertCtrl.create({
    cssClass: 'my-custom-class',
    header: 'Alerta',
    message: 'Llenar todos los campos',
    buttons: ['Aceptar']
  });

  await alert.present();
}
}
cancelar(){
  this.modalCtrl.dismiss();
}

}
