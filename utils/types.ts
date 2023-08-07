export interface TripDetail {
  id: number;
  content: string;
  departureDate: string;
  returnDate: string;
  destination: string;
  managerId: {
    id: number;
    firstName: string;
    lastName: string;
  };
  partnerId: {
    id: number;
    contactPerson: string;
    name: string;
  };
  // tags: string[];
}
