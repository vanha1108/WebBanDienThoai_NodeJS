
import React, { Component } from 'react';
import './loginStyles.css'
import { assets } from '../../constants/assetsImage';
import { connect } from "react-redux";

// @Actions
import AuthorizationActions from '../../redux/actions/auth'

// @Components
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import ForgotPassword from './ForgotPass';

// @Constance
import { GOOGLE_ID, FACEBOOK_ID } from '../../constants'

class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
		}
	}

	onLogin = () =>{
		const { email, password} = this.state;
		const {onLogin} = this.props;
		const data = {email, password};
		if(data){
			onLogin(data);
		}
	}
	onSubmit = (event) =>{
    event.preventDefault();
  }

	onChange = (event) =>{
    var target=event.target;
    var name=target.name;
    var value=target.value;
    this.setState({
      [name]:  value
    })
	}

	componentDidMount(){ 
		document.title = "[TellMe] Đăng nhập"
		this.improveScreen()
		const {history} = this.props;
	}

	UNSAFE_componentWillReceiveProps(props){
		const {loggedIn,history} = props;
		if(loggedIn && loggedIn===true){
			history.push('/');
		}
	}

	improveScreen() {
		const inputs = document.querySelectorAll(".input");
		function addcl(){
			let parent = this.parentNode.parentNode;
			parent.classList.add("focus");
		}

		function remcl(){
			let parent = this.parentNode.parentNode;
			if(this.value === ""){
				parent.classList.remove("focus");
			}
		}
		inputs.forEach(input => {
			input.addEventListener("focus", addcl);
			input.addEventListener("blur", remcl);
		});
	}

	responseGoogle = (response) => {
		const {onLoginGoogle} = this.props;
		onLoginGoogle(response.accessToken);
  }

  responseFacebook = (response) => {
		const {onLoginFacebook} = this.props;
		onLoginFacebook(response.accessToken);
	}

	render() {
		const {email, password} = this.state;
		return (
			<div>
				<img className="wave" src={ assets("wave.png")} alt="" />
				<div className="container_login">
					<div className="img">
						<img src={ assets("bg.svg")} alt="" />
					</div>
					<div className="login-content">
						<form>
							<img src="img/avatar.svg" alt="" />
							<h2 className="title">Welcome to</h2>
							<img className="pb-4" src={assets("brand.png")} alt=""></img>
							<div className="input-div one">
								<div className="i">
									<i className="fas fa-user" />
								</div>
								<div className="div">
									<h5>Email</h5>
									<input type="email" className="input" name="email" value={email} onChange={this.onChange}/>
								</div>
							</div>
							<div className="input-div pass">
								<div className="i">
									<i className="fas fa-lock" />
								</div>
								<div className="div">
									<h5>Password</h5>
									<input type="password" className="input" name="password" value={password} onChange={this.onChange}/>
								</div>
							</div>
							<div onClick={()=> this.onForgotPass} className="text-right" data-toggle="modal" data-target="#forgotPassword">Forgot Password?</div>
							<div className="row">
								<div className="col-12">
									<button type="button" className="btn" onClick={()=> this.onLogin()}>Login</button>
								</div>
								<div className="col-12 ">
									<form action="/user/dang-ky">
										<button type="submit" className="btn" value="Register">Register</button>
									</form>
								</div>
								
								<div className="col-12">
									<GoogleLogin
									clientId={GOOGLE_ID}
									buttonText="Login"
									onSuccess={this.responseGoogle}
									onFailure={this.responseGoogle}
									render={renderProps => (
										<button onClick={renderProps.onClick} disabled={renderProps.disabled} className="btn-danger mr-3"><FontAwesomeIcon icon={faGoogle} className="mr-1"/>Login with Google</button>
									)}
									/>
								</div>
								<form onSubmit={this.onSubmit} className="col-12">
									<div className="row">
										<div className="col-12">
											<FacebookLogin
											appId={FACEBOOK_ID}
											autoLoad={false}
											callback={this.responseFacebook}
											render={renderProps => (
													<button onClick={renderProps.onClick}  className="btn-primary"><FontAwesomeIcon icon={faFacebookF} className="mr-1"/>Login with Facebook</button>
												)}
											/>
										</div>
									</div>
								</form>
							</div>
						</form>
						<ForgotPassword/>
					</div>
				</div>
				
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
		loggedIn: state.auth.loggedIn
  };
};

const mapDispatchToProps =(dispatch)=> {
	return {
		onLogin : (data) =>{
			dispatch(AuthorizationActions.onLogin(data))
		},
		onLoginFacebook : (token) =>{
			dispatch(AuthorizationActions.onLoginFacebook(token))
		},
		onLoginGoogle : (token) =>{
			dispatch(AuthorizationActions.onLoginGoogle(token))
		},

	}
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
