import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductosCategoria2PageRoutingModule } from './productos-categoria2-routing.module';

import { ProductosCategoria2Page } from './productos-categoria2.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductosCategoria2PageRoutingModule,
    ComponentsModule
  ],
  declarations: [ProductosCategoria2Page]
})
export class ProductosCategoria2PageModule {}
