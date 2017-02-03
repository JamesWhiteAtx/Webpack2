import _ from 'lodash';
import {spitter} from './mod1';
import comp1 from './comp1';
import comp2 from './comp2';
import style from './main.css';

function component () {
  var element = document.createElement('div');
  /* lodash is required for the next line to work */
  element.innerHTML = _.join(['Hey', spitter('Pusscat')], ' ');
  return element;
}

document.body.appendChild(component());
document.body.appendChild(comp1());
document.body.appendChild(comp2());