# adsbexchange-js-utility

# Developers Guide

[![Build Status](https://travis-ci.org/kenigbolo/adsbexchange-js-utility.svg?branch=master)](https://travis-ci.org/kenigbolo/adsbexchange-js-utility)

## Getting Started

+ Clone the application with `git clone https://github.com/kenigbolo/adsbexchange-js-utility.git` or use ssh  `git clone git@github.com:kenigbolo/adsbexchange-js-utility.git`.

## Dependencies

* NPM 6.x
* Node 8.x

## Description

This is a tiny module that allows making requests to the adsbexchange.com api. The npm package exposes a tiny utility class called ADSBExchange. The utility class can be used to leverage making requests to the the adsbexchange api. This utility will be actively maintained in collaboration with the team at ADS-B Exchange to keep it up to date with the information available on [ADS-B Exchange](https://www.adsbexchange.com/data/)

## NPM

This package has been published on [NPM](https://www.npmjs.com/package/adsbexchange-js-utility) and is freely available according to the MIT license. To install via npm simply run `npm install adsbexchange-js-utility` and via yarn `yarn add adsbexchange-js-utility`.

## NPM Package Usage
```javascript

const ADSBExchange = require('adsbexchange-js-utility');
const adsbExchange = new ADSBExchange('put-your-api-key-here');

/* Request based on promise style */
adsbExchange.request('aircraft', 'json').then((response) => {
  // response contains the required data
  console.log(response);
});

/* Request based on async/await style */
const requestData = async () => {
  const response = await adsbExchange.request('aircraft', 'json');
  // response contains the required data
  console.log(response);
}
requestData();
```
The utility returns a resolved or rejected promise.

### Available functions

The utility exposes two core functions `request` and `reqQuery`. Both functions accept two arguments namely `endpoint` and `query` however the methods differ purely on the format of the `query` argument that they take.

`Accepted method arguments`

1. The `endpoint {Required}` - This refers to the endpoint to which the call should be made. The available option at the moment of this writing is `aircraft`. Kindly consult the official [documentation](https://www.adsbexchange.com/data/) for any endpoints not listed here, however the pluggin is flexible to support new endpoints without any changes needed whenever new endpoints are available. This is the same for both the `request` method and the `reqQuery` method.

`Query for request function`

2. The `query {Required}` - The second argument taken by the request function is the `query` params. Kindly visit the official documentation to be sure what values are allowed in query construction. The query should strip (not contain) both the first and last `/` in them e.g. for a request like `https://adsbexchange.com/api/aircraft/json/lat/37.16611/lon/-119.44944/dist/10/` the query part of this request will be `json/lat/37.16611/lon/-119.44944/dist/10` and this is because `aircraft` is considered the endpoint to which the query is required.

`Query for reqQuery function`

3. The `query {Required}` - This refers to a javascript object constructed to match the require params in a `key - value` format. Kindly visit the official documentation to be sure what values are allowed in query construction. The query should be constructed following the order in which they are specified in the api documentation e.g. for a request like below

From [ADS-B Exchange](https://adsbexchange.com/data)
```
https://adsbexchange.com/api/aircraft/json/lat/37.16611/lon/-119.44944/dist/10/
```
will result a `query` params constructed as a javascript key-value pair thus

```javascript
  {json: '', lat: 37.16611, lon: -119.44944, dist: 10}
```
as pointed out, `aircraft` is considered the endpoint. Also fields which are not preceeded with a value e.g. `json`, should be set to an empty string value in the query object.

`Return type`

The return type of the request method is a `Promise` which when resolved holds the data response.

## Future Plans
I am currently volunteering to build open source tools for the team at ADS-B Exchange and will be adding utilities for both `GoLang`, `Ruby` and `Python` in the coming weeks/months/years. If there are any specific features you will like these utilities to have kindly let me know by creating an `issue` using the `Github issue tracker`. I'd be doing my best to help out. Also as an open source tool I'd be more than happy to have more contributors to help out the guys as ADS-B Exchange.

