/*
    Copyright (C) 2017  Stratumn SAS

    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import { Injectable } from '@angular/core';
import { ChainTreeBuilder } from 'mapexplorer-core';

@Injectable()
export class ChainTreeBuilderService {

  constructor() { }

  getBuilder(element) {
    return new ChainTreeBuilder(element);
  }

  build(builder, map, options) {
    return builder.build({
      id: map.mapId,
      application: map.application,
      chainscript: map.chainscript
    }, options);
  }
}
