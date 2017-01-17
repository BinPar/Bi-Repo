import React from 'react';

export default class Select extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			active: 0,
			text: '',
			value: props.initialValue,
			folded: true
		};
		this.toggleOptions = this.toggleOptions.bind(this);
		this._onBlur = this._onBlur.bind(this);
	}

	componentDidMount() {
		let found = false;
		let firstChildText = '';
		React.Children.forEach(this.props.children, (child, i)=>{
			if(i === 0) {
				firstChildText = child.props.children;
			}
			if(child.props.value === this.props.initialValue) {
				this.setState({ text: child.props.children, active: i });
				found = true;
			}
		});

		!found && this.setState({ text: firstChildText });
	}

	selectOption(i, value, text) {
		console.log(`active (${i}) - ${value}`);
		this.setState({active: i, value, text, folded: true});
		if(this.props.onChange){
			this.props.onChange(value);
		}
		this.toggleOptions();
	}

	buildOptions() {
		return React.Children.map(this.props.children, (child, i) => {
			return (
				React.cloneElement(child, {
					className: child.props.className + (i === this.state.active ? ' active' : ''),
					onClick: this.selectOption.bind(this, i)
				})
			);
		});
	}

	_onBlur() {
		this.setState({ folded: true });
	}

	toggleOptions() {
		this.setState({ folded: !this.state.folded });
	}

	render() {
		return (
			<div tabIndex={this.props.tabIndex || '99'} onBlur={this._onBlur} className={`select${this.props.className ? (' ' + this.props.className) : ''}${this.state.folded ? ' folded' : ''}`} >
				<div className="placeholder" onClick={this.toggleOptions}>
					{this.state.text}
				</div>
				<div className="optionHolder">
					{this.buildOptions()}
				</div>
			</div>
		);
	}
}