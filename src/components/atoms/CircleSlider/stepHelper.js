export class StepHelper {
  stepsArray;

  stepIndex;

  countSteps;

  constructor(min, stepSize, max, initialValue) {
    const countSteps = 1 + (max - min) / stepSize;
    this.stepsArray = this.getStepsArray(min, stepSize, countSteps);
    this.countSteps = this.stepsArray.length - 1;
    this.stepIndex = 0;
    this.setCurrentStepIndexFromArray(initialValue);
  }

  getStepsArray = (min, stepSize, countSteps) => {
    const stepArray = [];
    for (let i = 0; i < countSteps; i++) {
      stepArray.push(min + i * stepSize);
    }
    return stepArray;
  };

  getEpsilon() {
    let epsilon = 1.0;
    while (1.0 + 0.5 * epsilon !== 1.0) {
      epsilon *= 0.5;
    }
    return epsilon;
  }

  getAngle() {
    const accuracy = 0.00001;
    const epsilon = Number.EPSILON || this.getEpsilon();
    return Math.min(this.getAnglePoint() * this.stepIndex, 2 * Math.PI - epsilon) - accuracy;
  }

  getCurrentStep() {
    return this.stepsArray[this.stepIndex];
  }

  updateStepIndexFromValue(value) {
    const isSetValue = this.setCurrentStepIndexFromArray(value);
    if (isSetValue) {
      return;
    }
    this.stepIndex = this.countSteps;
  }

  updateStepIndexFromAngle(angle) {
    const stepIndex = Math.round(angle / this.getAnglePoint());
    this.stepIndex = Math.min(stepIndex, this.countSteps);
  }

  setCurrentStepIndexFromArray = value => {
    for (let i = 0; i < this.countSteps; i++) {
      if (value <= this.stepsArray[i]) {
        this.stepIndex = i;
        return true;
      }
    }
    this.stepIndex = this.countSteps;
    return false;
  };

  getAnglePoint() {
    return (Math.PI * 2) / this.countSteps;
  }
}
