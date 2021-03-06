/*
  Copyright 2016-2018 Stratumn SAS. All rights reserved.

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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FifoArray from 'fifo-array';
import Feed from '../components/Feed';
import TMReader from '../TMReader';

export default class FeedContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.reader = this.context.reader;
    this.state = {
      blocks: new FifoArray(this.props.maxBlocks),
      transactions: new FifoArray(this.props.maxTransactions)
    };

    this.handleBlock = this.handleBlock.bind(this);
  }

  componentDidMount() {
    this.reader.subscribe(this.handleBlock);
  }

  componentWillUnmount() {
    this.reader.unsubscribe(this.handleBlock);
  }

  handleBlock(block) {
    this.setState(prevState => {
      if (block.data) {
        prevState.transactions.push(...block.data.txs);
        prevState.blocks.push(block);
      }
      return prevState;
    });
  }

  render() {
    return (
      <Feed blocks={this.state.blocks} transactions={this.state.transactions} />
    );
  }
}

FeedContainer.contextTypes = {
  reader: PropTypes.instanceOf(TMReader)
};

FeedContainer.defaultProps = {
  maxBlocks: 5,
  maxTransactions: 5
};

FeedContainer.propTypes = {
  maxBlocks: PropTypes.number,
  maxTransactions: PropTypes.number
};
