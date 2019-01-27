interface IVenueInfo {
   readonly zip: number;
   readonly phone: string;
   readonly address: string;
   readonly city: string;
   readonly state: string;
   readonly country: string;
}

export default interface IVenue {
   readonly id: number;
   readonly industryId: number;
   readonly name: string;
   readonly rating?: number;
   readonly venueInfo: IVenueInfo;
}
