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

### known socket events from mc 1.12.0.28
```json
AdditionalContentLoaded
AgentCommand
AgentCreated
ApiInit
AppConfigurationChanged
AppPaused
AppResumed
AppSuspended
AppUnpaused
ArmorStandItemEquipped
ArmorStandPosed
AssertFailed
AwardAchievement
BarrelBlockUsed
BehaviorErrored
BehaviorFailed
BellBlockUsed
BlockBroken
BlockFound
BlockPlaced
BlockPlacedByCommand
BoardTextUpdated
BookCopied
BookEdited
BookExported
BookImageImported
BossKilled
CameraUsed
CampfireBlockUsed
CaravanChanged
CartographyBlockUsed
CauldronBlockUsed
CauldronUsed
ChatSettingsUpdated
ChunkChanged
ChunkLoaded
ChunkUnloaded
ClientIdCreated
CodeBuilderClosed
CodeBuilderDownload
CommandBlockEdited
ComposterBlockUsed
CompoundCreatorCreated
ConfigurationChanged
ConnectionFailed
ContentLogsInWorldSession
ContentShared
ControlRemappedByPlayer
CopyWorldEducationEnabled
CraftingSessionCompleted
CraftingSessionEnd
CraftingSessionStart
DefaultGameTypeChanged
DevConsoleCommand
DevConsoleOpen
DifficultySet
DwellerDied
EduOptionSet
EduResources
EduiOSPurchaseTransaction
ElementConstructorUsed
EndOfDay
EntitlementListInfo
EntityDanced
EntityInteracted
EntitySpawned
ExperimentalGameplay
FileTransmissionCancelled
FileTransmissionCompleted
FileTransmissionStarted
FileTransmissionState
FirstTimeClientOpen
FishBucketed
FixedMarketplaceWorldUsingV2VillagersToUseV1
FloatPropertyList
FocusGained
FocusLost
GameRulesLoaded
GameRulesUpdated
GameSessionComplete
GameSessionStart
GameTypeChanged
GameplayTipShown
GrindstoneBlockUsed
HardwareInfo
HasNewContent
Heartbeat
HowToPlayTopicChanged
IncognitoFailure
ItemAcquired
ItemCrafted
ItemDestroyed
ItemDropped
ItemEnchanted
ItemEquipped
ItemInteracted
ItemNamed
ItemSmelted
ItemUsed
JoinByCode
JoinCanceled
JukeboxUsed
LabTableCreated
LecternBlockUsed
LevelDatLoadFailed
LevelDestruct
LicenseCensus
LicenseCheck
MascotCreated
MenuShown
MobBorn
MobEffectChanged
MobInteracted
MobKilled
MultiplayerConnectionStateChanged
MultiplayerRoundEnd
MultiplayerRoundStart
MultiplayerSessionUpdate
NewStoreContentCheckCompleted
NewUserPackDetected
NpcPropertiesUpdated
OfferRated
OptionsUpdated
POIBlockUsageAttempt
POIBlockUsed
PackHashChanged
PackImportStage
PackImportStarted
PackImportedCompleted
PackPlayed
PackUpgradeAttempt
PatternAdded
PatternRemoved
PerformanceMetrics
PetDied
PlayerBounced
PlayerDied
PlayerJoin
PlayerLeave
PlayerMessage
PlayerMessageChat
PlayerMessageMe
PlayerMessageSay
PlayerMessageTell
PlayerMessageTitle
PlayerSaved
PlayerTeleported
PlayerTransform
PlayerTravelled
PopupFiredEdu
PortalBuilt
PortalUsed
PortfolioExported
PotionBrewed
PromotionNotificationClicked
PurchaseAttempt
PurchaseFailureDetails
PurchaseGameAttempt
PurchaseResolved
PushNotificationOpened
PushNotificationPermission
PushNotificationReceived
RealmMemberlistCleared
RealmShared
RealmUrlGenerated
ReducerBlockEntered
RegionalPopup
Respawn
RespondedToAcceptContent
ScreenChanged
ScreenHeartbeat
ScriptLoaded
ScriptRan
SearchCatalogRequest
SearchItemSelected
SetMultiplayerCorrelationId
SetValidForAchievements
SignInEdu
SignInToEdu
SignInToXboxLive
SignOutOfXboxLive
SignedBookOpened
SkinChanged
SlashCommandExecuted
SpecialMobBuilt
SplitScreenUpdated
StackLoaded
StartClient
StartWorld
Storage
StorageReport
StoreOfferClicked
StoreOfferPurchaseAttempt
StoreOfferPurchaseFailure
StoreOfferPurchaseResolved
StorePromotionNotification
StoreSearch
StructureExport
StructureGenerated
TextToSpeechToggled
TradeCompleted
TreatmentPackApplied
TreatmentPackDownloaded
TreatmentPackRemoved
TreatmentsCleared
TreatmentsSet
TrialDeviceIdCorrelation
UgcDownloadCompleted
UgcDownloadStarted
UnknownBlockReceived
UploadSkin
VehicleExited
VideoPlayed
WorldExported
WorldFilesListed
WorldGenerated
WorldHistoryPackSourceMissingDuringUpgrade
WorldImported
WorldLoaded
WorldUnloaded
performanceMetrics
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
#### PlayerMessage
chat message
```json
{
  "body": {
    "message": "<chatText>",
    "receiver": "",
    "sender": "<nameTag>",
    "type": "chat"
  },
  "header": {
    "eventName": "PlayerMessage",
    "messagePurpose": "event",
    "version": 16842752
  }
}
```
say command
```json
{
  "body": {
    "message": "[Steve] hello",
    "receiver": "",
    "sender": "Steve",
    "type": "say"
  },
  "header": {
    "eventName": "PlayerMessage",
    "messagePurpose": "event",
    "version": 16842752
  }
}
```
tellraw
```json
{
  "body": {
    "message": "{\"rawtext\":[{\"text\":\"test\"}]}\n",
    "receiver": "Steve",
    "sender": "Steve",
    "type": "tell"
  },
  "header": {
    "eventName": "PlayerMessage",
    "messagePurpose": "event",
    "version": 16842752
  }
}
```


...soon
{
	"body": {
		"message": "d",
		"receiver": "",
		"sender": "Steve",
		"type": "chat"
	},
	"header": {
		"eventName": "PlayerMessage",
		"messagePurpose": "event",
		"version": 16842752
	}
}
{
	"body": {
		"isUnderwater": false,
		"metersTravelled": 1.110172510147095,
		"newBiome": 0,
		"player": {
			"color": "ff5454ff",
			"dimension": 0,
			"id": -4294967295,
			"name": "Steve",
			"position": {
				"x": 68.7650146484375,
				"y": -56.37998962402344,
				"z": 1.392448902130127
			},
			"type": "minecraft:player",
			"variant": 0,
			"yRot": 31.58711242675781
		},
		"travelMethod": 0
	},
	"header": {
		"eventName": "PlayerTravelled",
		"messagePurpose": "event",
		"version": 16842752
	}
}
{
	"body": {
		"player": {
			"color": "ff5454ff",
			"dimension": 0,
			"id": -4294967295,
			"name": "Steve",
			"position": {
				"x": 68.7650146484375,
				"y": -56.37998962402344,
				"z": 1.392448902130127
			},
			"type": "minecraft:player",
			"variant": 0,
			"yRot": 31.58711242675781
		}
	},
	"header": {
		"eventName": "PlayerTransform",
		"messagePurpose": "event",
		"version": 16842752
	}
}
{
	"body": {
		"block": {
			"aux": 0,
			"id": "bookshelf",
			"namespace": "minecraft"
		},
		"count": 1,
		"placedUnderWater": false,
		"placementMethod": 0,
		"player": {
			"color": "ff5454ff",
			"dimension": 0,
			"id": -4294967295,
			"name": "Steve",
			"position": {
				"x": 66.89697265625,
				"y": -58.37998962402344,
				"z": 9.772404670715332
			},
			"type": "minecraft:player",
			"variant": 0,
			"yRot": 176.2202453613281
		},
		"tool": {
			"aux": 0,
			"enchantments": [],
			"freeStackSize": 1,
			"id": "bookshelf",
			"maxStackSize": 64,
			"namespace": "minecraft",
			"stackSize": 63
		}
	},
	"header": {
		"eventName": "BlockPlaced",
		"messagePurpose": "event",
		"version": 16842752
	}
}
{
	"body": {
		"block": {
			"aux": 0,
			"id": "grass",
			"namespace": "minecraft"
		},
		"count": 1,
		"destructionMethod": 0,
		"player": {
			"color": "ff5454ff",
			"dimension": 0,
			"id": -4294967295,
			"name": "Steve",
			"position": {
				"x": 66.89697265625,
				"y": -58.37998962402344,
				"z": 9.772404670715332
			},
			"type": "minecraft:player",
			"variant": 0,
			"yRot": -144.2776184082031
		},
		"tool": {
			"aux": 0,
			"enchantments": [],
			"freeStackSize": 1,
			"id": "bookshelf",
			"maxStackSize": 64,
			"namespace": "minecraft",
			"stackSize": 63
		},
		"variant": 0
	},
	"header": {
		"eventName": "BlockBroken",
		"messagePurpose": "event",
		"version": 16842752
	}
}
{
	"body": {
		"count": 1,
		"craftedAutomatically": false,
		"endingTabId": 3,
		"hasCraftableFilterOn": true,
		"item": {
			"aux": 0,
			"enchantments": [],
			"freeStackSize": 0,
			"id": "diamond_sword",
			"maxStackSize": 1,
			"namespace": "minecraft",
			"stackSize": 1
		},
		"numberOfTabsChanged": 0,
		"player": {
			"color": "ff5454ff",
			"dimension": 0,
			"id": -4294967295,
			"name": "Steve",
			"position": {
				"x": 73.71974182128906,
				"y": -58.37998962402344,
				"z": 8.246631622314453
			},
			"type": "minecraft:player",
			"variant": 0,
			"yRot": 140.3938598632812
		},
		"recipeBookShown": false,
		"startingTabId": 3,
		"usedCraftingTable": true,
		"usedSearchBar": false
	},
	"header": {
		"eventName": "ItemCrafted",
		"messagePurpose": "event",
		"version": 16842752
	}
}
{
	"body": {
		"acquisitionMethodId": 2,
		"count": 1,
		"item": {
			"aux": 0,
			"id": "diamond_sword",
			"namespace": "minecraft"
		},
		"player": {
			"color": "ff5454ff",
			"dimension": 0,
			"id": -4294967295,
			"name": "Steve",
			"position": {
				"x": 73.71974182128906,
				"y": -58.37998962402344,
				"z": 8.246631622314453
			},
			"type": "minecraft:player",
			"variant": 0,
			"yRot": 140.3938598632812
		}
	},
	"header": {
		"eventName": "ItemAcquired",
		"messagePurpose": "event",
		"version": 16842752
	}
}
{
	"body": {
		"count": 1,
		"item": {
			"aux": 0,
			"id": "diamond",
			"namespace": "minecraft"
		},
		"player": {
			"color": "ff5454ff",
			"dimension": 0,
			"id": -4294967295,
			"name": "Steve",
			"position": {
				"x": 73.71974182128906,
				"y": -58.37998962402344,
				"z": 8.246631622314453
			},
			"type": "minecraft:player",
			"variant": 0,
			"yRot": -85.80221557617188
		}
	},
	"header": {
		"eventName": "ItemDropped",
		"messagePurpose": "event",
		"version": 16842752
	}
}
{
	"body": {
		"count": 1,
		"item": {
			"aux": 0,
			"id": "flint_and_steel",
			"namespace": "minecraft"
		},
		"player": {
			"color": "ff5454ff",
			"dimension": 0,
			"id": -4294967295,
			"name": "Steve",
			"position": {
				"x": 102.4456634521484,
				"y": -56.87998962402344,
				"z": 7.888193130493164
			},
			"type": "minecraft:player",
			"variant": 0,
			"yRot": -166.0587310791016
		},
		"useMethod": 10
	},
	"header": {
		"eventName": "ItemUsed",
		"messagePurpose": "event",
		"version": 16842752
	}
}
{
	"body": {
		"armorFeet": {
			"aux": 0,
			"enchantments": [],
			"freeStackSize": 255,
			"id": "",
			"maxStackSize": 255,
			"namespace": "",
			"stackSize": 0
		},
		"armorHead": {
			"aux": 0,
			"enchantments": [],
			"freeStackSize": 255,
			"id": "",
			"maxStackSize": 255,
			"namespace": "",
			"stackSize": 0
		},
		"armorLegs": {
			"aux": 0,
			"enchantments": [],
			"freeStackSize": 255,
			"id": "",
			"maxStackSize": 255,
			"namespace": "",
			"stackSize": 0
		},
		"armorTorso": {
			"aux": 0,
			"enchantments": [],
			"freeStackSize": 255,
			"id": "",
			"maxStackSize": 255,
			"namespace": "",
			"stackSize": 0
		},
		"isMonster": true,
		"killMethodType": 2,
		"player": {
			"color": "ff5454ff",
			"dimension": 0,
			"id": -4294967295,
			"name": "Steve",
			"position": {
				"x": 82.77059173583984,
				"y": -58.37998962402344,
				"z": 12.38626670837402
			},
			"type": "minecraft:player",
			"variant": 0,
			"yRot": 109.7132263183594
		},
		"playerIsHiddenFrom": false,
		"victim": {
			"color": 0,
			"dimension": 0,
			"id": -253403070417,
			"position": {
				"x": 79.08279418945312,
				"y": -59.61716842651367,
				"z": 11.2742977142334
			},
			"type": "minecraft:slime",
			"variant": 4,
			"yRot": -68.8822250366211
		},
		"weapon": {
			"aux": 0,
			"enchantments": [
				{
					"level": 3,
					"name": "Unbreaking III",
					"type": 17
				},
				{
					"level": 3,
					"name": "Sharpness III",
					"type": 9
				}
			],
			"freeStackSize": 0,
			"id": "diamond_sword",
			"maxStackSize": 1,
			"namespace": "minecraft",
			"stackSize": 1
		}
	},
	"header": {
		"eventName": "MobKilled",
		"messagePurpose": "event",
		"version": 16842752
	}
}
{
	"body": {
		"cause": 3,
		"itemType": 1,
		"metersTravelled": 3.093452453613281,
		"player": {
			"color": "ff5454ff",
			"dimension": 0,
			"id": -4294967295,
			"name": "Steve",
			"position": {
				"x": 63.2907829284668,
				"y": -57.7457389831543,
				"z": 16.91469764709473
			},
			"type": "minecraft:player",
			"variant": 0,
			"yRot": -124.1736221313477
		}
	},
	"header": {
		"eventName": "PlayerTeleported",
		"messagePurpose": "event",
		"version": 16842752
	}
}
{
	"body": {
		"interactionType": 2,
		"mob": {
			"color": 0,
			"type": 23,
			"variant": 6
		},
		"player": {
			"color": "ff5454ff",
			"dimension": 0,
			"id": -4294967295,
			"name": "Steve",
			"position": {
				"x": 95.25657653808594,
				"y": -57.67998886108398,
				"z": 54.14621734619141
			},
			"type": "minecraft:player",
			"variant": 0,
			"yRot": 80.16116333007812
		}
	},
	"header": {
		"eventName": "MobInteracted",
		"messagePurpose": "event",
		"version": 16842752
	}
}
{
	"body": {
		"cause": 13,
		"inRaid": false,
		"killer": {
			"color": 0,
			"id": 1,
			"type": 1,
			"variant": -1
		},
		"player": {
			"color": "ff5454ff",
			"dimension": 0,
			"id": -4294967295,
			"name": "Steve",
			"position": {
				"x": 77.09322357177734,
				"y": -58.37998962402344,
				"z": -19.15469360351562
			},
			"type": "minecraft:player",
			"variant": 0,
			"yRot": 147.6947937011719
		}
	},
	"header": {
		"eventName": "PlayerDied",
		"messagePurpose": "event",
		"version": 16842752
	}
}
