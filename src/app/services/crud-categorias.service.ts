import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { categoria } from '../interfaces/categoria';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CrudCategoriasService {

  private  CategoriaCollection:AngularFirestoreCollection<categoria>;
  private categoria:Observable<categoria[]>;
  constructor(private db:AngularFirestore) {

    this.CategoriaCollection=db.collection<categoria>('categorias');
    this.categoria = this.CategoriaCollection.snapshotChanges().pipe(map(
      actions=>{
        return actions.map(a=>{
          const data=a.payload.doc.data();
          const id=a.payload.doc.id;
          return {id,...data};
        }) 
      }
    ))

   }
  getCategorias(){
return this.categoria;
  }
}
