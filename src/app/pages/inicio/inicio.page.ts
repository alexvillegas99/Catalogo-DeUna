import { Component, OnInit } from '@angular/core';
import { CrudProductosService } from '../../services/crud-productos.service';
import { producto } from '../../interfaces/producto';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor( private crudService:CrudProductosService) { }
  textoBuscar='';
  productos:producto[]=[];
  ngOnInit() {
    this.crudService.getProductos().subscribe(res=>{
      this.productos = res;
    }) ;
  }
  buscar(event){
  }

}
