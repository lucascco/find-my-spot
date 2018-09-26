import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User, ListUser } from '../../models/user';
import { Auth } from '../../models/auth';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserProvider {

  public actionsAuth: Subject<Auth> = new Subject<Auth>();
  public auth: Auth;

  private KEY_USER = 'FIND_MY_SPOT_USER';
  private KEY_USER_AUTH = 'FIND_MY_SPOT_USER_AUTH';

  constructor(private storage: Storage) {
  }

  public async checkLogged() {
    this.auth = await this.storage.get(this.KEY_USER_AUTH);
    if(!this.auth) {
      this.auth = {userLogged: undefined};
    }
    this.actionsAuth.next(this.auth);
  }

  public async signup(user: User) {
    try {
      let listUsers: ListUser = await this.storage.get(this.KEY_USER);
      if(!listUsers) {
        listUsers = { users: [user] }
      } else {
        listUsers.users.push(user);
      }
      await this.storage.set(this.KEY_USER, listUsers);
      return this.setAuth({userLogged: user});
    } catch (error){
      console.error(error)
    }
  }

  public async login(passport: {email: string, password: string}) {
    try {
      let listUsers: ListUser = await this.storage.get(this.KEY_USER);
      if(!listUsers) {
        listUsers = {users: []};
      }
      let userFind = listUsers.users.find((user) => user.password === passport.password && user.email === passport.email);
      if (userFind) {
        this.auth = { userLogged: userFind };
        this.actionsAuth.next(this.auth);
        this.setAuth(this.auth);
      } else {
        throw new Error('Usuário não encontrado.');
      }
    } catch (error) {
      throw error;
    }
  }

  public async logout() {
    try {
      this.auth = { userLogged: undefined };
      this.actionsAuth.next(this.auth);
      this.setAuth(null);
    } catch (error) {
      console.error(error);
    }
  }

  public async setAuth(userAuth: Auth) {
    if(userAuth) {
      return await this.storage.set(this.KEY_USER_AUTH, userAuth);
    } else {
      return await this.storage.set(this.KEY_USER_AUTH, { userLogged: undefined });
    }
  }

}
