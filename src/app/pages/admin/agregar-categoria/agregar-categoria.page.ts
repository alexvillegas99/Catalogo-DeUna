import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { CrudCategoriasService } from '../../../services/crud-categorias.service';
import { categoria } from '../../../interfaces/categoria';

@Component({
  selector: 'app-agregar-categoria',
  templateUrl: './agregar-categoria.page.html',
  styleUrls: ['./agregar-categoria.page.scss'],
})
export class AgregarCategoriaPage implements OnInit {
Categoria?:categoria={
  nombre:'',
  imagen:''
}

  constructor(private categoriaService:CrudCategoriasService,
    private alertCtrl:AlertController,
    private navCtrl:NavController) { }
  ngOnInit() {
  }
  async agregar(){
if(this.Categoria.nombre!=='' && this.Categoria.imagen!=='' ){
this.categoriaService.inserCategoria(this.Categoria);
this.navCtrl.navigateForward('/admin/administracion')
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
}
