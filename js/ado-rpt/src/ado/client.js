'use strict';

const axios = require('axios').default;
const http = require('http');
const https = require('https');

function create(encodedPat, params={}, timeout=10000, maxRedirects=10) {
  return axios.create({
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true }),
    headers: { Authorization: `Basic ${encodedPat}` },
    maxRedirects: maxRedirects,
    params: params,
    timeout: timeout
  });
}

module.exports = { create };
