
const BASE_URL = "https://xbl-api.prouser123.me/"

const ENDPOINTS = {
	checkByTag: "/gamertag/check/<gamertag>",
	profileById: "/profile/xuid/<xuid>",
	profileByTag: "/profile/gamertag/<gamertag>",
	friendsById: "/friends/summary/xuid/<xuid>",
	friendsByTag: "/friends/summary/gamertag/<gamertag>",
	settingsById: "/profile/settings/xuid/<xuid>",
	settingsByTag: "/profile/settings/gamertag/<gamertag>",
	presenceById: "/presence/xuid/<xuid>",
	presenceByTag: "/presence/gamertag/<gamertag>",
	xuidByTag: "/xuid/<gamertag>",
	xuidByTagRaw: "/xuid/<gamertag>/raw",
	achievementsRecentXboxOneById: "/achievements/1/recent/<xuid>",
	achievementsRecentXbox360ById: "/achievements/360/recent/<xuid>"
}

class XBLAPI {
	static cache = new Map()
	
	static #push (key, value) {
		let time = Date.now()
		
		cache.set(key, { value, time })
	}
	
	static #pop (key) {
		return cache.get(key)
	}
	
	static #get (url, callback, ...args) {
		let data = this.#pop(url)
		let time = Date.now()
		
		if (data && time - data.time < 1000*60*5) {
			callback( data )
			return
		}
		
		let context = this
		
		this.get( url, data => {
			this.#push(url, data)
			callback(data)
		}, ...args )
	}
	
	static fetch (endpoint, value, callback, ...args) {
		let endpoint_url = ENDPOINTS[endpoint].replace(/<(gamertag|xuid)>/, value )
		this.#get(BASE_URL + endpoint_url, callback, ...args)
	}
}

module.exports.XBLAPI = XBLAPI

