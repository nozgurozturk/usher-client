import { Hall, Seat } from "../layouts/layout";

export interface Event {
    id:          string;
    name:        string;
    description: string;
    startDate:   string;
    endDate:     string;
    location?:    Hall;
}


export interface EventResponse {
    event:        Event;
    layout:       Hall;
    tickets:      Ticket[];
    reservations: Reservation[];
}

export interface Reservation {
    id:          string;
    event:       Event;
    user:        User;
    size:        number;
    preferences: Preferences;
}

export interface Preferences {
    features: number;
    rank:     number;
}

export interface User {
    id: string;
}

export interface Ticket {
    id:    string;
    event: Event;
    user:  User;
    seat:  Seat;
}
