import './index.css'
// const { sum,sub } =require('./math.js'); common js 문법
import{sum,sub} from './math.js';
import flight from './img/flight.png';
console.log(sum(10,20));
console.log(sub(10,20));
console.log(VERSION);
console.log(api.domain);

document.addEventListener('DOMContentLoaded',()=>{
	document.querySelector('.sample').innerHTML = `<img src="${flight}">&nbsp`+
	document.querySelector('.sample').innerHTML;
	//document.querySelector('.sample').innerHTML =document.querySelector('.sample').innerHTML + `<img src="${flight}">`; 위와 같은 표현
})