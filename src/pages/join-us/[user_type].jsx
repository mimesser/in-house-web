import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
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
import Input from '../../components/atoms/Input/_index';

const interest = [
  { label: 'engineering / devops / qa', value: "eng" },
  { label: 'content creation / storytelling', value: "content" },
  { label: 'ux / ui design', value: "design" },
  { label: 'product / project management', value: "product" },
  { label: 'app development', value: "dev" },
  { label: 'branding / art direction', value: "branding" },
  { label: 'user testing / analytics', value: "testing" },
  { label: 'community organizing / policy', value: "community" },
  { label: 'growth hacking / social media', value: "growth" },
  { label: 'public relations / outreach', value: "relations" },
  { label: 'business development / finance', value: "bus_dev" },
  { label: 'management / operations', value: "mgmt" },
  { label: 'legal / compliance', value: "legal" },
  { label: 'accounting / taxation', value: "acct" },
  { label: 'others', value: "others" },
];

const hearOptions = [
  { label: 'social media', value: 'social' },
  { label: 'coworker / employer', value: 'employer' },
  { label: 'street advertising', value: 'ads' },
  { label: 'word of mouth', value: 'mouth' },
  { label: 'other', value: 'other' },
];

const initVal = { name: '', email: '', heardAbout: null, comment: '', file: '', interest: {} };

const JoinUsUserPage = () => {
  const router = useRouter();
  const { user_type: userType } = router.query;

  const [steps, setSteps] = useState({ step: 1, total: 3 });
  const [showSummary, setShowSummary] = useState(false);

  const formik = useFormik({
    initialValues: initVal,
    initialErrors: initVal,
    validate: (values) => {
      const errors = {};
      if (!values.name) errors.name = 'required!';
      if (!values.email) errors.email = 'required!';
      if (!values.comment) errors.comment = 'required!';
      if (!values.heardAbout) errors.heardAbout = 'required!';
      if (userType !== 'strategic') {
        if (!Object.keys(values.interest).length)
          errors.interest = 'at least one option is required!';
      }
      return errors;
    },
    validateOnChange: true,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      setTimeout(() => {
        setSubmitting(false);
        setSteps({ step: 3, total: 3 });
        setShowSummary(true);
      }, 2000);
    },
  });

  const handleCheckers = (e) => {
    const copyObj = formik.values.interest;
    if (!e.target.checked) {
      delete copyObj[e.target.name];
    } else {
      copyObj[e.target.name] = e.target.checked;
    }
    formik.handleChange({ target: { name: 'interest', value: copyObj } });
  };

  const goBack = () => {
    if (!showSummary) {
      router.push('/join-us');
    } else {
      setSteps({ step: 2, total: 3 });
      setShowSummary(false);
    }
  };

  useEffect(() => {
    setSteps({ step: formik.isValid ? 2 : 1, total: 3 });
  }, [formik.isValid]);

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
                {interest.map(({ label, value }) => (
                  <Checkbox
                    key={label}
                    name={label}
                    value={value}
                    onChange={handleCheckers}
                    checked={formik.values.interest[label]}
                  >
                    <Text text={label} />
                  </Checkbox>
                ))}
              </>
            </section>
          )}
          {!showSummary ? (
            <form className="form">
              <Input
                variant="light"
                name="name"
                placeholder="name"
                clearable
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              <Input
                variant="light"
                name="email"
                placeholder="email"
                clearable
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <Input.TextArea
                style={{ minHeight: 113 }}
                variant="light"
                name="comment"
                placeholder="tell us about yourself"
                onChange={formik.handleChange}
                value={formik.values.comment}
              />
              <Input.Select
                variant="light"
                name="heardAbout"
                placeholder="how did you hear about us?"
                options={hearOptions}
                onChange={formik.handleChange}
                value={formik.values.heardAbout}
              />
              <UploadButton
                onChange={formik.handleChange}
                value={formik.values.file}
                placeholder="pdf, word"
                variant="light"
              />
            </form>
          ) : (
            <div>show summary</div>
          )}
          <div className="form-btns">
            {!showSummary ? (
              <Button text="cancel" variant="light" suffix=" " onClick={goBack} outlined noBorder />
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
