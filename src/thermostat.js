'use strict';

class Thermostat {

  constructor() {
    this.temperature = 20;
    this.powerSavingMode = true;
    this.maxTemp = 25;
    this.MINIMUM_TEMPERATURE = 10
  };

  currentTemperature() {
    return this.temperature;
  };

  currentPowerSavingMode() {
    return this.powerSavingMode;
  };

  up() {
    if (this.temperature + 1 > this.maxTemp) {
      throw new Error('Maximum temperature reached');
    };
    this.temperature += 1;
  };

  down() {
    if (this.temperature - 1 < this.MINIMUM_TEMPERATURE) {
      throw new Error('Minimum temperature reached');
    };
    this.temperature -= 1;
  };

  powerModeOff() {
    this.powerSavingMode = false;
    this.maxTemp = 32;
  };

  powerModeOn() {
    this.powerSavingMode = true;
    this.maxTemp = 25;
  };

  reset() {
    this.temperature = 20;
  };

  energyUsage() {
    if (this.temperature <= 18) {
      return "This temperature is low usage";
    };
    if (this.temperature > 18 && this.temperature < 25) {
      return "This temperature is medium usage";
    };
    return "This temperature is high usage";
  };

}
