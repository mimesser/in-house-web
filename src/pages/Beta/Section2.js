import React from 'react';
import Card from './Card';

export default function Section2() {
   return (
      <Card centerAlign paddingTop={20} paddingBottom={20}>
         <button className="I-2">Notify me when live</button>
         <h2 className="L5">
            a yelp from the inside
         </h2>
         <h3 className="L3">
            using common team knowledge to decide who can speak
            <br />
            (anonymously)
         </h3>
      </Card>
   );
}
