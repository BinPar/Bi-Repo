import React from 'react';

import UserZone from '../../UserZone';
import Link from '../Link';
import Button from '../Button';
import Icon from '../Icon';
import Logo from '../Logo';
import Input from '../Input';

export default class Header extends React.Component {

	constructor(props) {
		super(props);
		this.state = { };
	}

	render() {
		return (
			<header id="mainHeader">

				<Link className="mainLogoHolder" href="/">
					<Logo className="mainLogo"/>
				</Link>

				{this.props.home ? (
					<UserZone />
				) : (
					<div className="canvasHeader">
						<Button>
							<Icon iconClass="tutorial" />
							Guardar
						</Button>
						<Input value="ñasdflkjasdfñlkj" />
						<Button>
							<Icon iconClass="tutorial" />
						</Button>
					</div>
				)}

				<UserZone />
			</header>
		);
	}
}