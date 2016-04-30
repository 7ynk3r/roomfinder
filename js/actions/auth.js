// @flow
'use strict';

import secret from '../config/secret'
import googleapi from '../lib/googleapi'
import type { Action, ThunkAction, PromiseAction, Dispatch } from './types';

async function ParseFacebookLogin(scope): Promise {
}

function _authenticate(code: string): Action {
  return {
    type: 'AUTHENTICATED',
    code
  };
}

async function authenticate(code:string): PromiseAction {
  await googleapi.authenticate(
    code,
    secret.google.client_id,
    secret.google.client_secret
  );
  return _authenticate(code);
}

export { authenticate }
