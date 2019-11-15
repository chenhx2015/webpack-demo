// import _ from 'lodash'; // 先用不到了
import { cube } from './math';
import printMe from './print';

import './style.css';
// import Icon from './ali.jpg'; // file-loader 会处理

function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');
    // todo 了解 Lodash 
    // element.innerHTML = _.join(['Hello', 'Webpack'], ' '); // 先用不到了
    element.innerHTML = [
        'Hello webpack!',
        '5 cubed is equal to ' + cube(5)
    ].join('\n\n');

    // element.classList.add('hello');

    // 将图片添加到现有的标签里面 
    // var myIcon = new Image();
    // myIcon.src = Icon;
    // element.appendChild(myIcon);

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
    element.appendChild(btn);

    return element;
}

// document.body.appendChild(component());

let element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
document.body.appendChild(element);

if (module.hot) {
    module.hot.accept('./print.js', function() {
        console.log('Accepting the updated printMe module');
        // printMe();
        document.body.removeChild(element);
        element = component(); // 重新渲染页面后，component 更新 click 事件处理
        document.body.appendChild(element);
    })
}
