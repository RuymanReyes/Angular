import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyDB2x-Bhb6a7L-GGb_pPHU1yZnhG4-mzuw';
  userToken: string  = null;

// CREAR NUEVO USUARIO
 // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY];

  // LOGIN
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY];



  constructor( private http: HttpClient) {
    this.leerToken();
  }

  logout() {
    localStorage.removeItem('token');
  }

  login( usuario: UsuarioModel ) {

    const authData = {
      ... usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }signInWithPassword?key=${ this.apiKey}`,
      authData
    ).pipe(
      map( resp => {
          this.guardarToken( resp['idToken'] );
          return resp;
      })
    );
  }

  nuevoUsuario( usuario: UsuarioModel ) {
    const authData = {
      ... usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }signUp?key=${ this.apiKey}`,
      authData
    ).pipe(
      map( resp => {
          console.log('entró en el mapa del RXJS');
          this.guardarToken( resp['idToken'] );
          return resp;
      })
    );
  }


  private guardarToken( idtoken: string ) {

    this.userToken = idtoken;
    localStorage.setItem( 'token', idtoken );

    // Expirar token
    let hoy = new Date();
    hoy.setSeconds( 3600 );
    localStorage.setItem('expira', hoy.getTime().toString() );
  }

  private leerToken() {
    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
  }

  authActive(): boolean {

    if ( this.userToken.length < 2 ) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime( expira );

    if ( expiraDate > new Date() ) {
      return true;
    } else {
      return false;
    }
  }
}
