import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { Step4 } from './Step4';
import { Step5 } from './Step5';
import { Step6 } from './Step6';
import { Loader } from '../../atoms';
import { selectIndustries } from '../../../store/aggregate';
import { createVenue } from '../../../store/venues';

const QuickListForm = ({ industries, listHouse }) => {
  const [step, setStep] = useState(1);
  const [industry, setIndustry] = useState(undefined);
  const [industryDesc, setIndustryDesc] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [image, setImage] = useState(undefined);

  if (!industries) {
    return <Loader big />;
  }

  return (
    <>
      {step === 1 && (
        <Step1
          setStep={setStep}
          industries={industries}
          industry={industry}
          setIndustry={setIndustry}
          industryDesc={industryDesc}
          setIndustryDesc={setIndustryDesc}
        />
      )}
      {step === 2 && <Step2 setStep={setStep} name={name} setName={setName} />}
      {step === 3 && (
        <Step3
          setStep={setStep}
          city={city}
          setCity={setCity}
          country={country}
          setCountry={setCountry}
          address={address}
          setAddress={setAddress}
          zip={zip}
          setZip={setZip}
        />
      )}
      {step === 4 && (
        <Step4 setStep={setStep} question={question} setQuestion={setQuestion} answer={answer} setAnswer={setAnswer} />
      )}
      {step === 5 && <Step5 setStep={setStep} setImage={setImage} image={image} />}
      {step === 6 && (
        <Step6
          setStep={setStep}
          name={name}
          industry={industry}
          industryDesc={industryDesc}
          address={address}
          zip={zip}
          question={question}
          answer={answer}
          image={image}
          city={city}
          country={country}
          listHouse={listHouse}
        />
      )}
    </>
  );
};

const mapState = createStructuredSelector({
  industries: selectIndustries,
});
const mapDispatch = {
  listHouse: createVenue,
};

export default connect(
  mapState,
  mapDispatch,
)(QuickListForm);
