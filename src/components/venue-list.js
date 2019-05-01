import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import CircleProgress from './circle-progress';
import { Modal } from './organisms/Modal';
import { VenueInsiderQuestionChallenge } from './organisms/VenueInsiderQuestionChallenge';

import { unsplashRestaurantAndCafeCollection } from './imgURLs'; // https://unsplash.com/collections/312299/restaurant-cafe

const allImgURLs = unsplashRestaurantAndCafeCollection.length;

function getRandomScore() {
   return Math.random() * 10 + 1;
}

function getRandomInsiders() {
   return Math.floor(Math.random() * 100 + 1);
}

const getRandomImage = () => {
   const imgAtIndex = Math.floor(Math.random() * allImgURLs + 1);
   return unsplashRestaurantAndCafeCollection[imgAtIndex];
};

function VenueList({ venues, industries }) {
   const [modalState, setModalState] = useState(false);
   const [venueSelected, setVenueSelected] = useState(null);

   const handleModalState = () => setModalState(!modalState);
   const handleVenueSelected = venue => setVenueSelected(venue);

   useEffect(() => {
      if (modalState === false && venueSelected !== null) {
         setVenueSelected(null);
      }
   }, [modalState, venueSelected]);

   return (
      <section className="container">
         <div className="row">
            {venues.map(venue => {
               const industry = industries[venue.industryId];

               return (
                  <div
                     className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
                     key={venue.id}
                     onClick={() => {
                        handleModalState();
                        handleVenueSelected(venue);
                     }}
                  >
                     <div className="card">
                        <div className="container-image">
                           <img className="image" src={getRandomImage()} alt="random" />
                        </div>
                        <div className="venue-details">
                           <div className="industry">{industry && industry.name}</div>
                           <div className="venue-name">{venue.name}</div>
                           <div className="venue-address">
                              {venue.venueInfo.address}
                              <br />
                              {venue.venueInfo.city}, {venue.venueInfo.state} {venue.venueInfo.zipCode}
                           </div>
                        </div>
                        <div className="right">
                           <CircleProgress score={getRandomScore()} />
                           <div className="insiders">
                              <i className="material-icons">person</i>
                              <span>{getRandomInsiders()}</span>
                           </div>
                        </div>
                     </div>
                  </div>
               );
            })}
         </div>
         <Modal open={modalState} closeModal={() => handleModalState()}>
            {venueSelected ? <VenueInsiderQuestionChallenge venue={venueSelected} /> : null}
         </Modal>
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
      </section>
   );
}

function mapStateToProps({ aggregate }) {
   return {
      industries: !aggregate
         ? {}
         : aggregate.industries.reduce((res, industry) => {
              res[industry.id] = industry;
              return res;
           }, {}),
   };
}

export default connect(mapStateToProps)(VenueList);
