export interface ReservationsIndexMonth {
  [key: string]: boolean;
}

export interface ReservationsIndexYear {
  [key: string]: ReservationsIndexMonth;
}
export interface ReservationsIndex {
  [key: string]: ReservationsIndexYear;
}
