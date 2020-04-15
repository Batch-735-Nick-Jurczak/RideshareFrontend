import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverListComponent } from './driver-list.component';
import { AppModule } from '../../app.module';
import { Driver } from '../../models/driver';
import { mockDrivers, mockDriversSorted } from '../../models/driver-mocked';

/**
 * Test the efficacy of sorting algorithms in driver-list.component.ts
 * List of algorithms that are tested:
 * sort(orderedBy: string): void; uses:
 *    changeSortOrder();
 *    sortByName(): void;
 *    sortByDistance(): void;
 *    sortByTime(): void; uses:
 *      getMinutes(duration: string): number;
 *    sortOrderIsLow(orderedBy: string): boolean;
 * sleep(ms): Promise; //used by many functions
 * getGoogleApi(): void;  Unable to test because async()'s dependency called Zone cannot be detected by Protractor
 * addToModal(driver: Driver);
 * getDistanceAndDuration(origin, drivers): Driver[];
 * 
 * 
 * 
*/

describe('DriverListComponent', () => {
  let component: DriverListComponent;
  let fixture: ComponentFixture<DriverListComponent>;
  let driversExpected: Driver[] = [];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    driversExpected = [...mockDriversSorted];
    fixture = TestBed.createComponent(DriverListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.drivers = [...mockDrivers];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('Sort By Name', () => {
    component.sortOrder = 'low';
    component.orderedBy = 'name';
    component.sortByName();
    //spyOn(this.dlc, 'sortByName');
    expect(component.drivers).toEqual(driversExpected);
    });
});
