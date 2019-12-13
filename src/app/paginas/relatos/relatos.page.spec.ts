import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RelatosPage } from './relatos.page';

describe('RelatosPage', () => {
  let component: RelatosPage;
  let fixture: ComponentFixture<RelatosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RelatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
