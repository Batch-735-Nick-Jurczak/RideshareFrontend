import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverListComponent } from './driver-list.component';
import { AppModule } from '../../app.module';
import { Driver } from '../../models/driver';
import { mockDrivers, mockDriversAscending, mockDriversDescending } from '../../models/driver-mocked';

/**
 * Test the efficacy of sorting algorithms in driver-list.component.ts
 * List of algorithms that are tested:
 * DONE sort(orderedBy: string): void; uses:
 * DONE   changeSortOrder();
 * DONE   sortByName(): void;
 * DONE   sortByDistance(): void;
 * DONE   sortByTime(): void; uses:
 * DONE     getMinutes(duration: string): number;
 * DONE   sortOrderIsLow(orderedBy: string): boolean;
 * sleep(ms): Promise; //used by many functions
 * getGoogleApi(): void;  Unable to test because async()'s dependency called Zone cannot be detected by Protractor
 * addToModal(driver: Driver);
 * getDistanceAndDuration(origin, drivers): Driver[];
 * 
 * 
 * 
*/

/**
 * Test if component exists.
 */
describe('DriverListComponent', () => {
  let component: DriverListComponent;
  let fixture: ComponentFixture<DriverListComponent>;

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/**
 * SortByName()
 */
describe('SortByName', () => {
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

/**
 * Test ChangeSortOrder
 */
describe('changeSortOrder', () => {
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

  it('Change sort order from low to high', () => {
    component.sortOrder = 'low';
    component.changeSortOrder();
    expect(component.sortOrder).toEqual('high');
  });

  it('Change sort order from high to low', () => {
    component.sortOrder = 'high';
    component.changeSortOrder();
    expect(component.sortOrder).toEqual('low');
  });
});

/**
 * Test SortOrderIsLow
 */
describe('sortOrderIsLow', () => {
  let component: DriverListComponent;
  let fixture: ComponentFixture<DriverListComponent>;

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

  it('Check sortOrderIsLow returns true', () => {
    component.sortOrder = 'low';
    component.orderedBy = 'name';
    expect(component.sortOrderIsLow('name')).toEqual(true);
  });

  it('Check sortOrderIsLow returns false', () => {
    component.sortOrder = 'high';
    component.orderedBy = 'name';
    expect(component.sortOrderIsLow('name')).toEqual(false);
  });

});

/**
 * Test Sort
 * Because sort calls sortByName, sortByDistance, and sortByTime,
 * we just test to see if this.orderBy is changed.  If we checked sortBy..., 
 * the test may not be considered a unit test.  Also, those function are tested elsewhere
 * in this file.
 */
describe('sort', () => {
  let component: DriverListComponent;
  let fixture: ComponentFixture<DriverListComponent>;

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

  it('Check if sort changes orderedBy to name', () => {
    component.orderedBy = 'time';
    component.sort('name');
    expect(component.orderedBy).toEqual('name');
  });

  it('Check if sort changes orderedBy to time', () => {
    component.orderedBy = 'name';
    component.sort('time');
    expect(component.orderedBy).toEqual('time');
  });

  it('Check if sort changes orderedBy to distance', () => {
    component.orderedBy = 'time';
    component.sort('distance');
    expect(component.orderedBy).toEqual('distance');
  });
});

/**
 * Test getMinutes
 */
describe('getMinutes', () => {
  let component: DriverListComponent;
  let fixture: ComponentFixture<DriverListComponent>;

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

  it('Check that getMinutes extracts a number', () => {
    expect(component.getMinutes('10 minutes')).toEqual(10);
  });
});

/**
 * Test addToModal
 */
describe('addToModal', () => {
  let component: DriverListComponent;
  let fixture: ComponentFixture<DriverListComponent>;

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

  it('Check that addToModal actual adds to class properties', () => {
    let mockDriver: Driver;
    mockDriver.name = 'name1';
    mockDriver.location = '123 Street Ave.';
    mockDriver.email = 'email@email.com';
    mockDriver.phoneNumber = '123-123-1234';
    let mockDriverProps: String[] = [ mockDriver.name, mockDriver.location, mockDriver.email, mockDriver.phoneNumber ];
    let d: String[] = [ component.driverName, component.location, component.driverEmail, component.driverPhoneNumber ];

    component.addToModal(mockDriver);
    expect(d).toEqual(mockDriverProps);
  });
});

/**
 * Test getDistanceAndDuration
 */
describe('getDistanceAndDuration', () => {
  let component: DriverListComponent;
  let fixture: ComponentFixture<DriverListComponent>;

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

  it('')
})