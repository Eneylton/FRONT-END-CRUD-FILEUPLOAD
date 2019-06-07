import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Galeria } from '../../model/galeriaModel';
import { GaleriaProvidresProvider } from '../../providers/galeria-providres/galeria-providres';


@IonicPage({})
@Component({
  selector: 'page-galeria',
  templateUrl: 'galeria.html',
})
export class GaleriaPage {

  items: Galeria[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private service: GaleriaProvidresProvider) {
  }

  ionViewDidLoad() {
    this.service.buscarTodos().subscribe(response => {

      this.items = response;
      console.log(this.items);

    },
      error => {
        console.log(error);
      })
  }

  openCadastro() {
    this.navCtrl.push('CadastroGaleriaPage');
  }

  openEditar(item: any) {
    this.navCtrl.push('EditarGaleriaPage', { "item": item });
  }

  openExcluir(item: any){
    console.log(item.id);
    this.service.delete(item.id).subscribe(response =>{
      
      console.log(response);
      this.navCtrl.setRoot('GaleriaPage');
    });

}
}