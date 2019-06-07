import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Galeria } from '../../model/galeriaModel';
import { GaleriaProvidresProvider } from '../../providers/galeria-providres/galeria-providres';

@IonicPage({})
@Component({
  selector: 'page-cadastro-galeria',
  templateUrl: 'cadastro-galeria.html',
})
export class CadastroGaleriaPage {

  formGroup: FormGroup;
  items: Galeria[];

  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    private servidor: GaleriaProvidresProvider,
    public alertCtrl: AlertController
  ) {

    this.formGroup = this.formBuilder.group({
      nome: [null, [Validators.required]],
      img:  [null, [Validators.required]]
    })
  }


  adicionar() {
    this.servidor.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
        error => { });

  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('GaleriaPage')
          }
        }
      ]
    });
    alert.present();
  }
}
