import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {BarcodeScanResult} from '@ionic-native/barcode-scanner';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html'
})
export class BookSearchComponent implements OnInit {

  searchString: string;

  @Output() search = new EventEmitter<string>();
  @Output() error = new EventEmitter<string>();

  constructor(private barcodeScanner: BarcodeScanner) {
  }

  ngOnInit() {
  }

  scan() {
    this.barcodeScanner.scan({showTorchButton: true})
      .then((barcodeData: BarcodeScanResult) => {
        if (barcodeData.text) {
          this.searchString = barcodeData.text;

          this.search.emit(this.searchString);
        }
      }).catch(err => this.error.emit('Barcode konnte nicht erfasst werden. Bitte versuche es nochmal.'));
  }

  onSearch(event) {
    this.searchString = event.target.value || null;
    if (this.searchString && this.searchString.length > 0) {
      this.search.emit(this.searchString);
    }
    event.stopPropagation();
  }

  onSearchButtonClicked() {
    this.search.emit(this.searchString);
  }

  onSearchStringChanged(event) {
    this.searchString = event.target.value || null;
  }

}
