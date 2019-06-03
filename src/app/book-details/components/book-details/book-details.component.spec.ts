import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BookDetailsComponent} from './book-details.component';
import {IonicModule} from '@ionic/angular';
import {CollapsiblePanelComponent} from '../../collapsible-panel/collapsible-panel.component';
import {Book} from '../../../common/book.model';

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      declarations: [BookDetailsComponent, CollapsiblePanelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    component.book = {} as Book;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
