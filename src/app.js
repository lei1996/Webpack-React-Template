import React from 'react';
import reactDOM from 'react-dom';
import { css } from 'linaria';
// import './styles/style.scss';
import avatar from './assets/img/0.jpg';

const header = css`
font-size: 96px;
`;

console.log('dev模式才会显示该console.log');

const App = () => {
  return (
    <h1 className={header}>Hello from react
    <img src={avatar} />
    </h1>
  )
}

reactDOM.render(<App />, document.getElementById('root'))