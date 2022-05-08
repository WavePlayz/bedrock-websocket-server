
const WebSocket = require("ws")
const HTTPS = require("https")
const UUID = require("uuid")

const XBLAPI = require("./xbl-web-api.js")

function getRequest (url, callback, onError) {
	HTTPS.get(url, response => {
		const chunks = []
		
		response.on( "data", chunk => chunks.push(chunk) )

		response.on( "end", () => {
			let dataString = Buffer.concat(chunks).toString()
			let data = JSON.parse( dataString )
			
			callback.call( response, data )
		})
		
	})//.on( "error", onError ?? (()=>{}) )
}

XBLAPI.get = getRequest


function style(style, text) {
	let styles = style.replace(".",";")
	return "\x1b[" + styles + "m" + text + "\x1b[0m"
}

String.prototype.style = function(value) {
	return style(value, this.toString())
}

function createPayload (type, purpose, body) {
	return JSON.stringify({
		"header": {
			"version": 1,
			"requestId": UUID.v4(),
			"messageType": type,
			"messagePurpose": purpose
		},
		"body": body
	})
}

function createSubscribePayload (event) {
	return createPayload( "commandRequest", "subscribe", {
		"eventName": event
	})
}

function createCommamdPayload (command) {
	return createPayload( "commandRequest", "commandRequest", {
		"version": 1,
		"origin": { "type": "player" },
		"commandLine": command,
		"overworld": "default"
	})
}


const EVENTS = require("./events.json")

// Creating a new websocket server
const PORT = 8080
const wss = new WebSocket.Server({ port: PORT })


WebSocket.prototype.__subscribe = function(event) {
	return this.send( createSubscribePayload( event ) )
}

WebSocket.prototype.__runCommand = function(command) {
	return this.send( createCommamdPayload( command ) )
}

// Creating connection using websocket
wss.on( "connection", ws => {
	onConnect.call(ws)
	
	EVENTS.forEach( event => ws.__subscribe( event) )
	
	// sending message
	ws.on( "message", onMessage.bind(ws) )
	
	// handling what to do when clients disconnects from server
	ws.on( "close", onDisconnect.bind(ws) )
	
	// handling client connection error
	ws.on( "error", onError.bind(ws) )
})

console.log( "WebSocket Server - running at".style("1") )
console.log( `:: ws:\/\/localhost:${PORT}`.style("35") )
console.log( `:: /connect ws:\/\/localhost:${PORT}`.style("34") )


function onConnect(ws) {
	console.log( ":: [Client Connected]".style("32.1") )
}

function onDisconnect() {
	console.log(":: [Client Diconnected]".style("31.1") )
}

function onError(error) {
	console.log("Some Error occurred " + error)
}

function onMessage(raw) {
	const data = JSON.parse(raw)
	
	const { header, body } = data
	
	if (header.messagePurpose !== "event" || body.sender === "External") return;
	
	const { sender, message } = body
	
	console.log(`:: [${header.eventName}]`.style("36"))
	/*
	XBLAPI.fetch("checkByTag", nameTag, data => {
		const { available } = data
		console.log(available)
	})
	
	console.log(`<${sender.style("33")}> ${message}`)
	*/
	
	let rawdata = "rawdata " + JSON.stringify(data, null, 2) 
	
	let rawtext = JSON.stringify({ rawtext: [ { text: rawdata } ] })
	
	console.log(rawdata)
	this.__runCommand( `tellraw @s ${rawtext}` )
	
	let ws = this
	
	if (message == "tp") {
		let n = 0
		let e = setInterval(() => {
			ws.__runCommand( `tp ^ ^ ^0.05` )
			ws.__runCommand( `title @s actionbar ${n}` )
			
			if (n++ > 5*20) clearInterval(e);
		},50)
	}
	
	
	
}


createSubscribePayload

