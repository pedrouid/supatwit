import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Column from '../components/Column';
import Link from '../components/Link';
import Input from '../components/Input';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import profileImage from '../assets/profile_image.jpg';
import { followersGetConfig, followersFollow, followersUnfollow } from '../reducers/_followers';
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
    username: 'heysilvergirl',
    followUsername: '',
    followHashtag: '',
    likeHashtag: '',
    unlikeHashtag: ''
  };
  componentDidMount() {
    this.props.followersGetConfig(this.state.username);
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
            <img src={profileImage} alt={this.state.username} />
            <div>
              <h4>Hey Silver Girl</h4>
              <p>{`@${this.state.username}`}</p>
            </div>
          </StyledHeader>
          <StyledFlex>
            <Button
              round
              disabled={this.props.fetching}
              onClick={() => this.props.followersUnfollow(this.state.username)}
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
              onClick={() => this.props.followersFollow(this.state.followUsername)}
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
              onClick={() => this.props.hashtagFollow(this.state.followHashtag)}
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
            <Button round disabled={this.props.fetching} onClick={() => this.props.hashtagLike(this.state.likeHashtag)}>
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
              onClick={() => this.props.hashtagUnlike(this.state.unlikeHashtag)}
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
  followersGetConfig: PropTypes.func.isRequired,
  followersFollow: PropTypes.func.isRequired,
  followersUnfollow: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  config: PropTypes.object.isRequired
};

const reduxProps = ({ followers }) => ({
  fetching: followers.fetching
});

export default connect(reduxProps, {
  followersGetConfig,
  followersFollow,
  followersUnfollow
})(Dashboard);
