import React from 'react';
import styled, { keyframes } from 'styled-components';
import { colors } from '../styles';

const spinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div`
  &:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60px;
    height: 60px;
    margin-top: -10px;
    margin-left: -10px;
    border-radius: 50%;
    border: 5px solid rgb(${colors.blue});
    border-top-color: rgb(${colors.lightGrey});
    animation: ${spinner} 0.8s linear infinite;
  }
`;

const Spinner = () => <StyledSpinner />;

export default Spinner;
