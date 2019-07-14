import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabsPage} from './tabs.page';
import {Push} from '@ionic-native/push/ngx';
import {IonicModule} from '@ionic/angular';
import {StoreModule} from '@ngrx/store';
import {CommonModule} from '../common/common.module';

describe('TabsPage', () => {
  let component: TabsPage;
  let fixture: ComponentFixture<TabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule, CommonModule, StoreModule.forRoot({})],
      declarations: [TabsPage],
      providers: [Push],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
