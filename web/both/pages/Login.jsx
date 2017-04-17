import React from 'react';

export default class Login extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			enabled: true,
			loginMode: true,
			rememberMe: true
		};

		this.toggleLoginMode = this.toggleLoginMode.bind(this);
	}

	toggleLoginMode() {
		this.setState({loginMode: !this.state.loginMode});
	}

	onLogin(e) {
		e.preventDefault();
		this.setState({enabled:false});
		Meteor.loginWithPassword(this.refs.email.getValue(),this.refs.password.getValue(), error => {
			if(error) {
				if(error.reason && error.reason == "Incorrect password")
				{
					this.setState({error: "Password incorrecta", enabled: true});
				}
				else if(error.reason && error.reason == "User not found")
				{
					this.setState({error: "La dirección de correo electrónico no es correcta", enabled: true});
				}
				else if(error.reason && error.reason == "Match failed")
				{
					this.setState({error: "Es necesario introducir email y contraseña", enabled: true});
				}
				else
				{
					this.setState({error: error.reason, enabled: true});
				}
			} else {
				// stops Accounts from logging you out due to token change
				if(!this.state.rememberMe){
					Accounts._autoLoginEnabled = false;
					// remove login token from LocalStorage
					Accounts._unstoreLoginToken();
					// if you want to synchronise login states between tabs
					let pollLoginState = function () {
						let currentLoginToken = Accounts._storedLoginToken();
						if (! currentLoginToken) return;

						// != instead of !== just to make sure undefined and null are treated the same
						if (Accounts._lastLoginTokenWhenPolled != currentLoginToken) {
							if (currentLoginToken) {
								Accounts.loginWithToken(currentLoginToken, function (err) {
									if (err) {
										Accounts.makeClientLoggedOut();
									}
								});
							} else {
								Accounts.logout();
							}
						}

						Accounts._lastLoginTokenWhenPolled = currentLoginToken;
					};

					setInterval(function () {
						pollLoginState();
					}, 3000);
				}

				FlowRouter.go(Meteor.user().profile.lastURL || '/');
			}
		});
	}

	componentWillMount() {
		DocHead.setTitle("Acceder a " + Meteor.settings.public.title);
	}

	rememberMe(){

	}

	rememberPassword(e){
		e.preventDefault();
		let value =this.refs.emailRemember.value;
		if(value!=""){
			AFL.DB.users.rememberPassword(value);
		}

	}

	render() {

		return (
			<div>
				<h1>Hola mundo</h1>
			</div>
		);
	}
}
