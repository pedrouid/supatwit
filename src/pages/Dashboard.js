import React, { Component } from 'react';
import styled from 'styled-components';
import Link from '../components/Link';
import Input from '../components/Input';
import Button from '../components/Button';
import { colors } from '../styles';

const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px auto;
  & img {
    border-radius: 50%;
  }
  & p {
    color: white;
    margin: 20px;
  }
`;

const StyledTopRight = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const StyledFlex = styled.div`
  display: flex;
  align-items: center;
  margin-top; 20px;
  &:first-child(1) {
    margin-top: 60px;
  }
  & > div {
    margin: 20px;
  }
`;

class Dashboard extends Component {
  render() {
    return (
      <StyledDashboard>
        <StyledTopRight>
          <Link to="/logout">
            <Button color={colors.red} round outline>
              Logout
            </Button>
          </Link>
        </StyledTopRight>
        <StyledHeader>
          <img src="https://twitter.com/heysilvergirl/profile_image?size=bigger" alt="heysilvergirl" />
          <p>@heysilvergirl</p>
        </StyledHeader>
        <Button round>Unfollow 100</Button>
        <StyledFlex>
          <Input label="Username" type="text" onValueChange={value => this.props.authUpdateEmail(value)} />
          <Button round>Follow 100</Button>
        </StyledFlex>
        <StyledFlex>
          <Input label="Hashtag" type="text" onValueChange={value => this.props.authUpdateEmail(value)} />
          <Button round>Follow 100</Button>
        </StyledFlex>
        <StyledFlex>
          <Input label="Hashtag" type="text" onValueChange={value => this.props.authUpdateEmail(value)} />
          <Button round>Like 100</Button>
        </StyledFlex>
        <StyledFlex>
          <Input label="Hashtag" type="text" onValueChange={value => this.props.authUpdateEmail(value)} />
          <Button round>Unlike 100</Button>
        </StyledFlex>
      </StyledDashboard>
    );
  }
}

export default Dashboard;
