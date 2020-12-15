import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // public user: User;
  constructor(public afAuth: AngularFireAuth) {}

  async onLogin(email: string, password: string): Promise<any> {
    try {
      return await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (err) { return(err); }
  }

  async onLogout(): Promise<any> {
    try {
      console.log('Log out done');
      await this.afAuth.signOut();
    } catch (err) { return(err); }
  }

  async onRegister(email: string, password: string): Promise<any> {
    try {
      console.log('Llamado a registro de firebase...');
      return await this.afAuth.createUserWithEmailAndPassword(email, password);
    } catch (err) { return(err); }
  }

  getCurrentUser(): Promise<any> {
    try {
      return this.afAuth.authState.pipe(first()).toPromise();
    } catch (err) { return(err); }
  }
}
