import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RedemailPage } from './redemail.page';

describe('RedemailPage', () => {
  let component: RedemailPage;
  let fixture: ComponentFixture<RedemailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedemailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RedemailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
