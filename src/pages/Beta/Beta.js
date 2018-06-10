// 0A
import React from 'react';
import searchIcon from './icons/icon-search';
import menuIcon from './icons/hamburger';

import {
   Header, Logo, SearchIcon, MenuIcon, Section1, Section2, Section3, Section4, Section5,
   Section6, Video, HeaderContent, Wrapper,
} from './beta-styles.js';

export default function Beta() {
   return (
      <Wrapper>
         <Header>
            <HeaderContent>
               <Logo>IN-HOUSE</Logo>
               <SearchIcon>{searchIcon}</SearchIcon>
               <MenuIcon>{menuIcon}</MenuIcon>
            </HeaderContent>
         </Header>
         <Section1>
            <h2 className="L5">
               if your job could talk
            </h2>
            <h3 className="L3">
               let team consensus guide your workplace
            </h3>
         </Section1>

         <Video />

         <Section2>
            <button className="I-2">Notify me when live</button>
            <h2 className="L5">
               a yelp from the inside
            </h2>
            <h3 className="L3">
               using common team knowledge to decide who can speak
               <br />
               (anonymously)
            </h3>
         </Section2>

         <Section3>
            <h4 className="P1">#1 MINK:</h4>
            <h3 className="V2">
               Who is there a picture of in the employee bathroom?
            </h3>
         </Section3>

         <Section4>
            <h2 className="L5">
               totally safe
            </h2>

            <h4 className="L2">
               Will my boss know it's me?
            </h4>
            <div className="L1">
               No. We don't take names or even emails.
            </div>

            <h4 className="L2">
               How can I know it's just me & my team talking?
            </h4>
            <div className="L1">
               Because we use <em>"minks"</em> - patented insider password
               questions using your shared knowledge to verify you.
            </div>

            <h4 className="L2">
               Can everyone see our feedback?
            </h4>
            <div className="L1">
               No. Only bosses & <em>"insiders"</em> (who can answer your
               job's 'mink') can get access so opinions stay IN-HOUSE.
            </div>

            <h4 className="L2">
               Does my boss control this?
            </h4>
            <div className="L1">
               No. Organizations can't control or dictate anything.
               They're only given access after insiders start talking.
            </div>
         </Section4>

         <Section5>
            <h2 className="L4">
               how it works
            </h2>

            <ol>
               <li>
                  <span className="L2">List your job</span>
                  <span className="L1">
                     - including a password question that only you
                     & your team will know the answer to
                  </span>
               </li>

               <li>
                  <span className="L2">Alert your team</span>
                  <span className="L1">
                     - so only insiders who can answer the most
                     popular password question can rate your workplace.
                  </span>
               </li>

               <li>
                  <span className="L2">Rate & post</span>
                  <span className="L1">
                     - what bosses & teammates need to know with 100%
                     anonymity.
                  </span>
               </li>
            </ol>
         </Section5>

         <Section6>
            <h2 className="L4">
               workplace democracy
            </h2>
         </Section6>
      </Wrapper>
   );
}
