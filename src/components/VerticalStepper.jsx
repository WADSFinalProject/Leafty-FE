import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Check from '@mui/icons-material/Check';
import WidgetContainer from '../components/Cards/WidgetContainer';
import PropTypes from 'prop-types';

const steps = [
  {
    label: 'Shipping',
    description: `Centra is packing your leaves, waiting to send the packages. `,
  },
  {
    label: 'Harbor Verification',
    description: 'The Packages have been shipped out, waiting for harbor to verify the packages.',
  },
  {
    label: 'Harbor Reception',
    description: `Harbor has verified the packages, claim your packages from Harbor and generate your receipt`,
  },
  {
    label: 'Re-Scalling',
    description: `Check the contents of your package inside, is everything correct?`,
  },
  {
    label: 'Centra Reception',
    description: `Generate the reception for centra now!`,
  },
];

const CustomStepIcon = ({ active, completed }) => {
  return (
    <div
      style={{
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        backgroundColor: completed ? '#C0CD30' : 'transparent',
        border: `2.56px solid ${completed ? '#C0CD30' : '#C0CD3080'}`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background-color 0.3s, border-color 0.3s',
      }}
    >
      {completed ? <Check style={{ color: '#fff', fontSize: '16px' }} /> : null}
    </div>
  );
};

const VerticalStepper = ({ step, onOpen }) => {
  const [activeStep, setActiveStep] = useState(step - 1);

  useEffect(() => {
    setActiveStep(step - 1);
  }, [step]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel StepIconComponent={CustomStepIcon}>
              {step.label}
            </StepLabel>
            <StepContent>
              <WidgetContainer className={"flex justify-end items-center"} borderRadius="20px">
                <Typography>{step.description}</Typography>
                <IconButton
                  variant="contained"
                  onClick={onOpen}
                  sx={{ mt: 1, mr: 4 }}
                >
                  <svg
                    width="21"
                    height="18"
                    viewBox="0 0 21 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.08176 1.20563L10.07 0.290588C10.4884 -0.0968628 11.165 -0.0968628 11.579 0.290588L20.2324 8.29929C20.6508 8.68674 20.6508 9.31326 20.2324 9.69659L11.579 17.7094C11.1605 18.0969 10.4839 18.0969 10.07 17.7094L9.08176 16.7944C8.65888 16.4028 8.66778 15.7639 9.09957 15.3806L14.4634 10.6487L1.67025 10.6487C1.07822 10.6487 0.601929 10.2077 0.601929 9.65949L0.601929 8.34051C0.601929 7.79231 1.07822 7.35127 1.67025 7.35127L14.4634 7.35127L9.09957 2.61942C8.66333 2.23609 8.65443 1.59721 9.08176 1.20563Z"
                      fill="#0F7275"
                    />
                  </svg>
                </IconButton>
              </WidgetContainer>
              <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                {/* <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                  Back
                </Button> */}

                {/* {activeStep === steps.length - 1 ? (
                    <Check />
                  ) : (
                    <svg
                      width="21"
                      height="18"
                      viewBox="0 0 21 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.08176 1.20563L10.07 0.290588C10.4884 -0.0968628 11.165 -0.0968628 11.579 0.290588L20.2324 8.29929C20.6508 8.68674 20.6508 9.31326 20.2324 9.69659L11.579 17.7094C11.1605 18.0969 10.4839 18.0969 10.07 17.7094L9.08176 16.7944C8.65888 16.4028 8.66778 15.7639 9.09957 15.3806L14.4634 10.6487L1.67025 10.6487C1.07822 10.6487 0.601929 10.2077 0.601929 9.65949L0.601929 8.34051C0.601929 7.79231 1.07822 7.35127 1.67025 7.35127L14.4634 7.35127L9.09957 2.61942C8.66333 2.23609 8.65443 1.59721 9.08176 1.20563Z"
                        fill="#0F7275"
                      />
                    </svg>
                  )} */}

              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        
          <Paper square elevation={0} sx={{ p: 4 }}>
            <div className='flex justify-center flex-col items-center'>
            <Typography className='text-center'>You&apos;ve claimed the packages. <br></br>
              You can check the reception on here.</Typography>
            <Button onClick={onOpen} sx={{ mt: 1, mr: 1 }}>
              Reception Files
            </Button>
            </div>
          </Paper>
        
      )}
    </Box>
  );
};

VerticalStepper.propTypes = {
  step: PropTypes.number.isRequired,
};

export default VerticalStepper;