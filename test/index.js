process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;
const ADSBExchange = require('../index');

/*
* Test the Utility functionality
*/
describe('Use utility class to make request', () => {
  const adsbExchange = new ADSBExchange('some-random-api-key');
  it('it should have an api key in the object', (done) => {
    expect(adsbExchange.apiKey).to.equal('some-random-api-key');
    done();
  });

  it('it should have a default base url when none is provided', (done) => {
    expect(adsbExchange.baseUrl).to.equal('http://adsbexchange.com/api');
    done();
  });

  it('it should have an error when api key is invalid', (done) => {
    adsbExchange.request('aircraft', 'json').then((response) => {
      expect(response.ERR).to.equal('NO API KEY');
    });
    done();
  });

  it('it should have an error when endpoint is missing', (done) => {
    const request = () => {
      adsbExchange.request();
    };
    expect(request).to.throw(Error, 'Request endpoint missing');
    done();
  });

  it('it should have an error when query is missing', (done) => {
    const request = () => {
      adsbExchange.request('airport');
    };
    expect(request).to.throw(Error, 'Request query missing');
    done();
  });

  it('throws type error when api key is not a string', (done) => {
    const adbsExchange = () => {
      new ADSBExchange(2673843734);
    };
    expect(adbsExchange).to.throw(TypeError, 'Api key should be string value');
    done();
  });

  it('throws error when api key is not provided', (done) => {
    const adbsExchange = () => {
      new ADSBExchange();
    };
    expect(adbsExchange).to.throw(Error, 'Api key is a required value');
    done();
  });
});

