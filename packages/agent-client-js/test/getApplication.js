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

// Deprecated.
import getApplication from '../src/getApplication';
import config from '../src/config';
import agentHttpServer from './utils/agentHttpServer';

config.applicationUrl = 'http://localhost:3333';

describe('#getApplication', () => {

  let closeServer;
  beforeEach(() => agentHttpServer(3333).then(c => { closeServer = c; }));
  afterEach(() => closeServer());

  it('loads an application', () =>
    getApplication('test')
      .then(agent => {
        agent.url.should.be.exactly('http://localhost:3333');
        Object.keys(agent.processes).length.should.be.exactly(3);
        agent.processes.first_process.storeInfo.adapter.name.should.be.exactly('memory');
      })
  );

});
