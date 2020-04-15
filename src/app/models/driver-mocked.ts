import { DriverProps, Driver } from './driver';

export const mockDriverProps1: DriverProps = {
    id: 1,
    name: 'C',
    location: '123 First Ave',
    email: 'example@example.com',
    phoneNumber: '5555555555',
    distance: '6 mi',
    duration: '11 min'
};

export const mockDriverProps2: DriverProps = {
    id: 2,
    name: 'A',
    location: '123 First Ave',
    email: 'example@example.com',
    phoneNumber: '5555555555',
    distance: '4 mi',
    duration: '9 min'
};

export const mockDriverProps3: DriverProps = {
    id: 3,
    name: 'B',
    location: '123 First Ave',
    email: 'example@example.com',
    phoneNumber: '5555555555',
    distance: '5 mi',
    duration: '10 min'
};

export const mockDrivers: Driver[] = [ new Driver(mockDriverProps1), new Driver(mockDriverProps2), new Driver(mockDriverProps3) ];
export const mockDriversSorted: Driver[] = [ new Driver(mockDriverProps2), new Driver(mockDriverProps3), new Driver(mockDriverProps1) ];