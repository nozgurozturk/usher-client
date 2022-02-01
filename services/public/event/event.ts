interface Location {
    name:     string;
    sections: Section[];
}

interface Section {
    name: string;
    rows: Row[];
}

interface Row {
    name:  string;
    order: number;
    seats: Seat[];
}

interface Seat {
    position:  Position;
    number:    number;
    features:  number;
    rank:      number;
    available: boolean;
}

interface Position {
    row: number;
    col: number;
}

export interface Event {
    id:          string;
    name:        string;
    description: string;
    startDate:   string;
    endDate:     string;
    location?:    Location;
}
