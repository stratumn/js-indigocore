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

import create from '../../src/create';
import memoryStore from '../../src/memoryStore';

export default function(plugin, assertions1) {
  const assertions = Object.assign(
    {
      '#init()': () => {},
      '#action()': () => {},
      '#createMap()': () => {},
      '#createSegment()': () => {}
    },
    assertions1
  );

  const actions = {
    init(a, b, c) {
      assertions['#init()'](this);
      this.state = { a, b, c };
      this.append();
    },
    action(d) {
      assertions['#action()'](this);
      this.state.d = d;
      this.append();
    }
  };

  describe(`Agent With Plugin ${plugin.name}`, () => {
    let agent;
    let process;

    beforeEach(() => {
      agent = create(actions, memoryStore(), null, {
        agentUrl: 'http://localhost'
      });
      process = agent.addProcess('basic', actions, memoryStore(), null, {
        plugins: [plugin]
      });
    });
    afterEach(() => {
      delete actions.events;
    });

    describe('#createMap()', () => {
      it('creates a Map', () =>
        process.createMap([], [], 1, 2, 3).then(assertions['#createMap()']));
    });

    describe('#createSegment()', () => {
      it('creates a segment', () =>
        process
          .createMap(null, null, 1, 2, 3)
          .then(segment1 =>
            process
              .createSegment(segment1.meta.linkHash, 'action', [], [], 4)
              .then(assertions['#createSegment()'])
          ));
    });
  });
}
