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

import { Component, Input, ElementRef } from "@angular/core";

@Component({
  selector: "st-tmpop-evidence",
  templateUrl: "./st-tmpop-evidence.component.html",
  styleUrls: ["./st-tmpop-evidence.component.css"],
})
export class StTmpopEvidenceComponent {
  @Input() evidence;

  constructor(public element: ElementRef) {}

  date() {
    return new Date(this.evidence.proof.header.time * 1000).toUTCString();
  }
}