import console from 'console';
import CSSparser from './CSSparser.js';

const firstParse = CSSparser.parse({
    left: '10px',
    transform: 'translate(100px, 50%) scale(1.5) rotate(360deg)'
});

console.log(firstParse.formatted);