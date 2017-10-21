import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Column from '../components/Column';
import Link from '../components/Link';
import Input from '../components/Input';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import { dashboardGetConfig, dashboardFollowersFollow, dashboardFollowersUnfollow } from '../reducers/_dashboard';
import { colors, responsive, transitions } from '../styles';

const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;
  background: rgb(${colors.white});
  padding: 50px;
  border-radius: 5px;
  @media screen and (${responsive.sm.max}) {
    padding: 50px 10px;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
  border: 1px solid rgb(${colors.blue});
  margin: 20px 10px;
  border-radius: 10px;
  color: rgb(${colors.dark});
  & img {
    width: 70px;
    border-radius: 50%;
  }
  & p {
    margin-top: 10px;
  }
  & > div {
    margin-left: 30px;
    text-align: left;
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
  margin-top: 10px;
  & > div {
    margin: 20px;
  }
`;

const StyledModal = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(${colors.black}, 0.5);
  transition: ${transitions.long};
  opacity: ${({ fetching }) => (fetching ? '1' : '0')};
  pointer-events: ${({ fetching }) => (fetching ? 'auto' : 'none')};
  visibility: ${({ fetching }) => (fetching ? 'visible' : 'hidden')};
`;

class Dashboard extends Component {
  state = {
    followUsername: '',
    followHashtag: '',
    likeHashtag: '',
    unlikeHashtag: ''
  };
  componentDidMount() {
    this.props.dashboardGetConfig();
  }
  render() {
    return (
      <Column maxWidth={600}>
        <StyledDashboard>
          <StyledTopRight>
            <Link to="/logout">
              <Button color={colors.red} round outline>
                Logout
              </Button>
            </Link>
          </StyledTopRight>
          <StyledHeader>
            <img src={this.props.profile_image} alt={this.props.username} />
            <div>
              <h4>{this.props.name}</h4>
              <p>{`@${this.props.username}`}</p>
            </div>
          </StyledHeader>
          <StyledFlex>
            <Button
              round
              disabled={this.props.fetching}
              onClick={() => this.props.dashboardFollowersUnfollow(this.props.username)}
            >
              Unfollow 100
            </Button>
          </StyledFlex>
          <StyledFlex>
            <Input
              label="Username"
              value={this.state.followUsername}
              type="text"
              onValueChange={followUsername => this.setState({ followUsername })}
            />
            <Button
              round
              disabled={this.props.fetching}
              onClick={() => this.props.dashboardFollowersFollow(this.state.followUsername)}
            >
              Follow 100
            </Button>
          </StyledFlex>
          <StyledFlex>
            <Input
              label="Hashtag"
              value={this.state.followHashtag}
              type="text"
              onValueChange={followHashtag => this.setState({ followHashtag })}
            />
            <Button
              round
              disabled={this.props.fetching}
              onClick={() => this.props.dashboardHashtagFollow(this.state.followHashtag)}
            >
              Follow 100
            </Button>
          </StyledFlex>
          <StyledFlex>
            <Input
              label="Hashtag"
              value={this.state.likeHashtag}
              type="text"
              onValueChange={likeHashtag => this.setState({ likeHashtag })}
            />
            <Button
              round
              disabled={this.props.fetching}
              onClick={() => this.props.dashboardHashtagLike(this.state.likeHashtag)}
            >
              Like 100
            </Button>
          </StyledFlex>
          <StyledFlex>
            <Input
              label="Hashtag"
              value={this.state.unlikeHashtag}
              type="text"
              onValueChange={unlikeHashtag => this.setState({ unlikeHashtag })}
            />
            <Button
              round
              disabled={this.props.fetching}
              onClick={() => this.props.dashboardHashtagUnlike(this.state.unlikeHashtag)}
            >
              Unlike 100
            </Button>
          </StyledFlex>
        </StyledDashboard>
        <StyledModal fetching={this.props.fetching}>
          <Spinner />
        </StyledModal>
      </Column>
    );
  }
}

Dashboard.propTypes = {
  dashboardGetConfig: PropTypes.func.isRequired,
  dashboardFollowersFollow: PropTypes.func.isRequired,
  dashboardFollowersUnfollow: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  config: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profile_image: PropTypes.string.isRequired
};

const reduxProps = ({ dashboard }) => ({
  fetching: dashboard.fetching,
  config: dashboard.config,
  name: dashboard.name,
  username: dashboard.username,
  profile_image: dashboard.profile_image
});

export default connect(reduxProps, {
  dashboardGetConfig,
  dashboardFollowersFollow,
  dashboardFollowersUnfollow
})(Dashboard);
