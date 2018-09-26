import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListPlaces } from '../../models/place';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public listPlaces: ListPlaces;
  public openedToggle: boolean;

  constructor(public navCtrl: NavController) {

  }

  public toggleSearch() {
    this.openedToggle = !this.openedToggle;
  }

  public searchPlaces(ev: any) {
    this.loadPlaces();
    const val = ev.target.value;
    if(val && val.trim() != '') {
      this.listPlaces.places
        = this.listPlaces.places.filter(place => place.name.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) > -1);
    }
  }

  private loadPlaces() {
    this.listPlaces = {
      places: [
        { name: 'Morumbi Shopping', amountSpot: 40, picture: 'assets/imgs/places/morumbi.png', lat: '4564', lng: '45645' },
        { name: 'Shopping Pátio Paulista', amountSpot: 30, picture: 'assets/imgs/places/paulista.jpg', lat: '4564', lng: '45645' }
      ]
    }
  }

  ionViewDidLoad() {
    this.loadPlaces();
  }

}
