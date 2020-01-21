import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditBuffPage } from './edit-buff.page';

describe('EditBuffPage', () => {
  let component: EditBuffPage;
  let fixture: ComponentFixture<EditBuffPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBuffPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditBuffPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
