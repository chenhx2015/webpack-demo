// import _ from 'lodash'; // 先用不到了

import './style.css';
// import Icon from './ali.jpg'; // file-loader 会处理

function component() {
    var element = document.createElement('div');
    element.innerHTML = join(['Hello', 'webpack'], ' ');
    return element;
}

document.body.appendChild(component());
