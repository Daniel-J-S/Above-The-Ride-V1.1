// TODO: uncomment once ready for prod: import React from 'react';
// TODO: uncomment once ready for prod: import Layout from './src/components/layout';
import './src/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import './src/css/style.css';

export const onServiceWorkerUpdateReady = () => {
    const answer = window.confirm(
      `This application has been updated. ` +
        `Reload to display the latest version?`
    );
  
    if (answer === true) {
      window.location.reload();
    }
};


// TODO: uncomment when ready for production
// export const wrapPageElement = ({ element, props }) => {
//   return <Layout {...props}>{element}</Layout>;
// }