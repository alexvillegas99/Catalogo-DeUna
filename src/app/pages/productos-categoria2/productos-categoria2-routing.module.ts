import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductosCategoria2Page } from './productos-categoria2.page';

const routes: Routes = [
  {
    path: '',
    component: ProductosCategoria2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosCategoria2PageRoutingModule {}
