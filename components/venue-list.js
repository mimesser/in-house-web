export default function VenueList({ venues }) {
   return venues.map(venue => (
      <section key={venue.id}>
         <div className="image" />
         <div className="venue-details">
            <h3>{venue.name}</h3>
            <h3>{venue.venueInfo.address}, {venue.venueInfo.zipCode}</h3>
         </div>
      </section>
   ));
}
