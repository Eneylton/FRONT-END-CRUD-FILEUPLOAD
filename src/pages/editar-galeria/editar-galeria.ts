import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GaleriaProvidresProvider } from '../../providers/galeria-providres/galeria-providres';



@IonicPage({})
@Component({
  selector: 'page-editar-galeria',
  templateUrl: 'editar-galeria.html',
})
export class EditarGaleriaPage {
  
  formGroup: FormGroup;

  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private servidor: GaleriaProvidresProvider
  ){
    this.formGroup = this.formBuilder.group({
      id: [null, [Validators.required, Validators.maxLength(120)]],
      nome: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
      img: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(120)]]
    })
  }

  ionViewDidLoad() {
    let items =  this.navParams.get('item');
    this.popularCampos(items);
    }

  editar() {
    let items =  this.navParams.get('item');


    console.log(items);


    this.servidor.update(this.formGroup.value,items.id)
      .subscribe(response => {
        this.showInsertOk();
      },
        error => { });

  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro Atualizado com sucesso',
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

  popularCampos(dados){
    
    this.formGroup.controls['id'].setValue(dados.id);
    this.formGroup.controls['nome'].setValue(dados.nome);
    this.formGroup.controls['img'].setValue(dados.img);
  
  }

}