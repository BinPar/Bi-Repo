import { Meteor } from 'meteor/meteor';
import DB from './db';

class MainFW {

	constructor() {
		this.DB = DB;
		this._fwReady = Meteor.isServer;
		this._onFWReadyQueue = [];
		if(Meteor.isServer) {
			this.API = {};
			this.publications = {};
			this.methods = {};
			this.queries = {};
			this.dbPool = require('../server/dbPool').default;
		} else {
			Meteor.call("setupBinParAPI", (e, API) => {
				if(e) console.error("Error setting up BinParAPI :" + e);

				for(let method of API.methods)
				{
					let parts = method.split('.');
					if(parts.length>1) {
						if(this.DB[parts[0]][parts[1]])
						{
							console.error(`Duplicated method in collection ${parts[0]}: ${parts[1]}`);
						} else {
							MainFW.DB[parts[0]][parts[1]] = function(...params) {
								return Meteor.call(method, ...params);
							}
						}
					}
				}

				for(let publication of API.publications)
				{
					let parts = publication.split('.');
					if(parts.length>1) {
						if(MainFW.DB[parts[0]][parts[1]])
						{
							console.error(`Duplicated subscription in collection ${parts[0]}: ${parts[1]}`);
						} else {
							MainFW.DB[parts[0]][parts[1]] = function(...params) {
								return Meteor.subscribe(publication, ...params);
							}
						}
					}
				}

				for(let publication of API.queries)
				{
					let parts = publication.split('.');
					if(parts.length>1) {
						if(MainFW.DB[parts[0]][parts[1]])
						{
							console.error(`Duplicated subscription in collection ${parts[0]}: ${parts[1]}`);
						} else {
							MainFW.DB[parts[0]][parts[1]] = function(...params) {
								let subs = Meteor.subscribe(publication, ...params);
								subs.query = MainFW.DB[parts[0]]["query_" + parts[1]].bind(MainFW.DB[parts[0]], Meteor.userId(),...params);
								return subs;
							}
						}
					}
				}

				this.readyFrameWork();

				Accounts.onLogin(()=>{
					console.log("Logged In...");
				});

				Accounts.onLogout(()=>{
					console.log("Logged Out...");
					this._onReadyQueue = [];
					this.cache = {};
					this._fwReady = false;
				});
			});
		}
	}

	onFWReady(fn) {
		if(this._fwReady) {
			fn();
		} else {
			this._onFWReadyQueue.push(fn);
		}
	}

	readyFrameWork() {
		let fn;
		while (fn = this._onFWReadyQueue.shift()) {
			fn();
		}

		this._fwReady = true;
	}

}

export default new MainFW();