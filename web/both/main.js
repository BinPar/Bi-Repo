import DB from './db';

class MainFW {

	constructor()
	{
		this.DB  = new DB();
		this.updateCurrentNodeSubs = [];
		this.ready = Meteor.isServer;
		this._onReadyQueue = [];
		if(Meteor.isServer) {
			let DbPool = require('../server/dbPool').default;
			this.API = {};
			this.publications = {};
			this.methods = {};
			this.queries = {};
			this.dbPool = new DbPool();
		} else {
			Meteor.call("setupBinParAPI", (e, API) =>
			{
				if(e) console.error("Error setting up BinParAPI :" + e);
				
				for(let method of API.methods)
				{
					let parts = method.split('.');
					if(parts.length>1) {
						if(MainFW.DB[parts[0]][parts[1]])
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

				if(Meteor.userId()) {
					this.setupUserCache();
				}

				Accounts.onLogin(()=>{
					console.log("Logged In...");
					this.setupUserCache()
				});
				Accounts.onLogout(()=>{
					console.log("Logged Out...");
					this._onReadyQueue = [];
					this.cache = {};
					this.ready = false;
					if(this.globalSubscriptions) {
						let subs = this.globalSubscriptions;
						for (let i=0,l=subs.length;i<l;i++) {
							let subscription = subs[i];
							if (subscription.stop) subscription.stop();
						}
						this.globalSubscriptions = null;
					}
					setTimeout(()=>{
						console.log('go acceder');
						FlowRouter.go('/acceder');
					}, 50);
				});
			});

			this.resizeHandlers = [];

			this.addResizeHandler = this.addResizeHandler.bind(this);
			this.removeResizeHandler = this.removeResizeHandler.bind(this);
			this.executeResizeHandlers = this.executeResizeHandlers.bind(this);

			window.addEventListener('resize', this.executeResizeHandlers);

			let MobileDetect = require('mobile-detect');
			this.mobileDetect = new MobileDetect(window.navigator.userAgent);
			this.isMobile = !!(this.mobileDetect.mobile()) || !!(this.mobileDetect.tablet());
		}
	}

	setupUserCache() {
		this.cache = {};

		this.globalSubscriptions = {
			users: this.DB.users.getBasicUserInfo(() => this.processGlobalDictionary("users"))
		};

		this.totalSubscriptionsToLoad = Object.keys(this.globalSubscriptions).length;

		if (this.totalSubscriptionsToLoad == 0) {
			this.onReady();
		}
	}

	onReady()
	{

		for(let fn of this._onReadyQueue)
		{
			fn();
		}

		this.ready = true;
	}

	processGlobalSubscriotion (name)
	{
		this.cache[name] = this.globalSubscriptions[name].query().fetch();
		this.processLoad();
	}

	processGlobalDictionary (name)
	{
		this.cache[name] = {};
		for(let doc of this.globalSubscriptions[name].query().fetch())
		{
			this.cache[name][doc._id] = doc;
		}
		this.processLoad();
	}

	processLoad()
	{
		if (--this.totalSubscriptionsToLoad==0)
		{
			this.onReady();
		}
	}

	addUpdateCurrentNodeSubs(fn)
	{
		if (this.updateCurrentNodeSubs.indexOf(fn) == -1)
		{
			this.updateCurrentNodeSubs.push(fn);

			if(this.lastCurrentNodeData)
			{
				fn(this.lastCurrentNodeData.articleId,this.lastCurrentNodeData.domNodeId, true);
			}
		}
	}

	removeUpdateCurrentNodeSubs(fn)
	{
		let index = this.updateCurrentNodeSubs.indexOf(fn);
		if (index != -1)
		{
			this.updateCurrentNodeSubs.splice(index, 1);
		}
	}

	updateCurrentNode (articleId, domNodeId) {
		this.lastCurrentNodeData = {articleId, domNodeId};
		for(let ev of this.updateCurrentNodeSubs)
		{
			ev(articleId, domNodeId, false);
		}
	}

	onLoad(fn)
	{
		if(this.ready) fn();
		else this._onReadyQueue.push(fn);
	}

	ifLogViewer (fn) {
		if (Meteor.settings.public.viewerDebugMode) {
			fn();
		}
	}

	isExternalLink (url) {
		if (!this.host) {
			this.host = `${document.location.protocol}//${document.location.host}`;
		}

		return url.indexOf(this.host) == -1;
	}

	addResizeHandler(handler) {
		let index;
		for (let i = 0, l = this.resizeHandlers.length; i <= l; i++) {
			if (!this.resizeHandlers[i]) {
				this.resizeHandlers[i] = handler;
				index = i;
			}
		}
		return index;
	}

	removeResizeHandler(index) {
		if (this.resizeHandlers[index]) {
			delete this.resizeHandlers[index];
		}
	}

	executeResizeHandlers() {
		clearTimeout(this.executingResizeHandlers);
		this.executingResizeHandlers = setTimeout(() => {
			for (let i = 0, l = this.resizeHandlers.length; i <= l; i++) {
				if (this.resizeHandlers[i]) {
					this.resizeHandlers[i]();
				}
			}
		}, 100);
	}
}

let BinPar = new MainFW();
export default BinPar;


Date.prototype.getFormattedDate = function () {
	let date = this.getDate();
	if (date < 10) {
		return "0" + date;
	}
	return date;
};

Date.prototype.getFormattedMonth = function () {
	let month = this.getMonth() + 1;
	if (month < 10) {
		return "0" + month;
	}
	return month;
};

Date.prototype.getFormattedMinutes = function () {
	let minutes = this.getMinutes();
	if (minutes < 10) {
		return "0" + minutes;
	}
	return minutes;
};

Date.prototype.toChatFormatTime = function () {
	return this.getHours() + ':' + this.getFormattedMinutes() + ' - ' + this.getFormattedDate() + '/' + this.getFormattedMonth();
};