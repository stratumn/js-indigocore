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

import { timestamp } from 'dummy/helpers/timestamp';
import { module, test } from 'qunit';

module('Unit | Helper | timestamp');

test('it works', function(assert) {
  let result = timestamp(1513260611);
  assert.ok(result === 'Thu, 14 Dec 2017 14:10:11 GMT');
});