import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewEmailPage } from './new-email.page';

describe('NewEmailPage', () => {
  let component: NewEmailPage;
  let fixture: ComponentFixture<NewEmailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEmailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
