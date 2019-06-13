import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExemplarActionsPopoverComponent} from './exemplar-actions-popover.component';
import {IonicModule} from '@ionic/angular';


describe('ExemplarActionsPopoverComponent', () => {
  let component: ExemplarActionsPopoverComponent;
  let fixture: ComponentFixture<ExemplarActionsPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot()
      ],
      declarations: [ExemplarActionsPopoverComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExemplarActionsPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
