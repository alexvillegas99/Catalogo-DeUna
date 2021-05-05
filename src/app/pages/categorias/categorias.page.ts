import { Component, OnInit, OnDestroy } from '@angular/core';
import { categoria } from '../../interfaces/categoria';
import { Subscription } from 'rxjs';
import { CrudCategoriasService } from '../../services/crud-categorias.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit,OnDestroy {
Categorias:categoria[]= [];
  constructor(private CategoriasService:CrudCategoriasService,
              private navCtrl:NavController) { }
  sucriptionCategorias: Subscription = new Subscription();
  ngOnInit() {
    this.sucriptionCategorias=   this.CategoriasService.getCategorias().subscribe(res => {
      this.Categorias = res;
    });

  }
  ngOnDestroy(){
this.sucriptionCategorias.unsubscribe();
  }
  async MostrarModal(categoria: categoria) {
    this.navCtrl.navigateForward(`/productos-categoria2/${categoria.nombre}`);
  }

}
