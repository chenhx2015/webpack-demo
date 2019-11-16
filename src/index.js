import _ from 'lodash';
import './style.css';

function component() {
    var element = document.createElement('div');
    var button = document.createElement('button');
    var br = document.createElement('br');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    button.innerHTML = 'Click me and look at the console!';

    element.appendChild(br);
    element.appendChild(button);
    
    // 懒加载 --> 需要的时候再动态导入进来
    button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
        var print = module.default;
        print();
    })
    return element;
};
document.body.appendChild(component());
