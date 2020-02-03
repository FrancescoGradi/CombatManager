import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DoubleCheckBuffDialogComponent } from './double-check-buff-dialog.component';

describe('DoubleCheckBuffDialogComponent', () => {
  let component: DoubleCheckBuffDialogComponent;
  let fixture: ComponentFixture<DoubleCheckBuffDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoubleCheckBuffDialogComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DoubleCheckBuffDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
