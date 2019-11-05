import React from "react";

// pulling in styles
import styled from "styled-components";
import theme from "../Global/theme";
import { Button, Linkton } from "../Global";

// connecting redux state
import { login, googleLogin, facebookLogin } from "../../actions/firebaseAuth";
import { connect } from "react-redux";

import { Redirect } from "react-router-dom";

class LandingPage extends React.Component {
  state = {
    email: "",
    password: "",
    showLogin: false
  };

  showLoginBox = () => {
    this.setState(prevState => ({
      showLogin: !prevState.showLogin
    }));
  };

  handleGoogleAuth = e => {
    e.preventDefault();
    this.props.googleLogin();
  };

  handleFacebookAuth = e => {
    e.preventDefault();
    this.props.facebookLogin();
  };

  render() {
    // once user logs in isLoggedIn will be true and route you to home page
    const { isLoggedIn } = this.props;
    if (isLoggedIn) return <Redirect to="/" />;
    return (
      <LandingPageWrapper>
        <h1>Welcome to NutraJournal!</h1>
        <EmailLoginBtn className="email" to="/login">
          Sign in with Email!
        </EmailLoginBtn>
        <SignInBtn className="google" onClick={this.handleGoogleAuth}>
          Sign in with Google!
        </SignInBtn>
        <SignInBtn className="facebook" onClick={this.handleFacebookAuth}>
          Sign in with Facebook!
        </SignInBtn>
        <RegisterBtn to="/register">Register with Email!</RegisterBtn>
      </LandingPageWrapper>
    );
  }
}

const LandingPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .google {
    background: ${theme.success};
    border-color: ${theme.success};
    color: ${theme.light};
    &:hover {
      border-color: ${theme.dark};
    }
  }
  .facebook {
    background: ${theme.primary};
    border-color: ${theme.primary};
    color: ${theme.light};
    &:hover {
      border-color: ${theme.dark};
    }
  }
  button,
  a {
    margin: 5px 0;
  }
`;

const SignInBtn = styled(Button)`
  width: 204px;
  border-radius: 25px;
  height: 40px;
  background: ${theme.light};
  color: ${theme.dark};
  font-weight: bold;
  font-size: 1.4rem;
`;

const EmailLoginBtn = styled(Linkton)`
  width: 204px;
  border-radius: 25px;
  height: 40px;
  background: ${theme.light};
  color: ${theme.dark};
  font-weight: bold;
  font-size: 1.4rem;
`;

const RegisterBtn = styled(Linkton)`
  width: 204px;
  border-radius: 25px;
  height: 40px;
  background: ${theme.dark};
  color: ${theme.light};
  font-weight: bold;
  font-size: 1.4rem;
  &:hover {
    background: ${theme.light};
    color: ${theme.dark};
  }
`;

const mapStateToProps = state => {
  return {
    // when user is not logged in isEmpty is true so I use a ! to make isLoggedIn more readable
    isLoggedIn: !state.firebase.auth.isEmpty
  };
};

export default connect(
  mapStateToProps,
  { login, googleLogin, facebookLogin }
)(LandingPage);

// import React from "react";
// import { Linkton } from "../Global";
// import styled from "styled-components";

// import { connect } from "react-redux";

// const LandingPage = ({ isLoggedIn, history }) => {
//   if (isLoggedIn) {
//     history.push("/");
//   }
//   return (
//     <LandingWrapper>
//       <h1>NutraJournal</h1>
//       <p>Create a new account!</p>
//       <LoginButton to="/login">Sign in</LoginButton>
//       <p>Already a member?</p>
//       <RegisterButton to="/register">Register</RegisterButton>
//     </LandingWrapper>
//   );
// };

// const LandingWrapper = styled.div`
//   height: 100vh;
//   p {
//     margin-top: 10px;
//   }
// `;

// const LoginButton = styled(Linkton)`
//   background: ${theme.primary};
// `;

// const RegisterButton = styled(Linkton)`
//   background: ${theme.success};
// `;

// const mapStateToProps = state => {
//   return {
//     isLoggedIn: state.firebase.auth.uid
//   };
// };

// export default connect(
//   mapStateToProps,
//   {}
// )(LandingPage);
