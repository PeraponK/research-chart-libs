import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StepUploadImage from "./Step/UploadImage";
import StepSetAxes from "./Step/SetAxes";
import StepDrawCurve from "./Step/DrawCruve";
import StepReview from "./Step/Review";

const steps = ["UploadImage", "SetAxes", "DrawCurve", "Review"];

const StepperBezier = () => {
  const [img, setImage] = React.useState(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [xAxis, setXAxis] = React.useState();
  const [yAxis, setYAxis] = React.useState();

  const handleSetImage = (image) => {
    setImage(image);
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleXAxis = (xAxis) => {
    setXAxis(xAxis);
  };
  const handleYAxis = (yAxis) => {
    setYAxis(yAxis);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box>
            <div>
              {activeStep === 0 ? (
                <div>
                  <StepUploadImage onImageUpdate={handleSetImage} />
                </div>
              ) : activeStep === 1 ? (
                <div>
                  <StepSetAxes
                    img={img}
                    onXAxisUpdate={handleXAxis}
                    onYAxisUpdate={handleYAxis}
                  />
                </div>
              ) : activeStep === 2 ? (
                <StepDrawCurve xAxis={xAxis} yAxis={yAxis} img={img} />
              ) : (
                <StepReview />
              )}
            </div>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default StepperBezier;
