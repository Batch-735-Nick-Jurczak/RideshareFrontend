import { DriverProps, Driver } from './driver';

export const mockDriverProps1: DriverProps = {
    id: 1,
    name: 'minh',
    location: '123 First Ave',
    email: 'example@example.com',
    phoneNumber: '5555555555',
    distance: '6 mi',
    duration: '11 min'
};

export const mockDriverProps2: DriverProps = {
    id: 2,
    name: 'mike',
    location: '123 First Ave',
    email: 'example@example.com',
    phoneNumber: '5555555555',
    distance: '5 mi',
    duration: '10 min'
};

export const mockDrivers: Driver[] = [ new Driver(mockDriverProps1), new Driver(mockDriverProps2) ];
export const mockDriversSorted: Driver[] = [ new Driver(mockDriverProps2), new Driver(mockDriverProps1) ];