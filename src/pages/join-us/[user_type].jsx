import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import Text from '../../components/atoms/text/_index';
import Stepper from '../../components/atoms/stepper';
import Button, { BackButton, UploadButton } from '../../components/atoms/Button/_index';
import { Footer } from '../../components/organisms/Footer';
import { Checkbox } from '../../components/atoms/Checkbox/_index';
import { appColors } from '../../style';
import { JoinUSBaseStyling } from './styles';
import { Page } from '../../components/organisms';
import { Input, Textarea } from '../../components/atoms';

const interest = [
  { label: 'engineering / devops / qa' },
  { label: 'content creation / storytelling' },
  { label: 'ux / ui design' },
  { label: 'product / project management' },
  { label: 'app development' },
  { label: 'branding / art direction' },
  { label: 'user testing / analytics' },
  { label: 'community organizing / policy' },
  { label: 'growth hacking / social media' },
  { label: 'public relations / outreach' },
  { label: 'business development / finance' },
  { label: 'management / operations' },
  { label: 'legal / compliance' },
  { label: 'accounting / taxation' },
  { label: 'others' },
];

const JoinUsUserPage = () => {
  const router = useRouter();
  const { user_type: userType } = router.query;

  const [steps, setSteps] = useState({ step: 1, total: 3 });
  const [showSummary, setShowSummary] = useState(false);

  const formik = useFormik({
    initialValues: { name: '', email: '', heardAbout: '', comment: '', file: '', interest: {} },
    initialErrors: {},
    validate: () => {
      const errors = {};
      // form validation here
      if (!Object.keys(errors)) setSteps({ step: 2, total: 3 });
      return errors;
    },
    validateOnChange: true,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        setSubmitting(false);
        setSteps({ step: 3, total: 3 });
        setShowSummary(true);
      }, 2000);
    },
  });

  const goBack = () => {
    if (!showSummary) {
      router.push('/join-us');
    } else {
      setSteps({ step: 2, total: 3 });
      setShowSummary(false);
    }
  };

  return (
    <Page whiteHead style={{ backgroundColor: appColors.gray600 }}>
      <Styling>
        <section>
          <Text.Heading weight="bold" size={32} color="grey100" level={1} text="join us" />
          <Stepper variant="light" state={steps} className="stepper" />
          <Text.Heading size={14} color="gray300" level={2} text="100% confidential" />
          {userType === 'motivated' && !showSummary && (
            <section className="interest">
              <Text.Heading
                level={3}
                weight={700}
                color="grey100"
                text="your interest or expertise"
              />
              <>
                {interest.map(({ label }) => (
                  <Checkbox>
                    <Text text={label} />
                  </Checkbox>
                ))}
              </>
            </section>
          )}
          {!showSummary ? (
            <form className="form">
              <Input />
              <Input />
              <Textarea />
              <UploadButton placeholder="pdf, word" />
            </form>
          ) : (
            <div>show summary</div>
          )}
          <div className="form-btns">
            {!showSummary ? (
              <Button
                text="cancel"
                variant="light"
                suffix=" "
                onClick={goBack}
                outlined
                noBorder
              />
            ) : (
              <BackButton style={{ color: appColors.gray200 }} onClick={goBack} />
            )}
            <Button
              onClick={formik.handleSubmit}
              loading={formik.isSubmitting}
              disabled={!formik.isValid}
              variant="light"
              text="submit"
            />
          </div>
        </section>
        <Footer variant="transparent" />
      </Styling>
    </Page>
  );
};

const Styling = styled(JoinUSBaseStyling)`
  > section {
    .stepper,
    .form {
      margin: 30px 0;
    }
    .form {
      display: grid;
      gap: 30px;
    }
    .interest {
      margin-top: 30px;
      display: grid;
      gap: 20px;
    }
    .form-btns {
      margin-top: 55px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

export default JoinUsUserPage;
