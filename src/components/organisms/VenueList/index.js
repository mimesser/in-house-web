import React from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Users } from 'styled-icons/feather';

import { CircleProgress, Loader } from '../../atoms';

import { selectVenues } from '../../../store/venues';

function VenueListComponent({ venues }) {
   if (!venues) {
      return <Loader big />;
   }

   const showVenue = venue => {
      const { id } = venue;
      Router.push(`/houses?id=${id}`, `/houses/${id}`, { shallow: true });
   };

   return (
      <>
         <div className="row">
            {venues &&
               venues.map(venue => {
                  return (
                     <div
                        className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
                        key={venue.id}
                        onClick={() => showVenue(venue)}
                     >
                        <div className="card">
                           <div className="container-image">
                              <img className="image" src={venue.venueInfo.imageUrl} alt="random" />
                           </div>
                           <div className="venue-details">
                              <div className="industry">{venue.industry && venue.industry.name}</div>
                              <div className="venue-name">{venue.name}</div>
                              <div className="venue-address">
                                 {venue.venueInfo.address}
                                 <br />
                                 {venue.venueInfo.city}, {venue.venueInfo.state} {venue.venueInfo.zipCode}
                              </div>
                           </div>
                           <div className="right">
                              {typeof venue.rating === 'number' ? <CircleProgress score={venue.rating || 0} /> : '—'}
                              <div className="insiders">
                                 <Users size={18} />
                                 <span>{venue.insidersCount}</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  );
               })}
         </div>
         <style jsx>
            {`
               section {
                  margin-top: 10px;
               }
               .card {
                  padding: 10px;
                  display: flex;
                  background-color: #fff;
                  margin: 10px 0;
                  height: 116px;
                  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.08);
                  border-radius: 2px;
                  cursor: pointer;
               }
               .card:hover {
                  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
               }
               .container-image {
                  background-color: #e5e5e5;
                  height: 92px;
                  width: 92px;
                  min-width: 92px;
                  max-width: 92px;
                  overflow: hidden;
               }
               .image {
                  height: 100%;
                  width: 100%;
                  object-fit: stretch;
               }
               .venue-details {
                  display: flex;
                  flex-direction: column;
                  overflow: hidden;
                  margin-left: 10px;
               }
               .venue-name {
                  font-size: 18px;
                  color: #000000;
                  font-weight: bold;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  margin: 5px 0;
               }
               .venue-address {
                  font-size: 12px;
               }
               .industry {
                  color: #9b9b9b;
                  font-size: 12px;
               }
               .right {
                  margin-left: auto;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: space-evenly;
               }
               .insiders i {
                  border: 1px solid #929da7;
                  height: 16px;
                  width: 16px;
                  font-size: 12px;
                  border-radius: 50%;
                  text-align: center;
                  color: #929da7;
               }
               .insiders {
                  color: #929da7;
               }
               .insiders span {
                  margin-left: 4px;
                  font-size: 12px;
               }
            `}
         </style>
      </>
   );
}

const mapStateToProps = createStructuredSelector({
   venues: selectVenues,
});

export const VenueList = connect(mapStateToProps)(VenueListComponent);
