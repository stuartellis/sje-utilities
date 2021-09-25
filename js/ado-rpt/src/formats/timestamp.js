'use strict';

function asPath(dt) {
  return [
    dt.getUTCFullYear(),
    dt.getUTCMonth(),
    dt.getUTCDate(),
    dt.getUTCHours(),
    dt.getUTCMinutes()
  ].join('/');
}

function asString(dt) {
  return [
    dt.getUTCFullYear(),
    dt.getUTCMonth(),
    dt.getUTCDate(),
    dt.getUTCHours(),
    dt.getUTCMinutes()
  ].join('');
}

module.exports = { asPath, asString };
