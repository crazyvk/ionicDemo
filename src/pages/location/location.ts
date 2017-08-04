import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


declare var google;

@Component({
  selector: 'home-page',
  templateUrl: 'location.html'
})

export class Location {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation) {

  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){
    let mapOptions = {
      center:  new google.maps.LatLng(23.5674025,36.8531655),
      zoom: 2,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.geolocation.getCurrentPosition().then(
           (resp)=>{
              
              this.addMarker(new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude));
               console.log(resp)
           },
           (error)=>{
               console.info(error)
           }
       );
  }



  addMarker(latLng){

  console.log('sadadsad' + latLng );

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

}
