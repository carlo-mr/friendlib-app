import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BookSearchComponent} from './book-search.component';
import {IonicModule} from '@ionic/angular';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';

describe('BookSearchComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      providers: [BarcodeScanner],
      declarations: [BookSearchComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
