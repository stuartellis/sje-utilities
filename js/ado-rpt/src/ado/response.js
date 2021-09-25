'use strict';

function parse(response) {
  if (response.count > 0 && response.value) {
    return response.value;
  } else {
    return {};
  }
}

module.exports = { parse };
