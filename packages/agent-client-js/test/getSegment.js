/*
    Copyright (C) 2017  Stratumn SAS

    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import getAgent from '../src/getAgent';
import agentHttpServer from './utils/agentHttpServer';

describe('#getSegment', () => {

  let closeServer;
  beforeEach(() => agentHttpServer(3333).then(c => { closeServer = c; }));
  afterEach(() => closeServer());

  let agent;
  beforeEach(() =>
    getAgent('http://localhost:3333').then(res => { agent = res; })
  );

  it('gets a segment', () =>
    agent
      .createMap('hi there')
      .then(segment =>
        agent.getSegment(segment.meta.linkHash)
      )
      .then(segment => {
        segment.link.state.title.should.be.exactly('hi there');
      })
  );

  it('rejects if the segment is not found', () =>
    agent
      .getSegment('404')
      .then(() => {
        throw new Error('should not resolve');
      })
      .catch(err => {
        err.status.should.be.exactly(404);
      })
  );

});
