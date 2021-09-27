'use strict';

function encode(token) {
  const tokenWithEmptyUsername = `:${token}`;
  const buffer = Buffer.from(tokenWithEmptyUsername, 'utf-8');
  return buffer.toString('base64');
}

module.exports = { encode };
