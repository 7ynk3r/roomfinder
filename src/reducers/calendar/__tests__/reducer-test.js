'use strict';

import '../../../_auto_mock_off';
import logJSON from '../../../logJSON';

import calendar from '../reducer';
import { _getEvents, _takeEvent, _freeEvent } from '../actions';
import { _makeReadyAction } from '../../common/actions';
import { getSlotsResult } from '../../../__mocks__/googleapi.js';

// Some states useful for testing.
const calendar0 = calendar()
const calendar4 = calendar(calendar0, _makeReadyAction(_getEvents(), true, getSlotsResult));

describe('calendar reducer', () => {

  // initial state
  
  it('should not be ready at the beginning', () => {
    const { ready } = calendar0;
    expect(ready).toEqual(false);
  })

  // loading events

  it('should change to loading', () => {
    const ready = false;
    const action = _makeReadyAction(_getEvents(), ready);

    const calendar1 = calendar(calendar0, action);

    expect(calendar1.ready).toEqual(ready);
  })

  it('should set errors', () => {
    const ready = true;
    const errors = [{ message : 'error' }];
    const action = _makeReadyAction(_getEvents(), ready, undefined, errors);

    const calendar2 = calendar(calendar0, action);

    expect(calendar2.ready).toEqual(ready);
    expect(calendar2.errors.toJSON()).toEqual(errors);    
  })

  it('should process remote data', () => {
    const ready = true;
    const result = getSlotsResult;
    const action = _makeReadyAction(_getEvents(), ready, result);

    // TODO: Add more checks.
    const calendar3 = calendar(undefined, action);

    expect(calendar3.ready).toEqual(ready);
    expect(calendar3.slotIdx.toJSON()).toEqual([1444415400000, 1444424400000]);
    // expect(calendar3.toJSON()).toEqual({});
  });
  
  // // taking events
  
  it('should start taking an event', () => {
    const ready = false;
    const resourceId = "medallia.com_3339353632343333323839@resource.calendar.google.com";
    const slotId = "1444424400000";
    const eventId = resourceId+"|"+slotId;
    const action = _makeReadyAction(_takeEvent(eventId), ready);

    const calendar5 = calendar(calendar4, action);

    const event0 = calendar5.eventById.get(eventId);
    expect(event0.ready).toEqual(ready);
  });

  it('should handle errors while taking an event', () => {
    const ready = true;
    const errors = [{ message : 'error' }];
    const resourceId = "medallia.com_3339353632343333323839@resource.calendar.google.com";
    const slotId = "1444424400000";
    const eventId = resourceId+"|"+slotId;
    const action = _makeReadyAction(_takeEvent(eventId), ready, undefined, errors);

    const calendar5 = calendar(calendar4, action);

    const event0 = calendar5.eventById.get(eventId);
    expect(event0.ready).toEqual(ready);
    expect(event0.errors.toJSON()).toEqual(errors);
  });

  it('should complete taking an event', () => {
    const ready = true;
    const result = { eventId : 'realEventId' };
    const resourceId = "medallia.com_3339353632343333323839@resource.calendar.google.com";
    const slotId = "1444424400000";
    const eventId = resourceId+"|"+slotId;
    const action = _makeReadyAction(_takeEvent(eventId), ready, result);

    const calendar5 = calendar(calendar4, action);

    const event0 = calendar5.eventById.get(eventId);    
    expect(event0.ready).toEqual(ready);
    expect(event0.errors.toJSON()).toEqual([]);
    expect(event0.serverId).toEqual(result.eventId);
  });
  
  // releasing events
  
});

