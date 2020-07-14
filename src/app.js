import React from 'react';
import reactDOM from 'react-dom';
import { css } from 'linaria';
// import './styles/style.scss';

const header = css`
font-size: 96px;
`;

const App = () => {
  return (
    <h1 className={header}>Hello from react</h1>
  )
}

reactDOM.render(<App />, document.getElementById('root'))