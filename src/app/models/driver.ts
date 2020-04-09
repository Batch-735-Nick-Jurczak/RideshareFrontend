interface DriverProps {
    id: number;
    name: string;
    origin: string;
    distance: string;
    time: string;
}

export class Driver {

    private driverProps: DriverProps;

    constructor(driverProps: DriverProps) {
        this.driverProps = driverProps;
    }

    get id(): number {
        return this.driverProps.id;
    }

    set id(id: number) {
        this.driverProps.id = id;
    }

    get name(): string {
        return this.driverProps.name;
    }

    set name(name: string) {
        this.driverProps.name = name;
    }

    get origin(): string {
        return this.driverProps.origin;
    }

    set origin(origin: string) {
        this.driverProps.origin = origin;
    }

    get distance(): string {
        return this.driverProps.distance;
    }

    set distance(distance: string) {
        this.driverProps.distance = distance;
    }

    get time(): string {
        return this.driverProps.time;
    }

    set time(time: string) {
        this.driverProps.time = time;
    }

}
