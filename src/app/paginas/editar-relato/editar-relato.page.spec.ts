import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditarRelatoPage } from './editar-relato.page';

describe('EditarRelatoPage', () => {
  let component: EditarRelatoPage;
  let fixture: ComponentFixture<EditarRelatoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarRelatoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarRelatoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
