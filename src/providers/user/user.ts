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

  constructor(private storage: Storage) {
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
    } catch (error) {
      console.error(error);
    }
  }

}
