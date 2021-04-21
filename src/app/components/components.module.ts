import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos/productos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { PipesModule } from '../pipes/pipes.module';
import { CategoriaComponent } from './categoria/categoria.component';
import { PromocionesComponent } from './promociones/promociones.component';



@NgModule({
  declarations: [ProductosComponent,CategoriasComponent,CategoriaComponent,PromocionesComponent],
  exports: [ProductosComponent,CategoriasComponent,CategoriaComponent,PromocionesComponent],
  imports: [
    CommonModule,PipesModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
