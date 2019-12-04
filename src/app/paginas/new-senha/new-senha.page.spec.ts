import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewSenhaPage } from './new-senha.page';

describe('NewSenhaPage', () => {
  let component: NewSenhaPage;
  let fixture: ComponentFixture<NewSenhaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSenhaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewSenhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
