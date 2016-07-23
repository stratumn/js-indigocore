import request from 'superagent';
import segmentify from './segmentify';

export default function createMap(agent, ...args) {
  return new Promise((resolve, reject) => {
    const url = `${agent.url}/segments`;

    return request
      .post(url)
      .send(args)
      .end((err, res) => {
        const error = err || (res.body.meta && res.body.meta.errorMessage);
        if (error) {
          reject(error);
          return;
        }

        resolve(segmentify(agent, res.body));
      });
  });
}
