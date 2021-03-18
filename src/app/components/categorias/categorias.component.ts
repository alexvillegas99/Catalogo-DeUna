import { Component, OnInit, Input } from '@angular/core';
import { producto } from 'src/app/interfaces/producto';
import { categoria } from '../../interfaces/categoria';
import { ModalController } from '@ionic/angular';
import { ModalProductoPage } from '../../pages/modal-producto/modal-producto.page';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent implements OnInit {

@Input() Productos:producto[]=[];
@Input() Categorias:categoria[]=[];
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }
}
