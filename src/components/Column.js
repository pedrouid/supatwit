import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledColumn = styled.div`
  width: 100%;
  height: 100%;
  max-width: ${({ maxWidth }) => `${maxWidth}px`};
  margin: 0 auto;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Column = ({ children, maxWidth, ...otherProps }) => (
  <StyledColumn maxWidth={maxWidth} {...otherProps}>
    {children}
  </StyledColumn>
);

Column.propTypes = {
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.number
};

Column.defaultProps = {
  maxWidth: 400
};

export default Column;
