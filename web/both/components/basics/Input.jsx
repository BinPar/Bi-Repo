import React from 'react';

export default class Input extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		};

		this.onKeyUp = this.onKeyUp.bind(this);
	}

	getValue() {
		if(this.refs.input) {
			return this.refs.input.value;
		}
		return null;
	}

	setValue(value){
		if(this.refs.input) {
			this.refs.input.value = value;
		}
	}

	onKeyUp(e){
		this.props.onKeyUp && this.props.onKeyUp(e);
		if(this.refs.input.value != ""){
			this.props.onSearch && this.props.onSearch("close");
		}else{
			this.props.onSearch && this.props.onSearch("search");
		}
	}

	focus() {
		this.refs.input && setTimeout(() => {
			this.refs.input.focus();
		}, 100);
	}

	render() {
		const { type, style, multiple, placeholder, onChange, onBlur, onFocus } = this.props;
		return <input
			ref="input"
			accept={this.props.accept}
			placeholder={placeholder}
			className={`input ${this.props.className || ''}`}
			value={this.props.value}
			defaultValue={this.props.defaultValue}
			disabled={this.props.disabled}
			onClick={this.onClick}
			onChange={onChange}
			onKeyUp={this.onKeyUp}
			onBlur={onBlur}
			onFocus={onFocus}
			type={type}
			style={style}
			multiple={multiple}
		/>

	}
}