import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisualizarRelatoPage } from './visualizar-relato.page';

describe('VisualizarRelatoPage', () => {
  let component: VisualizarRelatoPage;
  let fixture: ComponentFixture<VisualizarRelatoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarRelatoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisualizarRelatoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
