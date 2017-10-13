import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class ProcessInfoPage extends Component {
  render() {
    const process = this.props.process;
    if (!process || !process.name) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>{process.name}</h1>
        <ActionsSection actions={process.processInfo.actions} />
        <hr />
        <StoreSection storeAdapter={process.storeInfo.adapter} />
        <hr />
        <FossilizersSection fossilizers={process.fossilizersInfo} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  let process = {};
  if (state.agentInfo) {
    if (state.agentInfo.processes[ownProps.params.process]) {
      process = state.agentInfo.processes[ownProps.params.process];
    }
  }
  return { process };
}

ProcessInfoPage.propTypes = {
  process: PropTypes.object.isRequired
};

export const StoreSection = ({ storeAdapter }) => (
  <div>
    <h3>Store</h3>
    <p>
      <small>
        A store is responsible for saving your data. There are different
        adapters available depending on your needs.
      </small>
    </p>
    <h4>Store adapter name</h4>
    <samp>{storeAdapter.name}</samp>
    <h4>Store adapter version</h4>
    <samp>{storeAdapter.version}</samp>
    <h4>Store adapter commit</h4>
    <samp>{storeAdapter.commit}</samp>
    <h4>Store adapter description</h4>
    <samp>{storeAdapter.description}</samp>
  </div>
);

StoreSection.propTypes = {
  storeAdapter: PropTypes.object.isRequired
};

function formatActionSignature(action, args) {
  let signature = action + '(';
  for (let i = 0; args && i < args.length; ++i) {
    signature += args[i];
    if (i < args.length - 1) {
      signature += ', ';
    }
  }
  signature += ')';
  return signature;
}

export const ActionsSection = ({ actions }) => (
  <div>
    <h3>Actions</h3>
    <ul>
      {Object.keys(actions).map(action => (
        <li key={action}>
          <samp>{formatActionSignature(action, actions[action].args)}</samp>
        </li>
      ))}
    </ul>
    <p>
      <small>
        These are the procedures that define how segments are added to your
        maps.
      </small>
    </p>
  </div>
);

ActionsSection.propTypes = {
  actions: PropTypes.object
};

export const FossilizersSection = ({ fossilizers }) => (
  <div>
    <h3>Fossilizer</h3>
    <p>
      <small>
        A fossilizer adds the steps of your workflow to a timeline, such as a
        Blockchain or a trusted timestamping authority.
      </small>
    </p>
    {!fossilizers && <p>Your agent is not connected to fossilizers.</p>}
    {fossilizers &&
      fossilizers.length && (
        <ul>
          {fossilizers.map(fossilizer => (
            <li key={fossilizer.adapter.name}>
              <h4>
                Fossilizer:
                <samp>{fossilizer.adapter.name}</samp>
              </h4>
              <h4>
                Adapter version:
                <samp>{fossilizer.adapter.version}</samp>
              </h4>
              <h4>
                Adapter commit:
                <samp>{fossilizer.adapter.commit}</samp>
              </h4>
              <h4>
                Adapter description:
                <samp>{fossilizer.adapter.description}</samp>
              </h4>
              <h4>
                Adapter blockchain
                <samp>{fossilizer.adapter.blockchain}</samp>
              </h4>
            </li>
          ))}
        </ul>
      )}
  </div>
);

FossilizersSection.propTypes = {
  fossilizers: PropTypes.array
};

export default connect(mapStateToProps)(ProcessInfoPage);