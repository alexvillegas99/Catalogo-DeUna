import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CrudProductosService } from '../../services/crud-productos.service';
import { producto } from 'src/app/interfaces/producto';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-productos-categoria2',
  templateUrl: './productos-categoria2.page.html',
  styleUrls: ['./productos-categoria2.page.scss'],
})
export class ProductosCategoria2Page implements OnInit,OnDestroy {

 
  Productos: producto[] = [];
  categoria?: string;
  sucriptionProductos: Subscription = new Subscription();
  constructor(private modalCtrl: ModalController,
    private crudService: CrudProductosService,
    private ruta: ActivatedRoute) { }
  onClick() {
    this.modalCtrl.dismiss();
  }
  id='';
  ngOnInit() {
    this.categoria = this.ruta.snapshot.params.categoria;
    
    this.id = this.ruta.snapshot.params.id;
   
    this.sucriptionProductos = this.crudService.getProductos().subscribe(res => {
      this.Productos = res;
      this.Productos = this.Productos.filter(prod =>
        prod.estado === true,
      )
      this.Productos.sort(function (a, b){
        if ( a.nombre < b.nombre )
        return -1;
        if ( a.nombre > b.nombre )
          return 1;
        return 0;
      })
    });
    this.Productos.filter(elemento => {
      elemento.categoria === this.categoria
    })
  }
  ngOnDestroy(): void {
    this.sucriptionProductos.unsubscribe();
  }
  async llenar() {

  }

}
