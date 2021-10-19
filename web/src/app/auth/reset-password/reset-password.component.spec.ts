import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ResetPasswordComponent} from './reset-password.component';
import {RouterTestingModule} from "@angular/router/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {ApiTestingModule} from "../../../api/api.testing.module";
import {AuthComponent} from "../auth.component";
import {AuthModule} from "../auth.module";

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent, AuthComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        ApiTestingModule,
        AuthModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });
});
