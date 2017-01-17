import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Field from './Field';

export default class MagicCombo extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		if(!props.settings) {
			throw new Error('Debes pasar una propiedad settings');
		}
		this._user = Meteor.user();
		this.state = {
			subscription: {
				elements: null
			},
			folded: true,
			suggestionActive:0
		};
		this._onBlur = this._onBlur.bind(this);
		this._buildSuggestions = this._buildSuggestions.bind(this);
		this.search = this.search.bind(this);
		this._search = this._search.bind(this);
		this.showSuggestions = this.showSuggestions.bind(this);
		this.moveArrow = this.moveArrow.bind(this);
	}


	componentWillMount(){
		this.updateSubscriptions();
	}

	componentWillReceiveProps() {

	}

	updateSubscriptions(notShowSuggestion){
		/*let table = this.props.settings.table;
		if(table && AFL.DB[table]){
			let value = (this.refs && this.refs.refSearch && this.refs.refSearch.getValue()) || '';
			if(value.length>2){
				let newSub = AFL.DB[table].getItems(null, this._user.profile.filialActive, 10, value || "", ()=>{
					this.setState({readySubscription:true});
				});
				this.cleanSubscriptions();
				this.state.subscription.elements = newSub;
				this.setState({ subscription: this.state.subscription });
				if(value!="" && !notShowSuggestion){
					this.showSuggestions();
				}else{
					this._onBlur();
				}
			}else{
				this.cleanSubscriptions();
				this.setState({ folded: true });
			}
		}*/

	}

	cleanSubscriptions() {
		this.state.subscription.elements && this.state.subscription.elements.stop();
		this.setState({readySubscription:false});
	}

	getElements() {
		if(this.state.subscription.elements && this.state.subscription.elements.query) {
			let query = this.state.subscription.elements.query();
			if(query) {
				return query.fetch();
			} else {
				return [];
			}
		} else {
			return [];
		}
	}

	accessProperties(object, string){
		var explodedString = string.split('.');
		for (let i = 0, l = explodedString.length; i<l; i++){
			object = object[explodedString[i]];
		}
		return object;
	};

	_buildSuggestions() {
		let elements = this.getElements();

		return elements.map((element,index)=> {
			let value = this.accessProperties(element,this.props.settings.property);
			return (
				<div key={`sug_${index}`} onMouseDown={this.clickItem.bind(this, element)} className={(this.state.suggestionActive === index)?"active":""} >
					{value}
				</div>
			);
		});
	}
	search(notShowSuggestion){
		if(this._timerDebounce) {
			clearTimeout(this._timerDebounce);
			this._timerDebounce = null;
		}
		this._timerDebounce = setTimeout(this._search.bind(this, notShowSuggestion), 100);
	}

	_search(notShowSuggestion) {
		this.updateSubscriptions(notShowSuggestion);
	}

	moveArrow(e) {
		if(!e){
			this.search();
			return;
		}
		let keyCode = e.keyCode || e.which;
		if (keyCode === 13 || keyCode === 40 || keyCode === 38) {
			e.preventDefault();
		}
		let elementCount = this.getElements().length;
		let newActive;
		switch (keyCode) {
			case 13: //Enter
				let element = this.getElements()[this.state.suggestionActive];
				let valueShowed = this.accessProperties(element,this.props.settings.property);
				this.refs.refSearch.setValue(valueShowed);
				this.setState({folded: true});
				this.search(true);
				if(this.props.onSelect){
					this.props.onSelect(element);
				}
			 break;
			case 40: //ArrowDown
				newActive = this.state.suggestionActive + 1;
				if (newActive > elementCount - 1) {
					newActive = 0;
				}
				this.setState({suggestionActive: newActive});
				break;
			case 38: //ArrowUp
				newActive = this.state.suggestionActive - 1;
				if (newActive < 0) {
					newActive = elementCount - 1;
				}
				this.setState({suggestionActive: newActive});
				break;
			case 27: //Scape
				this.refs.refSearch.setValue("");
				this.setState({folded: true});
			default:
				this.search();
		}
	}

	clickItem(item){
		let valueShowed = this.accessProperties(item, this.props.settings.property);
		this.refs.refSearch.setValue(valueShowed);
		this.setState({folded: true});
		this.search(true);
		if(this.props.onSelect){
			this.props.onSelect(item);
		}
	}

	_onBlur() {
		this.setState({ folded: true });
	}


	showSuggestions(){
		let value = (this.refs && this.refs.refSearch && this.refs.refSearch.getValue()) || '';
		let elements = this.getElements().length;
		if(value.length > 2 && elements > 0){
			this.setState({folded: false, suggestionActive: 0});
		}else{
			this.setState({folded: true});
		}
	}

	render() {
		return(
			<div className={`search select${this.props.className ? (' ' + this.props.className) : ''}${this.state.folded ? ' folded' : ''}`} >
				<Field
					className="placeholder"
					type="search"
					ref="refSearch"
					propsInput={{ placeholder: "Buscar", onBlur: this._onBlur, onFocus: this.showSuggestions, onKeyUp: this.moveArrow }} />

				<div className="optionHolder">
					{this._buildSuggestions()}
				</div>
			</div>
		);
	}
}
