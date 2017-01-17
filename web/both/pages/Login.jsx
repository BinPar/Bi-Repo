import React from 'react';
import Logo from '../components/basics/Logo';
import Field from '../components/basics/Field';
import Form from '../components/basics/Form';
import Button from '../components/basics/Button';
import ButtonGroup from '../components/basics/ButtonGroup';
import Row from '../components/basics/Row';
import View from '../components/basics/layout/View';

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
			<View id="login" className={this.state.loginMode ? 'loginMode' : 'retrievePassMode'}>
				<Row>
					<Row>
						<Logo />
						<h2>Programa de Afiliados de Editorial Médica Panamericana</h2>
					</Row>
					<Row>
						<ButtonGroup initialIndex={0} className="horizontal">
							<Button className="" onClick={this.state.loginMode ? '' : this.toggleLoginMode }>
								Acceder
							</Button>
							<Button className="" onClick={this.state.loginMode ? this.toggleLoginMode : ''}>
								Recordar contraseña
							</Button>
						</ButtonGroup>
					</Row>

					<Row className="coverLogin">
						{this.state.loginMode ? (

							<Form className="login" ref="loginForm" autoComplete="off" onSubmit={this.onLogin.bind(this)}>
								<Field
									type="text"
									id="email"
									label="eMail"
									ref="email"
									propsInput={{placeholder: "eMail", name: "email"}} />
								<Field
									type="password"
									id="password"
									label="Contraseña"
									ref="password"
									propsInput={{placeholder: "Contraseña", name: "password"}} />
								<Field
									type="checkbox"
									id="rememberMe"
									className="checkbox"
									label="Recuérdame"
									ref="rememberMe"
									propsInput={{name: "rememberMe"}} />
								<Field
									type="submit"
									id="submit"
									propsInput={{value: "Conectar"}}
									disabled={!this.state.enabled} />

								{this.state.error?(
									<div className="errorLogin" >{this.state.error}</div>
								):null}
							</Form>

						) : (
							<Form className="login" ref="loginForm" autoComplete="off" onSubmit={this.rememberPassword.bind(this)}>
								<Field
									type='text'
									label='eMail'
									ref='emailRemember'
									id='email'
									propsInput={{name: 'email', placeholder: 'eMail'}} />
								<Field
									type='submit'
									id='submit'
									propsInput={{value: 'Enviar'}}
									disabled={!this.state.enabled} />

								{this.state.error?(
									<div className="errorLogin" >{this.state.error}</div>
								):null}
							</Form>
						)}
					</Row>
				</Row>
			</View>
		);
	}
}
