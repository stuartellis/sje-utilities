'use strict';

const URI = require('urijs');
const URITemplate = require('urijs/src/URITemplate');

function fromTemplate(urlTemplate, values) {
  // FIXME: Handle expansion errors
  return URI.expand(urlTemplate, values);
}

module.exports = { fromTemplate };
