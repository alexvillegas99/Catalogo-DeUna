import { Component, Input, OnInit } from '@angular/core';
import { producto } from '../../interfaces/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {

  @Input() productos: producto[]=[];
  constructor() { }

  ngOnInit() {}


}
