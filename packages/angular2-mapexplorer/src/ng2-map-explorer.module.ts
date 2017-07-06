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

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MdButtonModule } from '@angular2-material/button';
import { MdIconModule } from '@angular2-material/icon';
import { MdProgressCircleModule } from '@angular2-material/progress-circle';
import { MdToolbarModule } from '@angular2-material/toolbar';

import { StMapExplorerComponent } from './st-map-explorer/st-map-explorer.component';
import { FunctionArgumentsPipe } from './function-arguments.pipe';
import { ChainTreeBuilderService } from './chain-tree-builder.service';
import { MapValidatorService } from './map-validator.service';
import { StMapValidatorComponent } from './st-map-validator/st-map-validator.component';
import { StPromiseLoaderComponent } from './st-promise-loader/st-promise-loader.component';
import { StMerklePathTreeComponent } from './st-merkle-path-tree/st-merkle-path-tree.component';

@NgModule({
  declarations: [
    StMapExplorerComponent,
    FunctionArgumentsPipe,
    StMapValidatorComponent,
    StPromiseLoaderComponent,
    StMerklePathTreeComponent
  ],
  imports: [
    BrowserModule,
    MdButtonModule,
    MdIconModule,
    MdProgressCircleModule,
    MdToolbarModule
  ],
  providers: [
    ChainTreeBuilderService,
    MapValidatorService
  ],
  exports: [
    StMapExplorerComponent,
    StMapValidatorComponent,
    StMerklePathTreeComponent
  ]
})
export class Ng2MapExplorerModule { }