import { expect, assert } from 'chai'
import { event } from '../reducers'
import * as actions from '../actions'
import { getSlotsResult } from './reducers.mocks'

const makeReadyAction = actions.makeReadyAction;

// Tests

describe('event reducer', () => {

  // initial state
  
  it('should empty at the beginning', () => {
    const action = undefined;
    const events = event(undefined, action);
    const empty = {};
    expect(events).to.be.deep.equal(empty);
  })

  // loading events

  it('should change to loading', () => {
    const ready = false;
    const action = makeReadyAction(actions._getEvents(), ready);
    // console.log(JSON.st)
    const events = event(undefined, action);
    const notReady = {ready};
    expect(events).to.be.deep.equal(notReady);
  })

  it('should set errors', () => {
    const ready = true;
    const errors = [{ message : 'error' }];
    const action = makeReadyAction(actions._getEvents(), ready, undefined, errors);
    const events = event(undefined, action);
    const readyWithError = {ready, errors};
    expect(events).to.be.deep.equal(readyWithError);
  })

  it('should process remote data', () => {
    const ready = true;
    const result = getSlotsResult;
    const action = makeReadyAction(actions._getEvents(), ready, result);

    // TODO: Add more checks.
    const evalEvent = event(undefined, action);
    expect(evalEvent.slotIdx).to.be.deep.equal([1444415400000, 1444424400000]);
    expect(evalEvent.ready).to.be.equal(ready);
    // expect(evalEvent).to.be.deep.equal({});
  });
  
  // taking events
  
  it('should start taking an event', () => {
    const action0 = makeReadyAction(actions._getEvents(), true, getSlotsResult);
    const evalEvent0 = event(undefined, action0);

    const ready = false;
    const resourceId = "medallia.com_3339353632343333323839@resource.calendar.google.com";
    const slotId = "1444424400000";
    const eventId = resourceId+"|"+slotId;
    const action = makeReadyAction(actions._takeEvent(eventId), ready);
    const evalEvent = event(evalEvent0, action);
    const event0 = evalEvent.eventById[eventId];    
    
    expect(event0.ready).to.be.equal(ready);
  });

  it('should handle errors while taking an event', () => {
    const action0 = makeReadyAction(actions._getEvents(), true, getSlotsResult);
    const evalEvent0 = event(undefined, action0);

    const ready = true;
    const errors = [{ message : 'error' }];
    const eventId = "medallia.com_3339353632343333323839@resource.calendar.google.com|1444424400000";
    const action = makeReadyAction(actions._takeEvent(eventId), ready, undefined, errors);
    const evalEvent = event(evalEvent0, action);
    const event0 = evalEvent.eventById[eventId];    
    
    expect(event0.ready).to.be.equal(ready);
    expect(event0.errors).to.be.deep.equal(errors);
  });

  it('should complete taking an event', () => {
    const action0 = makeReadyAction(actions._getEvents(), true, getSlotsResult);
    const evalEvent0 = event(undefined, action0);

    const ready = true;
    const result = { eventId : 'realEventId' };
    const eventId = "medallia.com_3339353632343333323839@resource.calendar.google.com|1444424400000";
    const action = makeReadyAction(actions._takeEvent(eventId), ready, result);
    const evalEvent = event(evalEvent0, action);
    const event0 = evalEvent.eventById[eventId];    
    
    expect(event0.ready).to.be.equal(ready);
    expect(event0.errors).to.be.undefined;
    expect(event0.serverId).to.be.equal(result.eventId);
    expect(evalEvent).to.be.not.equal(evalEvent0);
  });
  
  // releasing events
  
});

