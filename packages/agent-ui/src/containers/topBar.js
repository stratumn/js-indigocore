import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

const renderTopBarLinks = path => {
  const parts = path.split('/').filter(p => p);
  let currentLink = '';
  return parts.map(p => {
    currentLink += `/${p}`;
    return (
      <span key={p}>
        {' > '}
        <NavLink key={p} to={currentLink}>
          {p}
        </NavLink>
      </span>
    );
  });
};

export const TopBar = ({ path }) => {
  const style = {
    position: 'absolute',
    width: 'calc(100% - 240px)',
    height: '56px',
    marginLeft: '240px',
    borderStyle: 'solid'
  };

  if (!path || path === '/') {
    return <div style={style}>Welcome to the Indigo Framework UI</div>;
  }

  return <div style={style}>{renderTopBarLinks(path)}</div>;
};

TopBar.propTypes = {
  path: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    path: ownProps.location.pathname
  };
}

export default withRouter(connect(mapStateToProps)(TopBar));
