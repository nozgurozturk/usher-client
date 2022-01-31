export interface Hall {
    id: string;
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