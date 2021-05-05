import { Injectable } from '@angular/core';
import { producto } from '../interfaces/producto';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  productosDeUna:producto[]=[];
  constructor(private store:Storage) { }
async guardarProducto(producto:producto){
  this.productosDeUna = await this.productosDeUna.filter(elemento=>
    elemento.nombre !== producto.nombre
  )
  this.productosDeUna.push(producto);
  this.store.set('productosDeUna',this.productosDeUna);
}
async setear(){
  this.productosDeUna=[];
  this.store.set('productosDeUna',this.productosDeUna);

}
async getProductos(){
  const productos = await this.store.get('productosDeUna');
  this.productosDeUna=productos ||[];
  return this.productosDeUna;
}
async delete(producto:producto){
  this.productosDeUna = await this.productosDeUna.filter(elemento=>
    elemento.nombre !== producto.nombre
  )
  this.store.set('productosDeUna',this.productosDeUna);
}
}
