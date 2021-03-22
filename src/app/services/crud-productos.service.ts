import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { producto } from '../interfaces/producto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudProductosService {

  
  private  ProductosCollection:AngularFirestoreCollection<producto>;
  private Productos:Observable<producto[]>;
  constructor(private db:AngularFirestore) {

    this.ProductosCollection=db.collection<producto>('Productos');
    this.Productos = this.ProductosCollection.snapshotChanges().pipe(map(
      actions=>{
        return actions.map(a=>{
          const data=a.payload.doc.data();
          const id=a.payload.doc.id;
          return {id,...data};
        }) 
      }
    ))

   }
  getProductos(){
return this.Productos;
  }
  inserProducto(producto: producto) {
    return this.ProductosCollection.add(producto);

  }
  deleteProducto(id: string){
    return this.ProductosCollection.doc(id).delete();
  }
  updateProducto(producto:producto, id: string){
    return this.ProductosCollection.doc(id).update(producto);
  }
  getProducto(id: string){
    return this.ProductosCollection.doc<producto>(id).valueChanges();
  }
}
