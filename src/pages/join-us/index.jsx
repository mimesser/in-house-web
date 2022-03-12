import React from 'react';
import styled from 'styled-components';

import { Page } from '../../components/organisms';
import { H1 } from '../../components/atoms';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  text-transform: none;
  align-items: center;
`;

function JoinUs() {
  return (
    <Page noPadd>
      <Wrapper>
        <H1>Coming Soon...</H1>
      </Wrapper>
    </Page>
  );
}

export default JoinUs;


// import React from 'react';
// import styled from 'styled-components';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { Footer } from '../../components/organisms/Footer';
// import Text from '../../components/atoms/text/_index';
// import Button, { BackButton } from '../../components/atoms/Button/_index';
// import { JoinUSBaseStyling } from './styles';
// import { Page } from '../../components/organisms';
// import { appColors } from '../../style';

// const JoinUs = () => {
//   const router = useRouter();

//   return (
//     <Page whiteHead style={{ backgroundColor: appColors.gray600 }}>
//       <Styling>
//         <div className="section__content">
//           <section className="section">
//             <Text.Heading
//               className="section--heading-title"
//               variant="light"
//               weight="bold"
//               size={32}
//               color="gray100"
//               level={1}
//               text="join us"
//             />
//             <Text
//               size={14}
//               className="description"
//               style={{ maxWidth: 650 }}
//               color="gray300"
//               text={`to avoid our dependence on external capital and control,
//         we seek to work with people who share our vision for consensus
//         and transparency and have the talents and resources to help us grow`}
//             />
//             <div className="join-us--btns">
//               <Link href={`${router.pathname}/motivated`}>
//                 <Button variant="light" text="motivated individual" />
//               </Link>
//               <Link href={`${router.pathname}/strategic`}>
//                 <Button variant="light" text="strategic partner" />
//               </Link>
//             </div>
//             <Link href="/">
//               <BackButton className="section--back" variant="light" text="back" />
//             </Link>
//           </section>
//         </div>
//         <Footer variant="transparent" />
//       </Styling>
//     </Page>
//   );
// };

// const Styling = styled(JoinUSBaseStyling)`
//   .section {
//     .description {
//       margin-top: 30px;
//     }
//     .join-us--btns {
//       display: grid;
//       gap: 30px;
//       margin: 20px auto 20px;
//     }
//   }

//   @media screen and (min-width: 500px) {
//     .section__content {
//       max-width: 525px;
//       background-color: white;
//       max-height: 446px;
//     }
//     .section.join-us--btns {
//       margin-top: 90px;
//       margin-bottom: 90px;
//     }
//     .section--heading-title,
//     .section--back {
//       color: ${appColors.secondaryBlack} !important;
//     }
//   }
// `;

// export default JoinUs;
