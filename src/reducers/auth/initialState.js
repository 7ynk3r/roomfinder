'use strict';

import logJSON from '../../logJSON';
import _ from 'underscore';
import XDate from 'xdate'
import { Record, List, Map } from 'immutable';

// Records

const Authentication = Record({
  ready : false,
  errors : List(),
  authenticated : false,
});

const initialState = new Authentication();

export default Authentication;