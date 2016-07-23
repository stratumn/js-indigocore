import getAgent from './getAgent';
import segmentify from './segmentify';

export default function fromSegment(obj) {
  return getAgent(obj.meta.agentUrl)
    .then(agent => {
      const segment = segmentify(agent, obj);
      return { agent, segment };
    });
}
