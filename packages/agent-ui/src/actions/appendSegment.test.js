import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import * as StratumnAgentClient from '@stratumn/agent-client';

import {
  appendSegment,
  closeDialog,
  closeDialogAndClear,
  openDialog,
  selectAction
} from './appendSegment';

import * as notifications from '../utils/notificationHelpers';

import {
  TestStateBuilder,
  TestProcessBuilder,
  TestAgentBuilder
} from '../test/builders/state';

import * as actionTypes from '../constants/actionTypes';

chai.use(sinonChai);

describe('open action', () => {
  let dispatchSpy;
  let getStateStub;

  beforeEach(() => {
    dispatchSpy = sinon.spy();
    getStateStub = sinon.stub();
  });

  it('finds process actions from agent and process name', () => {
    const process = new TestProcessBuilder('p')
      .withAction('message', ['author', 'text'])
      .build();
    getStateStub.returns(
      new TestStateBuilder()
        .withAgent('a', new TestAgentBuilder().build())
        .withAgent('aa', new TestAgentBuilder().withProcess(process).build())
        .withKey({ pem: 'testPEM' })
        .withSelectedMapExplorerSegment('lh', 'p')
        .build()
    );

    openDialog('aa', 'p')(dispatchSpy, getStateStub);
    expect(getStateStub.callCount).to.equal(1);
    expect(dispatchSpy.callCount).to.equal(1);
    expect(dispatchSpy.getCall(0).args[0]).to.deep.equal({
      type: actionTypes.APPEND_SEGMENT_DIALOG_OPEN,
      agent: 'aa',
      process: 'p',
      actions: process.actions,
      parent: 'lh',
      key: { pem: 'testPEM' }
    });
  });

  it('removes the init action if present', () => {
    const process = new TestProcessBuilder('p')
      .withAction('init', ['title'])
      .withAction('message', ['author', 'text'])
      .build();
    getStateStub.returns(
      new TestStateBuilder()
        .withAgent('a', new TestAgentBuilder().withProcess(process).build())
        .withSelectedMapExplorerSegment('lh', 'p')
        .build()
    );

    openDialog('a', 'p')(dispatchSpy, getStateStub);
    expect(dispatchSpy.callCount).to.equal(1);
    expect(dispatchSpy.getCall(0).args[0].actions).to.deep.equal({
      message: { args: ['author', 'text'] }
    });
  });

  it('does not dispatch anything for invalid agent/process', () => {
    getStateStub.returns(
      new TestStateBuilder()
        .withAgent('a', new TestAgentBuilder().build())
        .withSelectedMapExplorerSegment('lh', 'unknownProcess')
        .build()
    );

    openDialog('a', 'unknownProcess')(dispatchSpy, getStateStub);
    expect(getStateStub.callCount).to.equal(1);
    expect(dispatchSpy.callCount).to.equal(0);
  });

  it('dispatches error when parent segment is not selected', () => {
    const p1 = new TestProcessBuilder('p1')
      .withAction('message', ['author', 'text'])
      .build();

    const p2 = new TestProcessBuilder('p2')
      .withAction('message', ['author', 'text'])
      .build();

    getStateStub.returns(
      new TestStateBuilder()
        .withAgent(
          'a',
          new TestAgentBuilder()
            .withProcess(p1)
            .withProcess(p2)
            .build()
        )
        .withSelectedMapExplorerSegment('lh', 'p1')
        .build()
    );

    openDialog('a', 'p2')(dispatchSpy, getStateStub);
    expect(getStateStub.callCount).to.equal(1);
    expect(dispatchSpy.callCount).to.equal(1);
    expect(dispatchSpy.getCall(0).args[0].type).to.equal(
      actionTypes.APPEND_SEGMENT_DIALOG_MISSING_PREVIOUS
    );
  });
});

describe('close action', () => {
  it('clears agent and process names, process actions', () => {
    const action = closeDialog();
    expect(action).to.deep.equal({
      type: actionTypes.APPEND_SEGMENT_DIALOG_CLOSE
    });
  });
});

describe('closeAndClear action', () => {
  it('dispatch clear and close actions', () => {
    const dispatchSpy = sinon.spy();
    closeDialogAndClear()(dispatchSpy);
    expect(dispatchSpy.callCount).to.deep.equal(3);
    expect(dispatchSpy.getCall(0).args[0].type).to.equal(
      actionTypes.APPEND_SEGMENT_CLEAR
    );
    expect(dispatchSpy.getCall(1).args[0].type).to.equal(
      actionTypes.CLEAR_SIGNED_ATTRIBUTES
    );
    expect(dispatchSpy.getCall(2).args[0].type).to.equal(
      actionTypes.APPEND_SEGMENT_DIALOG_CLOSE
    );
  });
});

describe('selectAction action', () => {
  it('contains action name', () => {
    const action = selectAction('message');
    expect(action).to.deep.equal({
      type: actionTypes.APPEND_SEGMENT_DIALOG_SELECT_ACTION,
      action: 'message'
    });
  });
});

describe('appendSegment action', () => {
  let stratumnClientStub;
  let getSegmentStub;
  let dispatchSpy;
  let getStateStub;
  let testRefs;
  let makeNewSegmentNotificationStub;
  let testKey;
  let signedAttributes;

  beforeEach(() => {
    dispatchSpy = sinon.spy();

    getSegmentStub = sinon.stub();
    stratumnClientStub = sinon.stub(StratumnAgentClient, 'getAgent');
    stratumnClientStub.resolves({
      getProcess: () => ({
        getSegment: getSegmentStub
      })
    });

    testRefs = [
      { process: 'a', linkHash: 'b' },
      { process: 'c', linkHash: 'd' }
    ];

    testKey = {
      type: 'keytype',
      secret: 'secret',
      public: 'public',
      pem: 'testPEM'
    };

    signedAttributes = {
      inputs: true
    };

    getStateStub = sinon.stub();
    getStateStub.returns({
      agents: { a: { url: '' } },
      appendSegment: {
        dialog: {
          show: true,
          agent: 'a',
          process: 'p',
          parent: 'l',
          actions: {
            ack: { args: [] },
            send: { args: ['author', 'message'] }
          },
          selectedAction: 'send'
        }
      },
      key: testKey,
      signedAttributes: signedAttributes,
      selectRefs: {
        refs: testRefs
      }
    });

    makeNewSegmentNotificationStub = sinon.stub(
      notifications,
      'makeNewSegmentNotification'
    );
  });

  afterEach(() => {
    stratumnClientStub.restore();
    makeNewSegmentNotificationStub.restore();
  });

  const verifyDispatchedActions = expectedActionTypes => {
    expect(dispatchSpy.callCount).to.equal(expectedActionTypes.length);
    for (let i = 0; i < expectedActionTypes.length; i += 1) {
      expect(dispatchSpy.getCall(i).args[0].type).to.equal(
        expectedActionTypes[i]
      );
    }
  };

  it('dispatches a failure action on failure', () => {
    getSegmentStub.rejects('Unreachable');

    return appendSegment(['bob', 'loves pancakes'])(
      dispatchSpy,
      getStateStub
    ).then(() => {
      verifyDispatchedActions([
        actionTypes.APPEND_SEGMENT_REQUEST,
        actionTypes.APPEND_SEGMENT_FAILURE
      ]);
    });
  });

  it('closes dialog on success', () => {
    const segmentSendActionSpy = sinon.spy();
    const withRefsSpy = sinon
      .stub()
      .onCall(0)
      .returns({
        send: segmentSendActionSpy
      });

    const signSpy = sinon
      .stub()
      .onCall(0)
      .returns({
        withRefs: withRefsSpy
      });

    const withKeySpy = sinon
      .stub()
      .onCall(0)
      .returns({
        sign: signSpy
      });

    getSegmentStub.resolves({
      withRefs: withRefsSpy,
      withKey: withKeySpy,
      sign: signSpy
    });

    return appendSegment('jim', 'hates pancakes')(
      dispatchSpy,
      getStateStub
    ).then(() => {
      expect(getStateStub.callCount).to.equal(1);

      expect(getSegmentStub.callCount).to.equal(1);
      expect(getSegmentStub.getCall(0).args).to.deep.equal(['l']);

      expect(segmentSendActionSpy.callCount).to.equal(1);
      expect(segmentSendActionSpy.getCall(0).args).to.deep.equal([
        'jim',
        'hates pancakes'
      ]);

      expect(withRefsSpy.callCount).to.equal(1);
      expect(withRefsSpy.getCall(0).args[0]).to.deep.equal(testRefs);

      expect(withKeySpy.callCount).to.equal(1);
      expect(withKeySpy.getCall(0).args[0]).to.deep.equal(testKey.pem);

      expect(signSpy.callCount).to.equal(1);
      expect(signSpy.getCall(0).args[0]).to.deep.equal(signedAttributes);

      verifyDispatchedActions([
        actionTypes.APPEND_SEGMENT_REQUEST,
        actionTypes.APPEND_SEGMENT_SUCCESS,
        actionTypes.APPEND_SEGMENT_DIALOG_CLOSE,
        actionTypes.SELECT_REFS_CLEAR,
        actionTypes.CLEAR_SIGNED_ATTRIBUTES,
        actionTypes.ADD_NOTIFICATIONS
      ]);
    });
  });
});
