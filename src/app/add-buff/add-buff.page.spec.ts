import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddBuffPage } from './add-buff.page';

describe('AddBuffPage', () => {
  let component: AddBuffPage;
  let fixture: ComponentFixture<AddBuffPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBuffPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddBuffPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
