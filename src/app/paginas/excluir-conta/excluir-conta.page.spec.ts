import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExcluirContaPage } from './excluir-conta.page';

describe('ExcluirContaPage', () => {
  let component: ExcluirContaPage;
  let fixture: ComponentFixture<ExcluirContaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcluirContaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExcluirContaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
