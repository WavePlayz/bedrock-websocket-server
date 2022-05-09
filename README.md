# bedrock-websocket-server

## payloads
### subscribe payload
```json
{
	"header": {
		"version": 1,
		"requestId": "<uuid>",
		"messageType": "commandRequest",
		"messagePurpose": "subscribe"
	},
	"body": {
		"eventName": "<eventName>"
	}
}
```

see [here](#known-socket-events) for known events

### unsubscribe payload
```json
{
	"header": {
		"version": 1,
		"requestId": "<uuid>",
		"messageType": "commandRequest",
		"messagePurpose": "unsubscribe"
	},
	"body": {
		"eventName": "<eventName>"
	}
}
```

### command payload
```json
{
	"header": {
		"version": 1,
		"requestId": "<uuid>",
		"messageType": "commandRequest",
		"messagePurpose": "commandRequest"
	},
	"body": {
		"version": 1,
		"origin": { "type": "player" },
		"overworld": "default",
		"commandLine": "<slashCommand>"
	}
}
```

---

### known socket events
```json
[
	"AdditionalContentLoaded",
	"AgentCommand",
	"AgentCreated",
	"ApiInit",
	"AppPaused",
	"AppResumed",
	"AppSuspended",
	"AwardAchievement",
	"BlockBroken", //tested1.19.0.27
	"BlockPlaced", //tested1.19.0.27
	"BoardTextUpdated",
	"BossKilled",
	"CameraUsed",
	"CauldronUsed",
	"_ChunkChanged_1.0.2",
	"_ChunkLoaded_1.0.2",
	"_ChunkUnloaded_1.0.2",
	"ConfigurationChanged",
	"ConnectionFailed",
	"CraftingSessionCompleted",
	"EndOfDay",
	"EntitySpawned", //tested1.19.0.27
	"FileTransmissionCancelled",
	"FileTransmissionCompleted",
	"FileTransmissionStarted",
	"FirstTimeClientOpen",
	"FocusGained",
	"FocusLost",
	"GameSessionComplete",
	"GameSessionStart",
	"HardwareInfo",
	"HasNewContent",
	"ItemAcquired", //tested1.19.0.27
	"ItemCrafted",
	"ItemDestroyed",
	"ItemDropped", //tested1.19.0.27
	"ItemEnchanted",
	"ItemSmelted",
	"ItemUsed", //tested1.19.0.27
	"JoinCanceled",
	"JukeboxUsed",
	"LicenseCensus",
	"MascotCreated",
	"MenuShown",
	"MobInteracted",
	"MobKilled", //tested1.19.0.27
	"MultiplayerConnectionStateChanged",
	"MultiplayerRoundEnd",
	"MultiplayerRoundStart",
	"NpcPropertiesUpdated",
	"OptionsUpdated",
	"performanceMetrics",
	"PackImportStage",
	"PlayerBounced",
	"PlayerDied", //tested1.19.0.27
	"PlayerJoin", //tested1.19.0.27
	"PlayerLeave", //tested1.19.0.27
	"PlayerMessage", //tested1.19.0.27
	"PlayerTeleported", //tested1.19.0.27
	"PlayerTransform", //tested1.19.0.27
	"PlayerTravelled", //tested1.19.0.27
	"PortalBuilt",
	"PortalUsed",
	"PortfolioExported",
	"PotionBrewed",
	"PurchaseAttempt",
	"PurchaseResolved",
	"RegionalPopup",
	"RespondedToAcceptContent",
	"ScreenChanged",
	"ScreenHeartbeat",
	"SignInToEdu",
	"SignInToXboxLive",
	"SignOutOfXboxLive",
	"SpecialMobBuilt",
	"StartClient",
	"StartWorld",
	"TextToSpeechToggled",
	"UgcDownloadCompleted",
	"UgcDownloadStarted",
	"UploadSkin",
	"VehicleExited",
	"WorldExported",
	"WorldFilesListed",
	"WorldGenerated",
	"WorldLoaded",
	"WorldUnloaded"
]
```
---

## demo
### subscribe event demo
```js
const WebSocket = require("ws")
const wss = new WebSocket.Server({ port: 8080 })

function createSubscribePayload (eventName) {
	return JSON.stringify({
		"header": {
			"version": 1,
			"requestId": "282b7dcd-ea7a-4d2e-9795-5710798f2026",
			"messageType": "commandRequest",
			"messagePurpose": "subscribe"
		},
		"body": {
			"eventName": eventName
		}
	})
}

wss.on( "connection", ws => {
	ws.send( createSubscribePayload( "PlayerMessage" ) )
})
```

### unsubscribe event demo
```js
const WebSocket = require("ws")
const wss = new WebSocket.Server({ port: 8080 })

function createUnsubscribePayload (eventName) {
	return JSON.stringify({
		"header": {
			"version": 1,
			"requestId": "282b7dcd-ea7a-4d2e-9795-5710798f2026",
			"messageType": "commandRequest",
			"messagePurpose": "unsubscribe"
		},
		"body": {
			"eventName": eventName
		}
	})
}

wss.on( "connection", ws => {
	ws.send( createUnsubscribePayload( "PlayerMessage" ) )
})
```

### slash command request demo
```js
const WebSocket = require("ws")
const wss = new WebSocket.Server({ port: 8080 })

function createCommandPayload (slashCommand) {
	return JSON.stringify({
		"header": {
			"version": 1,
			"requestId": "282b7dcd-ea7a-4d2e-9795-5710798f2026",
			"messageType": "commandRequest",
			"messagePurpose": "commandRequest"
		},
		"body": {
			"version": 1,
			"origin": { "type": "player" },
			"overworld": "default",
			"commandLine": slashCommand
		}
	})
}

wss.on( "connection", ws => {
	ws.send( createCommandPayload( "/say connected to websocket server" ) )
})

```

---

## responses
...soon
