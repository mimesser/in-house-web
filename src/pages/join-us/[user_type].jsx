import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useFormik } from 'formik';
import Text from '../../components/atoms/text/_index';
import Stepper from '../../components/atoms/stepper';
import Button, { BackButton, UploadButton } from '../../components/atoms/Button/_index';
import { Footer } from '../../components/organisms/Footer';
import { Checkbox } from '../../components/atoms/Checkbox/_index';
import { appColors, device } from '../../style';
import { JoinUSBaseStyling } from '../../style/joinus';
import { Page } from '../../components/organisms';
import Input from '../../components/atoms/Input/_index';
import Summary from './_summary';
import { isEmailValid } from '../../utils';
import { postJoinUs, loadInterests, loadSources } from '../../store/feedback';
import { FormRow } from '../../components/atoms/FormRow/index';

const interest = [
  { label: 'engineering / devops / qa', value: 'eng' },
  { label: 'content creation / storytelling', value: 'content' },
  { label: 'ux / ui design', value: 'design' },
  { label: 'product / project management', value: 'product' },
  { label: 'app development', value: 'dev' },
  { label: 'branding / art direction', value: 'branding' },
  { label: 'user testing / analytics', value: 'testing' },
  { label: 'community organizing / policy', value: 'community' },
  { label: 'growth hacking / social media', value: 'growth' },
  { label: 'public relatio+nns / outreach', value: 'relations' },
  { label: 'business development / finance', value: 'bus_dev' },
  { label: 'management / operations', value: 'mgmt' },
  { label: 'legal / compliance', value: 'legal' },
  { label: 'accounting / taxation', value: 'acct' },
  { label: 'others', value: 'others' },
];

const hearOptions = [
  { label: 'social media', value: 'social' },
  { label: 'coworker / employer', value: 'employer' },
  { label: 'street advertising', value: 'ads' },
  { label: 'word of mouth', value: 'mouth' },
  { label: 'other', value: 'other' },
];

const initVal = { name: '', email: '', heardAbout: null, comment: '', file: null, interest: {} };

const getBase64 = (file) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    console.log(reader.result);
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
};

const JoinUsUserPage = (props) => {
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
      else if (!isEmailValid(values.email)) errors.email = 'email not valid!';
      if (!values.comment) errors.comment = 'required!';
      if (!values.heardAbout) errors.heardAbout = 'required!';
      if (!values.file) errors.file = 'required!';
      if (userType === 'motivated') {
        if (!Object.keys(values.interest).length)
          errors.interest = 'at least one option is required!';
      }
      return errors;
    },
    validateOnChange: true,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);

      if (showSummary) {
        values.redirectLink = '/thanks';
        //values.membershipType = 0
        props.postJoinUs(values);
        setSubmitting(false);
      } else {
        setTimeout(() => {
          setSubmitting(false);
          setSteps({ step: 3, total: 3 });
          setShowSummary(true);
        }, 2000);
      }
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

  const handleFileUpload = (e) => {
    formik.handleChange({ target: { name: e.target.name, value: e.target.files[0] } });
    getBase64(e.target.files[0]);
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

  useEffect(() => {
    props.loadInterests();
    props.loadSources();
  }, []);

  return (
    <Page whiteHead noPadd style={{ backgroundColor: appColors.gray600 }}>
      <Styling>
        <div className="section__content">
          <section className="join-section">
            <Text.Heading
              className="section--heading-title"
              variant="light"
              weight="bold"
              size={32}
              smSize={45}
              lgSize={54}
              color="gray100"
              level={1}
              text={`join us${showSummary ? ' - confirm' : ''}`}
            />
            <Stepper variant="light" state={steps} className="stepper" style={{ width: '350px' }} />
            <Text.Heading
              size={14}
              smSize={20}
              color="gray300"
              level={2}
              text="100% confidential"
            />
            <div className="form-content">
              {userType === 'motivated' && !showSummary && (
                <section className="interest">
                  <Text.Heading
                    level={3}
                    color="gray100"
                    variant="light"
                    text="your interest or expertise"
                    size={24}
                    smSize={36}
                  />
                  <>
                    {!props.interestsLoading &&
                      props.interests.map(({ label, value }) => (
                        <Checkbox
                          key={value}
                          name={value}
                          value={value}
                          onChange={handleCheckers}
                          checked={formik.values.interest[label]}
                        >
                          <Text text={label} color="gray300" size={14} smSize={16} mdSize={20} />
                        </Checkbox>
                      ))}
                  </>
                </section>
              )}
              {!showSummary ? (
                <form className="form">
                  <FormRow>
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
                  </FormRow>
                  <FormRow>
                    <Input.TextArea
                      style={{ minHeight: 113 }}
                      variant="light"
                      name="comment"
                      placeholder="tell us about yourself"
                      onChange={formik.handleChange}
                      value={formik.values.comment}
                      maxChars={500}
                    />
                  </FormRow>
                  <FormRow>
                    <Input.Select
                      variant="light"
                      name="heardAbout"
                      placeholder="how did you hear about us?"
                      options={props.sources}
                      onChange={formik.handleChange}
                      value={formik.values.heardAbout}
                      loading={props.sourcesLoading}
                    />
                  </FormRow>
                  <FormRow>
                    <UploadButton
                      onChange={handleFileUpload}
                      name="file"
                      placeholder="pdf, word"
                      variant="light"
                      style={{ width: '350px' }}
                    />
                  </FormRow>
                </form>
              ) : (
                <Summary values={formik.values} interests={props.interests} />
              )}
            </div>
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
                style={{
                  width: '134px',
                  backgroundColor: formik.isValid ? undefined : appColors.gray600,
                  borderColor: appColors.gray300,
                  borderStyle: 'solid',
                  borderWidth: '1px',
                }}
              />
            </div>
          </section>
        </div>
        <Footer variant="transparent" />
      </Styling>
    </Page>
  );
};

const Styling = styled(JoinUSBaseStyling)`
  .join-section {
    .stepper,
    .form {
      margin: 30px 0;
    }
    .form {
      display: flex;
      gap: 30px;
      flex-direction: column;
      max-width: 732px;
      input {
        width: 350px;
      }
      textarea {
        width: 350px;
      }
      .base-input-container {
        width: 350px;
      }
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
  .form-content {
    display: flex;
    flex-direction: column;

    .interest {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      div {
        flex-basis: 100%;
        flex-grow: 1;
      }
      h3 {
        flex-basis: 100%;
        flex-grow: 1;
      }
    }

    @media ${device.tab} {
      .interest {
        div {
          flex-basis: 48%;
        }
      }
      .form {
        textarea {
          width: 732px;
        }
        .base-input-container {
          width: 732px;
        }
      }
      .form-btns {
        max-width: 350px;
      }
    }

    @media ${device.web} {
      .interest {
        div {
          flex-basis: 32%;
        }
      }
    }
  }

  @media ${device.tab} {
    .form-btns {
      max-width: 350px;
    }
  }
`;

const mapState = (state) => ({
  ...state.feedback,
});

const mapDispatch = {
  postJoinUs,
  loadInterests,
  loadSources,
};
export default connect(mapState, mapDispatch)(JoinUsUserPage);
