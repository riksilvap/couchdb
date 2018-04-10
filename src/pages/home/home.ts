
import { UsuarioProvider  } from './../../providers/usuario/usuario';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Usuario  } from './../../model/Usuario';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Geolocation, Camera]
})
export class HomePage {

  public usuarios: any;
  public usuario = new Usuario();
    // = {nome:"",idade:""};

  constructor(public navCtrl: NavController,
              public usuarioService: UsuarioProvider,
              private geolocation: Geolocation,
              private camera: Camera) {

  }

  ionViewDidLoad() {

    this.usuarioService.getUsuarios().then((data) => {
      this.usuarios = data;
    });

  }
  public editar(usuario){
    this.usuario = usuario;
  }

  public deletar(usuario){
    this.usuarioService.removeUsuario(usuario);
  }
  public salvarUsuario() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.usuario.latitude = resp.coords.latitude;
      this.usuario.longitude = resp.coords.longitude;
      this.usuarioService.createUsuario(this.usuario);
      this.usuario = new Usuario();
    }).catch((error) => {
      console.log('Error getting location', error);
      this.usuario.latitude = 0;
      this.usuario.longitude = 0;
      this.usuarioService.createUsuario(this.usuario);
      this.usuario = new Usuario();
    });
      // this.usuarioService.createUsuario(this.usuario);
      // this.usuario = {nome:"",idade:""};
  }

  public getFoto(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.usuario.foto = base64Image;
     console.log(base64Image)
    }, (err) => {
       // Handle error
       console.log("Erro getFoto")
    });
  }
  public searchUsuario(){
    this.usuarioService.searchUsuario(event).then(resultado => this.usuario = resultado.docs)
  }

}
