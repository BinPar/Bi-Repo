import React from 'react';

export default class ButtonGroup extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			active: props.initialIndex
		};
	}

	_handleClick(newIndex, key, onClick) {
		this.setState({active: newIndex}, ()=>{
			onClick && onClick(key);
		});
	}

	render() {
		return (
			<div className={this.props.className}>
				{React.Children.map(this.props.children, (child, i)=>{
					if(child){
						return React.cloneElement(child, {
							className: (child.props.className || '') + (i === this.state.active ? ' active' : ''),
							onClick: this._handleClick.bind(this, i, child.key, child.props.onClick)
						});
					}else{
						return null;
					}
				})}
			</div>
		);
	}
}
