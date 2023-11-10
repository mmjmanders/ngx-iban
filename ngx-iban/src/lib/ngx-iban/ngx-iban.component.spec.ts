import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxIbanComponent } from './ngx-iban.component';

describe('NgxIbanComponent', () => {
  let component: NgxIbanComponent;
  let fixture: ComponentFixture<NgxIbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxIbanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxIbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
