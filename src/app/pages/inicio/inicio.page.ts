import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudProductosService } from '../../services/crud-productos.service';
import { producto } from '../../interfaces/producto';
import { CarritoPage } from '../carrito/carrito.page';
import { IonSegment, ModalController, NavController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';
import { categoria } from '../../interfaces/categoria';
import { CrudCategoriasService } from '../../services/crud-categorias.service';
import { element } from 'protractor';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  @ViewChild(IonSegment) segment:IonSegment;
tipos=['Categorias','Todo'];
cambiar=true;
Categorias:categoria[]=[];
  constructor( private crudService:CrudProductosService,
                private modalCtrl:ModalController,
                private navCtrl:NavController,
                private dataLocal:DataLocalService,
                private CategoriasService:CrudCategoriasService) { }
  textoBuscar='';
  productos:producto[]=[];
  ngOnInit() {
    this.dataLocal.setear();
    this.crudService.getProductos().subscribe(res=>{
      this.productos = res;
    }) ;
    this.cargarCategorias();
   
   
  }
  async cargarCategorias(){
    await this.CategoriasService.getCategorias().subscribe(res=>{
      this.Categorias = res;
    }) ;
    this.llenarCategorias();
  }
  async llenarCategorias(){

  }
  
  buscar(event){
   console.log(this.Categorias);
   console.log(this.productos);
  }
  async carrito(){
  /*  const modal = await this.modalCtrl.create({
      component: CarritoPage
    });
    
    return await modal.present();
    */
   this.navCtrl.navigateForward('/carrito');
  }
  CambioTipo(event){
      if(event.detail.value=='Categorias'){
        this.cambiar=true;
      }else{
        this.cambiar=false;
      }
  }

}
