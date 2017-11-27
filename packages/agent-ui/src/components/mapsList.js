import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Button from 'material-ui/Button';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table';
import Typography from 'material-ui/Typography';

const MapsList = ({ agent, process, mapIds }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>
          <Typography type="subheading">Process maps:</Typography>
        </TableCell>
        <TableCell />
      </TableRow>
    </TableHead>
    <TableBody>
      {mapIds.map(id => (
        <TableRow key={id} hover>
          <TableCell>
            <Typography
              type="subheading"
              component={NavLink}
              to={`/${agent}/${process}/maps/${id}`}
              style={{ textDecoration: 'none' }}
            >
              {id}
            </Typography>
          </TableCell>
          <TableCell numeric>
            <Button
              component={NavLink}
              to={`/${agent}/${process}/segments?mapIds[]=${id}`}
            >
              View segments
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

MapsList.defaultProps = {
  mapIds: []
};
MapsList.propTypes = {
  agent: PropTypes.string.isRequired,
  process: PropTypes.string.isRequired,
  mapIds: PropTypes.arrayOf(PropTypes.string)
};

export default MapsList;