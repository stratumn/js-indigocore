import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { mount } from 'enzyme';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { AgentInfoPage } from './agentInfoPage';

chai.use(sinonChai);

describe('<AgentInfoPage />', () => {
  it('displays the agent name and url', () => {
    const agentName = 'test';
    const agentUrl = 'http://localhost:3000';
    const agentInfoPage = mount(
      <MemoryRouter>
        <AgentInfoPage name={agentName} url={agentUrl} />
      </MemoryRouter>
    );

    const agentInfo = agentInfoPage.find('p').map(p => p.text());
    expect(agentInfo.includes(agentName)).to.equal(true);
    expect(agentInfo.includes(agentUrl)).to.equal(true);
  });

  it('provides a button to refresh agent', () => {
    const fetchAgentSpy = sinon.spy();
    const agentInfoPage = mount(
      <MemoryRouter>
        <AgentInfoPage
          name="dummy"
          url="http://my.awesome.agent"
          fetchAgent={fetchAgentSpy}
        />
      </MemoryRouter>
    );

    const refreshButton = agentInfoPage.find('button');
    expect(refreshButton.length).to.equal(1);

    refreshButton.simulate('click');
    expect(fetchAgentSpy.callCount).to.equal(1);
    const fetchAgentArgs = fetchAgentSpy.getCall(0).args;
    expect(fetchAgentArgs.length).to.equal(2);
    expect(fetchAgentArgs[0]).to.equal('dummy');
    expect(fetchAgentArgs[1]).to.equal('http://my.awesome.agent');
  });

  it('displays a custom message when agent was not loaded', () => {});
  it('provides a link to the add agent page', () => {});
});
