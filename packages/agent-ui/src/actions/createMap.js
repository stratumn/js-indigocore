import { getAgent } from '@stratumn/agent-client';
import { getSegmentSuccess, clearRefs, clearSignature } from './';
import * as actionTypes from '../constants/actionTypes';
import history from '../store/history';

const createMapRequest = () => ({
  type: actionTypes.CREATE_MAP_REQUEST
});

const createMapFailure = error => ({
  type: actionTypes.CREATE_MAP_FAILURE,
  error
});

const createMapSuccess = () => ({
  type: actionTypes.CREATE_MAP_SUCCESS
});

const createMapClear = () => ({
  type: actionTypes.CREATE_MAP_CLEAR
});

export const openCreateMapDialog = (agentName, processName) => (
  dispatch,
  getState
) => {
  const { agents, key } = getState();
  if (agents[agentName] && agents[agentName].processes[processName]) {
    const { actions } = agents[agentName].processes[processName];
    if (actions.init) {
      dispatch({
        type: actionTypes.CREATE_MAP_DIALOG_OPEN,
        agent: agentName,
        process: processName,
        args: actions.init.args,
        key: key
      });
    }
  }
};

export const closeCreateMapDialog = () => ({
  type: actionTypes.CREATE_MAP_DIALOG_CLOSE
});

export const closeCreateMapDialogAndClear = () => dispatch => {
  dispatch(createMapClear());
  dispatch(closeCreateMapDialog());
  dispatch(clearRefs());
  dispatch(clearSignature());
};

export const createMap = (...args) => (dispatch, getState) => {
  dispatch(createMapRequest());
  const {
    agents,
    key,
    signedAttributes,
    selectRefs: { refs },
    createMap: { dialog: { agent, process } }
  } = getState();
  if (agents[agent]) {
    const { url } = agents[agent];
    return getAgent(url)
      .then(a => {
        let proc = a.getProcess(process);
        if (
          key &&
          key.pem &&
          Object.keys(signedAttributes).filter(Boolean).length > 0
        ) {
          proc = proc.withKey(key.pem).sign(signedAttributes);
        }
        return proc.withRefs(refs).createMap(...args);
      })
      .then(segment => {
        if (segment && segment.key) {
          delete segment.key;
        }
        dispatch(createMapSuccess());
        dispatch(clearRefs());
        dispatch(clearSignature());
        dispatch(closeCreateMapDialog());
        dispatch(getSegmentSuccess(segment));
        history.push(`/${agent}/${process}/segments/${segment.meta.linkHash}`);
      })
      .catch(err => {
        dispatch(createMapFailure(err));
      });
  }
  return dispatch(createMapFailure(`Can't find url for agent ${agent}`));
};
