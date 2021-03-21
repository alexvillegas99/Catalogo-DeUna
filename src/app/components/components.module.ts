import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoComponent } from './producto/producto.component';
import { ProductosComponent } from './productos/productos.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { PipesModule } from '../pipes/pipes.module';
import { CategoriaComponent } from './categoria/categoria.component';



@NgModule({
  declarations: [ProductoComponent,ProductosComponent,EncabezadoComponent,CategoriasComponent,CategoriaComponent],
  exports: [ProductoComponent,ProductosComponent,EncabezadoComponent,CategoriasComponent,CategoriaComponent],
  imports: [
    CommonModule,PipesModule
  ]
})
export class ComponentsModule { }
