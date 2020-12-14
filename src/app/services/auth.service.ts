import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // public user: User;
  constructor(public afAuth: AngularFireAuth) {}

  async onLogin(email: string, password: string) {
    try {
      return await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (err) { console.log(err); }
  }

  async onLogout() {
    try {
      await this.afAuth.signOut();
    } catch (err) { console.log(err); }
  }

  async onRegister(email: string, password: string) {
    try {
      return await this.afAuth.createUserWithEmailAndPassword(email, password);
    } catch (err) { console.log(err); }
  }

  getCurrentUser() {
    try {
      return this.afAuth.authState.pipe(first()).toPromise();
    } catch (err) { console.log(err); }
  }
}
