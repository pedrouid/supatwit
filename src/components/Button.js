import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, fonts, transitions } from '../styles';

const StyledButton = styled.button`
  transition: ${transitions.base};
  border: none;
  border-style: none;
  box-sizing: border-box;
  border: ${({ outline, color }) => (outline ? `1px solid rgb(${color})` : 'none')};
  border-color: ${({ outline, white, color }) => {
    if (outline && white) {
      return `rgb(${colors.white})`;
    } else if (white) {
      return `rgb(${color})`;
    }
    return `rgb(${color})`;
  }};
  background-color: ${({ outline, white, color }) => {
    if (outline) {
      return 'transparent';
    } else if (white) {
      return `rgb(${colors.white})`;
    }
    return `rgb(${color})`;
  }};
  color: ${({ outline, white, color }) => {
    if (outline && white) {
      return `rgb(${colors.white})`;
    } else if (outline || white) {
      return `rgb(${color})`;
    }
    return `rgb(${colors.white})`;
  }};
  border-radius: ${({ round }) => (round ? '24px' : '2px')};
  font-size: ${fonts.medium};
  font-weight: 400;
  padding: 10px;
  margin: 5px auto;
  width: 150px;
  height: 36px;
  cursor: pointer;
  will-change: transform;

  @media (hover: hover) {
    &:hover {
      opacity: 0.6;
    }
  }
`;

const Button = ({ children, outline, white, color, round, ...otherProps }) => (
  <StyledButton outline={outline} white={white} color={color} round={round} {...otherProps}>
    {children}
  </StyledButton>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  outline: PropTypes.bool,
  white: PropTypes.bool,
  color: PropTypes.string,
  round: PropTypes.bool
};

Button.defaultProps = {
  outline: false,
  white: false,
  color: colors.blue,
  round: false
};

export default Button;
