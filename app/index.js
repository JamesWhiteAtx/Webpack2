import _ from 'lodash';
import {splitter} from './mod1';
import style from './main.css';

function component () {
  var element = document.createElement('div');

  /* lodash is required for the next line to work */
  element.innerHTML = _.join(['Hey', splitter('Pusscat')], ' ');
  

  return element;
}

document.body.appendChild(component());