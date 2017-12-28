/*
  Copyright 2017 Stratumn SAS. All rights reserved.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import MerklePathComponent from './MerklePathComponent';

const BitcoinEvidence = ({ evidence }) => {
  const tx = evidence.proof.txid;
  const evidenceInfo = (
    <div>
      <h4>Bitcoin Transaction</h4>
      <p>
        {tx}
        <a target="_blank" href={`https://blockchain.info/tx/${tx}`}>
          View transaction on Blockchain.info
        </a>
      </p>

      <h4>Merkle root</h4>
      <p>{evidence.proof.batch.merkleRoot}</p>
    </div>
  );

  const evidenceTree = (
    <div className="merkle-path">
      <h4>Merkle Path</h4>
      <MerklePathComponent merklePath={evidence.proof.batch.merklePath} />
    </div>
  );

  return (
    <div>
      <h2>Bitcoin evidence</h2>
      <div className="evidence">
        <div className="info">
          <h4>Chain</h4>
          <p>{evidence.provider}</p>
          {evidenceInfo}
        </div>
        {evidenceTree}
      </div>
    </div>
  );
};

BitcoinEvidence.propTypes = {
  evidence: PropTypes.shape({
    state: PropTypes.string.isRequired,
    provider: PropTypes.String,
    backend: PropTypes.string,
    proof: PropTypes.object
  }).isRequired
};

export default radium(BitcoinEvidence);
