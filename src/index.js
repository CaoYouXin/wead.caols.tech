import { Handlers } from './handler';
import { WEAD } from './wead';
import testJSON from './test.json';

console.log(testJSON);

document.getElementById('test').addEventListener('click', new Handlers().msg);

console.log(new WEAD());