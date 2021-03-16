import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoComponent } from './producto/producto.component';
import { ProductosComponent } from './productos/productos.component';



@NgModule({
  declarations: [ProductoComponent,ProductosComponent],
  exports: [ProductoComponent,ProductosComponent],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
