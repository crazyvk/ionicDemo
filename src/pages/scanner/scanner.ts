
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'scanner.html'
})

export class Scanner {

qrData = '34254635';
createdCode = null;
scannedCode = null;

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner) {
    //this.barcodeScanner = barcodeScanner;
    this.createdCode = this.qrData;
  }

  createCode() {
    this.createdCode = this.qrData;
  }

  click() {
    this.barcodeScanner.scan()
      .then((result) => {
        alert(
          "We got a barcode\n" +
          "Result: " + result.text + "\n" +
          "Format: " + result.format + "\n" +
          "Cancelled: " + result.cancelled
        )
      })
      .catch((error) => {
        //alert(error);
      })
  }

}
