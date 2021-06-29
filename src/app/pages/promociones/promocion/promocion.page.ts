import { Component, OnInit, Input } from '@angular/core';
import { promociones } from '../../../interfaces/promociones';
import { ModalController } from '@ionic/angular';
import { producto } from 'src/app/interfaces/producto';
import { DataLocalService } from '../../../services/data-local.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-promocion',
  templateUrl: './promocion.page.html',
  styleUrls: ['./promocion.page.scss'],
})
export class PromocionPage implements OnInit {
  @Input() producto: promociones;
  productoGuardar:producto;
  constructor(private modalCtrl:ModalController,
    private toas:ToastrService,
    private dataLocal: DataLocalService) { }

  ngOnInit() {
      this.producto.cantidad=1;
    this.producto.total = (this.producto.cantidad) * this.producto.preciop;
  }
  calcular(signo) {
    let total:number;
    this.producto.cantidad=1;
    let valor = eval( this.producto.cantidad+ signo + 1)
     if (valor <= 0) {
      this.producto.cantidad = 0;
    } else {
      this.producto.cantidad = valor;
    }
    total  =  this.producto.cantidad * this.producto.preciop;
    this.producto.total=Number(total.toFixed(2));
  }
  salir() {
    this.modalCtrl.dismiss();
  }
  async continuarCompra(prod:promociones){
    this.productoGuardar={
      nombre:prod.nombre,
      descripcion:prod.descripcion,
      imagen:prod.imagen,
      precio:prod.preciop,
      total:prod.total,
      cantidad:prod.cantidad,
      categoria:prod.categoria,
      estado:true
    }
   
     this.dataLocal.guardarProducto(this.productoGuardar);
     this.toas.success(`${this.productoGuardar.nombre} añadido correctamente al carrito.`,'Añadido');
    this.modalCtrl.dismiss(); 
    
  }
}
