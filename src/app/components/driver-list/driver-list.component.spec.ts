import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverListComponent } from './driver-list.component';
import { mockDrivers, mockDriversSorted } from '../../models/driver-mocked';
import { Driver } from '../../models/driver';

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
describe('Test Sorting Algorithms', () => {
    let dlc:  DriverListComponent;
    let driversExpected: Driver[];
    let driversActual: Driver[];
    let fixture: ComponentFixture<DriverListComponent>;

  /**
   * Mock the object to be sorted.
  */
  beforeAll(() => {

  });



  beforeEach(() => {
    this.driversExpected = [...mockDriversSorted];
    dlc.drivers = [...mockDrivers];
    fixture = TestBed.createComponent(DriverListComponent);
    dlc = fixture.componentInstance;
    fixture.detectChanges();

  });
  



  it('Sort By Name', () => {
    //this.DriverListComponent.sortByName();
    //this.dlc.sortByName();
    spyOn(dlc, 'sortByName');

    // Test
    expect(dlc.drivers).toEqual(this.driversExpected);
    //});
  });
});
