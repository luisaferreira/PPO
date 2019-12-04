import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { redSenhaPage } from './redSenha.page';

describe('redSenhaPage', () => {
  let component: redSenhaPage;
  let fixture: ComponentFixture<redSenhaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ redSenhaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(redSenhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
