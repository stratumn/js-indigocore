import request from 'superagent';
import segmentify from './segmentify';
import makeQueryString from './makeQueryString';

export default function findSegments(agent, opts = {}) {
  return new Promise((resolve, reject) => {
    const url = `${agent.url}/segemnts${makeQueryString(opts)}`;

    return request
      .get(url)
      .end((err, res) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(res.body.map(obj => segmentify(agent, obj)));
      });
  });
}
