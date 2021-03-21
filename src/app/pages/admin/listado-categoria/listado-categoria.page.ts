import { Component, OnInit } from '@angular/core';
import { producto } from '../../../interfaces/producto';
import { ModalController } from '@ionic/angular';
import { CrudProductosService } from '../../../services/crud-productos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listado-categoria',
  templateUrl: './listado-categoria.page.html',
  styleUrls: ['./listado-categoria.page.scss'],
})
export class ListadoCategoriaPage implements OnInit {

  Productos:producto[]=[];
  categoria?:string;
  constructor(private modalCtrl:ModalController,
    private crudService:CrudProductosService,
    private ruta: ActivatedRoute) { }
  onClick(){
this.modalCtrl.dismiss();
  }
  ngOnInit() {
    this.categoria=this.ruta.snapshot.params.categoria;
    this.crudService.getProductos().subscribe(res=>{
      this.Productos = res;
    }) ;
    this.Productos.filter(elemento=>{
      elemento.categoria===this.categoria
    })
  }

}
