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

  public async changePassword(newPassword: string) {
    try {
      let dataUser = await this.findIndexUser(this.auth.userLogged);
      dataUser.list.users[dataUser.idx].password = newPassword;
      await this.storage.set(this.KEY_USER, dataUser.list);
      this.auth.userLogged = dataUser.list.users[dataUser.idx];
    } catch (error) {
      console.error(error);
    }
  }

  public async deleteAccount() {
    try {
      let data = await this.findIndexUser(this.auth.userLogged);
      data.list.users.splice(data.idx, 1);
      await this.storage.set(this.KEY_USER, data.list);
      this.logout();
    } catch (error){
      console.error(error)
    }
  }

  public async login(passport: {email: string, password: string}) {
    try {
      let data = await this.findIndexUser(passport);
      if (data.idx >= 0) {
        this.auth = { userLogged: data.list.users[data.idx] };
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

  private async findIndexUser({email, password}): Promise<{list: ListUser, idx: number}> {
    try {
      let listUsers: ListUser = await this.storage.get(this.KEY_USER);
      if(!listUsers) {
        listUsers = {users: []};
      }
      let idx = listUsers.users.findIndex(user => user.password === password && user.email === email);
      return { list: listUsers, idx };
    } catch (error) {
      return error;
    }

  }

}
