import React, { useCallback } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import firebase from "firebase/app";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { signUp } from "../../store/actions";

const useStyles = makeStyles(theme => ({
  form: {
    width: "25%",
    margin: "100px auto",
    height: "60vh"
  },
  formContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    padding: 5
  },
  button: {
    width: "30%",
    margin: "0 auto",
    transition: ".4s ease",
    "&:hover": {
      backgroundColor: "#161616",
      color: "#dddddd"
    }
  },
  textField: {
    width: "75%"
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: `gray !important`
    }
  },
  cssFocused: {
    color: "black !important"
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "black !important"
  }
}));

const SignUp = props => {
  const { history, signUp } = props;
  const classes = useStyles();

  const handleSignUp = event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    signUp({ email: email.value, password: password.value });
  };

  // const handleSignUp = useCallback(
  //   async event => {
  //     event.preventDefault();
  //     const { email, password } = event.target.elements;
  //     try {
  //       await firebase
  //         .auth()
  //         .createUserWithEmailAndPassword(email.value, password.value);
  //       history.push("/");
  //     } catch (error) {
  //       alert(error);
  //     }
  //   },
  //   [history]
  // );

  return (
    <div>
      <h1>Sign up</h1>
      <Paper className={classes.form}>
        <form className={classes.formContainer} onSubmit={handleSignUp}>
          <div className='emailField'>
            <TextField
              name='email'
              label='Email'
              type='email'
              size='small'
              variant='outlined'
              className={classes.textField}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline
                }
              }}
              InputLabelProps={{
                classes: {
                  focused: classes.cssFocused
                }
              }}
            />
          </div>
          <div className='passField'>
            <TextField
              name='password'
              label='Password'
              type='password'
              variant='filled'
              className={classes.textField}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline
                }
              }}
              InputLabelProps={{
                classes: {
                  focused: classes.cssFocused
                }
              }}
            />
          </div>
          <Button variant='contained' type='submit' className={classes.button}>
            Sign Up
          </Button>
        </form>
      </Paper>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userSignUpError: state.auth.userSignUpError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: creds => dispatch(signUp(creds))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));
