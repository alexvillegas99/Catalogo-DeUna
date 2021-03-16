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
}
