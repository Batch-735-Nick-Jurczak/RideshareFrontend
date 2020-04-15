import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverListComponent } from './driver-list.component';
import { AppModule } from '../../app.module';
import { Driver } from '../../models/driver';
import { mockDrivers, mockDriversAscending, mockDriversDescending } from '../../models/driver-mocked';

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

/**
 * SortByName()
 */
describe('Sort By Name', () => {
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
    fixture = TestBed.createComponent(DriverListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.drivers = [...mockDrivers];
  });


  it('Ascending', () => {
    driversExpected = [...mockDriversAscending];
    component.sortOrder = 'low';
    component.orderedBy = 'name';
    component.sortByName();
    //spyOn(component, 'sortByName');
    expect(component.drivers).toEqual(driversExpected);
    });

  it('Descending', () => {
    driversExpected = [...mockDriversDescending];
    component.sortOrder = 'high';
    component.orderedBy = 'name';
    component.sortByName();
    expect(component.drivers).toEqual(driversExpected);
    });
});

/**
 * SortByTime()
 */
describe('Sort By Time', () => {
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
    fixture = TestBed.createComponent(DriverListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.drivers = [...mockDrivers];
  });

  it('Ascending', () => {
    driversExpected = [...mockDriversAscending];
    component.sortOrder = 'low';
    component.orderedBy = 'time';
    component.sortByName();
    expect(component.drivers).toEqual(driversExpected);
    });

  it('Descending', () => {
    driversExpected = [...mockDriversDescending];
    component.sortOrder = 'high';
    component.orderedBy = 'time';
    component.sortByName();
    expect(component.drivers).toEqual(driversExpected);
    });
});

/**
 * SortByDistance()
 */
describe('Sort By Distance', () => {
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
    fixture = TestBed.createComponent(DriverListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.drivers = [...mockDrivers];
  });

  it('Ascending', () => {
    driversExpected = [...mockDriversAscending];
    component.sortOrder = 'low';
    component.orderedBy = 'distance';
    component.sortByName();
    expect(component.drivers).toEqual(driversExpected);
    });

  it('Descending', () => {
    driversExpected = [...mockDriversDescending];
    component.sortOrder = 'high';
    component.orderedBy = 'distance';
    component.sortByName();
    expect(component.drivers).toEqual(driversExpected);
    });
});