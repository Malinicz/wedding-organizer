import React from 'react';
import ReactDOM from 'react-dom';
import { About } from './About';
import * as serviceWorker from '../../serviceWorker';

ReactDOM.render(<About />, document.getElementById('root'));

serviceWorker.unregister();
