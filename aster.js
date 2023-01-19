/*
  aster.js
  copyright (c) 2023 sporeball
  MIT license
*/

import escapeStringRegexp from 'escape-string-regexp';

// const Aster = new AsterInstance();
export default class AsterInstance {
  tokenize (input, tokenTypes) {
    let tokens = [];
    while (input.length > 0) {
      const token = Object.entries(tokenTypes)
        .map(entry => {
          let [type, matcher] = entry;
          if (typeof matcher === 'string') {
            matcher = '^' + escapeStringRegexp(matcher);
          }
          const match = (input.match(matcher) || [])[0];
          if (match !== undefined) {
            return {
              type,
              value: match
            };
          }
          return undefined;
        })
        .find(token => token !== undefined);
      if (token === undefined) {
        throw new Error('Aster: no matching token type found');
      }
      tokens.push(token);
      input = input.slice(token.value.length);
    }
    this.tokens = tokens;
    return this.tokens;
  }
}
