import React from 'react'
import Routing from './Routing'
import { Amplify, Auth } from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsconfig from './aws-exports';
import AuthContextProvider from './contexts/AuthContext';

Amplify.configure({...awsconfig, Analytics : {disabled : true}});

const App = () => {

  return (
    <div>
      <AuthContextProvider >
        <Routing/>
      </AuthContextProvider>
    </div>
  )
}

export default withAuthenticator(App)