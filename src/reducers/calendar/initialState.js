// @flow
'use strict';

import { Record, List, Map } from 'immutable';

export const Calendar = Record({
  ready : false,
  errors : List(),
  calendarById : Map(),
});

export default new Calendar();
