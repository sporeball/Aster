import fs from 'fs';
import AsterInstance from './aster.js';

const Aster = new AsterInstance();

const input = fs.readFileSync('input.txt', { encoding: 'utf-8' })
  .split('\n')
  .map(line => line.replace(/--.*/gm, '').trim())
  .join('\n')
  .trim();

const tokenTypes = {
  number: /^0|^-?[1-9]\d*/g,
  char: /^'.*?'/g,
  string: /^".*?"/g,
  boolean: /^true|^false/,
  openParen: '(',
  closeParen: ')',
  openBracket: '[',
  closeBracket: ']',
  openAngle: '<',
  closeAngle: '>',
  at: '@',
  colon: ':',
  equals: '=',
  star: '*',
  newline: '\n',
  whitespace: /^\s+/g,
  identifier: /^[a-z]+/g
};

const tokens = Aster.tokenize(input, tokenTypes)
  .filter(token => token.type !== 'whitespace');

console.log(Aster.tokens);
