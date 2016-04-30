// @flow
'use strict';

export type Action =
    { type: 'AUTHENTICATED', code: string }
  | { type: 'LOADED_CALENDARS' }
  | { type: 'LOADED_EVENTS' }
  | { type: 'TOOK_EVENT', calendarName: string, summary: string, start: Date }
  | { type: 'FREED_EVENT', eventId: string }
  | { type: 'CHANGED_EVENT_SIZE', eventSize: number }
  ;

export type PromiseAction = Promise<Action>;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
export type GetState = () => Object;
