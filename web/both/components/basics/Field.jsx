import React from 'react';
import Input from './Input';
import Textarea from './Textarea';
import Button from './Button';
import Select from './Select';
import Icon from './Icon';

export default class Field extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			focusSearch: false
		};

		this.renderInput = this.renderInput.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.emptyValue = this.emptyValue.bind(this);
		this.focusInput = this.focusInput.bind(this);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.id !== this.props.id){
			this.setValue(nextProps.value || "");
		}
	}

	focusInput(){
		this.refs.input && this.refs.input.focus();
	}

	getValue() {
		if(this.refs.input && this.refs.input.getValue) {
			return this.refs.input.getValue();
		}
		return null;
	}

	setValue(value) {
		if(this.refs.input && this.refs.input.setValue) {
			if(value == ""){
				this.setState({focusSearch:false});
				let props = {...this.props.propsInput};
				props.onKeyUp && props.onKeyUp();
			}
			return this.refs.input.setValue(value);
		}
		return null;
	}

	emptyValue(){
		this.setValue("");
	}

	getInputRef() {
		return this.refs.input;
	}

	onSearch(type){
		this.setState({focusSearch:(type == "search")?false:true})
	}

	renderInput() {
		let props = {...this.props.propsInput};
		if(this.props.id) {
			props.id = this.props.id;
			props.name = this.props.id;
		}

		switch(this.props.type) {
			case 'text':
				return <Input ref="input" {...props} type="text" defaultValue={this.props.defaultValue}/>;
			case 'search':
				return <Input ref="input" {...props} type="text" onSearch={this.onSearch}/>;
			case 'file':
				return <Input ref="input" {...props} type="file" accept={this.props.accept} />;
			case 'password':
				return <Input ref="input" {...props} type="password" />;
			case 'checkbox':
				return <Input ref="input" {...props} type="checkbox" />;
			case 'number':
				return <Input ref="input" {...props} type="number" />;
			case 'button':
				return <Button ref="input" {...props} type="button">{this.props.children}</Button>;
			case 'submit':
				return <Input ref="input" {...props} disabled={this.props.disabled} type="submit" />;
			case 'textarea':
				return <Textarea ref="input" {...props} />;
			case 'select':
				return <Select ref="input" {...props} />;
			default:
				return <Input ref="input" {...props} />;
		}
	}

	renderIcon() {
		switch(this.props.type) {
			case 'search':
				return <Icon onClick={((this.state.focusSearch) ? this.emptyValue : null)} iconClass={(!this.state.focusSearch) ? "icon-search": "icon-close"} />;
			case 'select':
				return <Icon iconClass="icon-arrow_down" />;
			case 'checkbox':
				return <Icon iconClass="icon-close" />;
			default:
				return null;
		}
	}

	render() {
		return (
			<div className={`field ${this.props.className || ''}`}>
				{this.props.label ? <label onClick={this.focusInput} htmlFor={this.props.id}>{this.props.label}</label>
				: null}
				{this.renderInput()}
				{this.renderIcon()}
			</div>
		)
	}
}
