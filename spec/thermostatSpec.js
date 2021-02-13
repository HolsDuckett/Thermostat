'use strict';

describe('Thermostat', function(){
  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it('starts at 20 degrees', function() {
    expect(thermostat.currentTemperature()).toEqual(20);
  });

  it('increases the temperature by 1 degree', function() {
    thermostat.up();
    expect(thermostat.currentTemperature()).toEqual(21);
  });

  it('decreases the tempreture by 1 degree', function() {
    thermostat.down();
    expect(thermostat.currentTemperature()).toEqual(19);
  });

  it('has a minimum tempreture of 10 degrees', function() {
    expect(thermostat.MINIMUM_TEMPERATURE).toEqual(10)
  });

  it('raises an error when you go below minimum temperature', function() {
      for (var i = 1; i < 11; i++) {
        thermostat.down();
      }
      expect(thermostat.currentTemperature()).toEqual(10)
      expect(function(){
        thermostat.down();
      }).toThrowError("Minimum temperature reached");
  });


  it('raises an error when you reach the maximum temperature, when power saving mode is on', function() {
    for (var j = 0; j < 5; j++) {
      thermostat.up();
    }
    expect(thermostat.currentTemperature()).toEqual(25)
    expect(function(){
      thermostat.up();
    }).toThrowError("Maximum temperature reached");
  });

  it('defaults as saving power mode as on', function() {
    expect(thermostat.currentPowerSavingMode()).toBe(true);
  });

  it('should change the power saving mode to off', function() {
    thermostat.powerModeOff();
    expect(thermostat.currentPowerSavingMode()).toBe(false);
  });

  it('should change the power saving mode to on', function() {
    thermostat.powerModeOn();
    expect(thermostat.currentPowerSavingMode()).toBe(true);
  });

  it('should be able to change the temperature to 20 with a reset function', function() {
    thermostat.up()
    expect(thermostat.currentTemperature()).toEqual(21);
    thermostat.reset()
    expect(thermostat.currentTemperature()).toEqual(20);
  });


  it('should raise the max temp to 32 when power saving mode is off', function() {
    thermostat.powerModeOff()
    expect(thermostat.currentPowerSavingMode()).toBe(false);
    for (var j = 0; j < 12; j++) {
      thermostat.up();
    }
    expect(thermostat.currentTemperature()).toEqual(32)
    expect(function(){
      thermostat.up();
    }).toThrowError('Maximum temperature reached')
  });

  describe('Display energy usage levels', function(){
    it('will display low energy usage if temperature is below 18', function () {
      for (var i = 1; i < 3; i++) {
        thermostat.down();
      }
      expect(thermostat.energyUsage()).toEqual("This temperature is low usage");
    });

    it('will display medium energy usage if temperature is above 18 and below or equal 25', function() {
      expect(thermostat.energyUsage()).toEqual("This temperature is medium usage");
    });

    it('should return high energy usage if temperature is above 25', function() {
      thermostat.powerModeOff();
      for (var i = 1; i < 6 ; i++) {
        thermostat.up();
      }
      expect(thermostat.energyUsage()).toEqual("This temperature is high usage");
    });
  }); // describe usage end

}); // class end
