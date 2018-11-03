const http = require('http');
/**
 * A tiny adsbexchange request utility.
 * This class should be used when
 * dealing with the current adsbexchange api.
 * This library will be maintained together with the
 * team at ADS-B Exchange. Feel free to make feature requests
 */
class ADSBExchange {
  /**
   * The ADS-B Exchange class constructor function
   * @param {String} apiKey {Required} ADS-B Exchange api key
   * @param {String} baseUrl {Optional} The base url for api
   */
  constructor(apiKey, baseUrl = null) {
    if (apiKey === undefined) throw Error('Api key is a required value');
    if (typeof apiKey !== 'string') {
      throw new TypeError('Api key should be string value');
    }
    this.apiKey = apiKey;
    this.baseUrl = baseUrl || `http://adsbexchange.com/api`;
  }

  /**
   * The request to adsbexchange api data server
   * @param {String} endpoint {Required} One of the avialable
   * endpoints i.e aircraft.
   * @param {String} query {Required} The api query params
   * e.g. /icao/A686AD, /sqk/3522, /json/lat/37.16611/lon/-119.44944/dist/10.
   * @return {Promise} Returns a promise
   */
  request(endpoint, query) {
    this._checkRequestParams(endpoint, query);
    const apiUrl = `${this.baseUrl}/${endpoint}/${query}/key/${this.apiKey}`;
    console.log(apiUrl);
    return this._makeRequest(apiUrl);
  }

  /**
   * An object query request to adsbexchange
   * @param {String} endpoint {Required} One of the avialable
   * endpoints i.e aircraft.
   * @param {Object} query {Required} The api query params in
   * key-value object i.e. {sqk=3522},
   * {json="", lat='37.16611', lon='-119.44944', dist='10'} etc.
   * @return {Promise} Returns a promise.
   */
  reqQuery(endpoint, query) {
    this._checkRequestParams(endpoint, query);
    const queryUrl = _makeQueryUrl(query);
    const apiUrl = `${this.baseUrl}/${endpoint}/${queryUrl}/key/${this.apiKey}`;
    return this._makeRequest(apiUrl);
  }

  _checkRequestParams(endpoint, query) {
    if (!endpoint) throw new Error('Request endpoint missing');
    if (!query) throw new Error('Request query missing');
  }

  _makeQueryUrl(query) {
    const queryParams = [];
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        if (key === 'json') {
          queryParams.push(key);
        } else {
          queryParams.push(key);
          queryParams.push(query[key]);
        }
      }
    }
    return queryParams.toString().replace(/,/g, '/');
  }

  _makeRequest(apiUrl) {
    return new Promise((resolve, reject) => {
      http
        .get(apiUrl, (res) => {
          let buffer = '';
          res.on('data', (chunk) => {
            buffer += chunk;
          });

          res.on('end', () => {
            return resolve(JSON.parse(buffer));
          });
        })
        .on('error', (err) => {
          return reject({error: err.message});
        });
    });
  }
}

module.exports = ADSBExchange;
