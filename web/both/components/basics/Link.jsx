import React from 'react';

export default class Link extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		return (
			<a 
				href={this.props.href}
				title={this.props.title}
				onClick={this.props.onClick}
				className={`link ${this.props.className || ''}`}
				target={this.props.targetBlank ? '_blank' : null} >

					{this.props.children}
					{this.props.targetBlank ? <span className="iconOut"></span> : null}
			</a>
		);
	}

}