const sinon = require('sinon');
const expect = require('chai').expect;
const rewire = require('rewire');

foobar = rewire('./config.js'); // Bring module in with rewire to get access to private functions

describe("private_getConfig", function () {
  // Use the special '__get__' accessor to get your private function.
  const private_getStringConfig = foobar.__get__('getStringConfig');
  let commandLineArgsStub;
  let processEnvStub;
  const hostConfigData = {id: 'HOST', default: 'localhost', description: 'Name of host'};

  it('should read value from commandLineArgs first', function () {
    const hostName = 'hostFromCommandLineArgs';
    commandLineArgsStub = {'HOST': hostName};
    processEnvStub = {'HOST': 'notsolocalhost'};

    const response = private_getStringConfig(commandLineArgsStub, processEnvStub, hostConfigData);
    expect(response).to.equal(hostName);

  });

  it('should read value from environment if no val set in CLargs', function () {
    const hostName = 'hostFromEnv';
    commandLineArgsStub = {};
    processEnvStub = {'HOST': hostName};

    const response = private_getStringConfig(commandLineArgsStub, processEnvStub, hostConfigData);
    expect(response).to.equal(hostName);
  });

  it('should return default value if no val set in env, CLargs', function () {
    const hostName = hostConfigData.default;
    commandLineArgsStub = {};
    processEnvStub = {};

    const response = private_getStringConfig(commandLineArgsStub, processEnvStub, hostConfigData);
    expect(response).to.equal(hostName);
  });
});

describe("private_getNumericConfig", function () {
  const private_getNumericConfig = foobar.__get__('getNumericConfig');
  let commandLineArgsStub;
  let processEnvStub;
  const portConfigData = {id: 'PORT', default: 3000, description: 'Port server listens on'};

  it('should read numeric values from commandLineArgs first', function () {
    const port = 9999;
    commandLineArgsStub = {'PORT': port};
    processEnvStub = {'PORT': 666};

    const response = private_getNumericConfig(commandLineArgsStub, processEnvStub, portConfigData);
    expect(response).to.equal(port);

  });

  it('should read numeric values from environment if no val set in CLargs', function () {
    const port = 9999;
    commandLineArgsStub = {};
    processEnvStub = {'PORT': port};

    const response = private_getNumericConfig(commandLineArgsStub, processEnvStub, portConfigData);
    expect(response).to.equal(port);
  });

  it('should return default numeric values if no val set in env, CLargs', function () {
    const port = portConfigData.default;
    commandLineArgsStub = {};
    processEnvStub = {};

    const response = private_getNumericConfig(commandLineArgsStub, processEnvStub, portConfigData);
    expect(response).to.equal(port);
  });

  //TODO: test setInitConfiguration function
});
