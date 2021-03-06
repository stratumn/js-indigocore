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

import WebSocket from 'ws';
import request from 'superagent';
import EventEmitter from 'events';
import handleResponse from './handleResponse';

/**
 * Creates a fossilizer HTTP client.
 * @param {string} url - the base URL of the fossilizer
 * @returns {Client} a fossilizer HTTP client
 */
export default function fossilizerHttpClient(url) {
  // Web socket URL.
  const wsUrl = `${url.replace(/^http/, 'ws')}/websocket`;

  // Web socket instance.
  let ws = null;

  // Use event emitter instance as base object.
  const emitter = new EventEmitter();

  function connect(reconnectTimeout) {
    ws = new WebSocket(wsUrl);
    ws.on('open', emitter.emit.bind(emitter, 'open'));
    ws.on('close', (...args) => {
      ws.removeAllListeners();
      emitter.emit('close', ...args);
      setTimeout(connect.bind(null, reconnectTimeout), reconnectTimeout);
    });
    ws.on('error', emitter.emit.bind(emitter, 'error'));
    ws.on('message', str => {
      // Emit both event for message and event for message type.
      const event = JSON.parse(str);
      emitter.emit('event', event);
    });
  }

  return Object.assign(emitter, {
    /**
     * Gets information about the fossilizer.
     * @returns {Promise} a promise that resolve with the information
     */
    getInfo() {
      return new Promise((resolve, reject) => {
        request.get(`${url}/`).end((err, res) =>
          handleResponse(err, res)
            .then(resolve)
            .catch(reject)
        );
      });
    },

    /**
     * Connects to the web socket and starts emitting events.
     * @param {number} reconnectTimeout - time to wait to reconnect in milliseconds
     */
    connect(reconnectTimeout) {
      if (ws) {
        return;
      }
      connect(reconnectTimeout);
    },

    /**
     * Fossilizes data.
     * @param {Buffer} data - the data to fossilize
     * @param {string} process - the name of the process from which the data is from
     * @returns {Promise} a promise that resolves with the response body
     */
    fossilize(data, process) {
      return new Promise((resolve, reject) => {
        request
          .post(`${url}/fossils`)
          .type('form')
          .send({ data, process })
          .end((err, res) =>
            handleResponse(err, res)
              .then(resolve)
              .catch(reject)
          );
      });
    }
  });
}
