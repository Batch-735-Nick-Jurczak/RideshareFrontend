import 'zone.js/dist/zone-testing';
// import 'zone.js';
// import 'zone.js/dist/async-test.js';
// import 'zone.js/dist/proxy.js';
// import 'zone.js/dist/sync-test';
// import 'zone.js/dist/jasmine-patch';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
// import { LoginComponent } from '../login/login.component';
// import { SignupModalComponent } from '../sign-up-modal/sign-up-modal.component';
//import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { ModalModule } from 'node_modules/ngx-bootstrap';
// import { HttpClientModule } from '@angular/common/http';
// import { AppRoutingModule } from '../../app-routing.module';
// import { DriverInfoComponent } from '../driver-info/driver-info.component';
// import { DriverComponent } from '../driver/driver.component';
import { AppModule } from '../../app.module';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ]
      //declarations: [ HomePageComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
