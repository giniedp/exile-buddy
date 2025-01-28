import { sqliteTable, AnySQLiteColumn, foreignKey, integer, text, numeric, real } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const essences = sqliteTable("Essences", {
	$idx: integer("$idx").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$idx),
	hash32: integer("HASH32"),
	monsterMod: integer("MonsterMod").references(() => mods.$idx),
	craftTag: integer("CraftTag").references(() => tags.$idx),
});

export const delveCraftingModifiers = sqliteTable("DelveCraftingModifiers", {
	$idx: integer("$idx").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$idx),
	addedMods: text("AddedMods").references(() => mods.$idx),
	negativeWeightTags: text("NegativeWeight_Tags").references(() => tags.$idx),
	negativeWeightValues: text("NegativeWeight_Values"),
	forcedAddMods: text("ForcedAddMods").references(() => mods.$idx),
	forbiddenDelveCraftingTags: text("ForbiddenDelveCraftingTags"),
	allowedDelveCraftingTags: text("AllowedDelveCraftingTags"),
	canMirrorItem: numeric("CanMirrorItem"),
	corruptedEssenceChance: integer("CorruptedEssenceChance"),
	canImproveQuality: numeric("CanImproveQuality"),
	hasLuckyRolls: numeric("HasLuckyRolls"),
	sellPriceMods: text("SellPrice_Mods").references(() => mods.$idx),
	canRollWhiteSockets: numeric("CanRollWhiteSockets"),
	weightTags: text("Weight_Tags").references(() => tags.$idx),
	weightValues: text("Weight_Values"),
	delveCraftingModifierDescriptions: text("DelveCraftingModifierDescriptions"),
	blockedDelveCraftingModifierDescriptions: text("BlockedDelveCraftingModifierDescriptions"),
});

export const heistObjectives = sqliteTable("HeistObjectives", {
	$idx: integer("$idx").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$idx),
	scaling: real("Scaling"),
	name: text("Name"),
});

export const expeditionCurrency = sqliteTable("ExpeditionCurrency", {
	$idx: integer("$idx").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$idx),
});

export const scoutingReports = sqliteTable("ScoutingReports", {
	$idx: integer("$idx").primaryKey(),
	id: text("Id"),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$idx),
	minMapTier: integer("MinMapTier"),
});

export const currencyExchange = sqliteTable("CurrencyExchange", {
	$idx: integer("$idx").primaryKey(),
	item: integer("Item").references(() => baseItemTypes.$idx),
	category: integer("Category").references(() => currencyExchangeCategories.$idx),
	subCategory: integer("SubCategory").references(() => currencyExchangeCategories.$idx),
	enabledInChallengeLeague: numeric("EnabledInChallengeLeague"),
	goldPurchaseFee: integer("GoldPurchaseFee"),
});

export const currencyExchangeCategories = sqliteTable("CurrencyExchangeCategories", {
	$idx: integer("$idx").primaryKey(),
	id: text("Id"),
	name: text("Name"),
});

export const armourTypes = sqliteTable("ArmourTypes", {
	$idx: integer("$idx").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$idx),
	armour: integer("Armour"),
	evasion: integer("Evasion"),
	energyShield: integer("EnergyShield"),
	increasedMovementSpeed: integer("IncreasedMovementSpeed"),
	ward: integer("Ward"),
});

export const baseItemTypes = sqliteTable("BaseItemTypes", {
	$idx: integer("$idx").primaryKey(),
	id: text("Id"),
	itemClass: integer("ItemClass").references(() => itemClasses.$idx),
	width: integer("Width"),
	height: integer("Height"),
	name: text("Name"),
	inheritsFrom: text("InheritsFrom"),
	dropLevel: integer("DropLevel"),
	flavourText: integer("FlavourText").references(() => flavourText.$idx),
	implicitMods: text("Implicit_Mods").references(() => mods.$idx),
	sizeOnGround: integer("SizeOnGround"),
	soundEffect: integer("SoundEffect"),
	tags: text("Tags").references(() => tags.$idx),
	modDomain: integer("ModDomain"),
	siteVisibility: integer("SiteVisibility"),
	itemVisualIdentity: integer("ItemVisualIdentity").references(() => itemVisualIdentity.$idx),
	hash32: integer("HASH32"),
	vendorRecipeAchievementItems: text("VendorRecipe_AchievementItems"),
	inflection: text("Inflection"),
	equipAchievementItem: integer("Equip_AchievementItem"),
	isCorrupted: numeric("IsCorrupted"),
	identifyAchievementItems: text("Identify_AchievementItems"),
	identifyMagicAchievementItems: text("IdentifyMagic_AchievementItems"),
	fragmentBaseItemType: integer("FragmentBaseItemType"),
	uncutGemSoundEffect: integer("UncutGemSoundEffect"),
	tradeMarketCategory: integer("TradeMarketCategory"),
	unmodifiable: numeric("Unmodifiable"),
	achievement: text("Achievement"),
	shopTag: integer("ShopTag"),
},
(table) => [
	foreignKey(() => ({
			columns: [table.fragmentBaseItemType],
			foreignColumns: [table.$idx],
			name: "BaseItemTypes_FragmentBaseItemType_BaseItemTypes_$idx_fk"
		})),
]);

export const characterPanelDescriptionModes = sqliteTable("CharacterPanelDescriptionModes", {
	$idx: integer("$idx").primaryKey(),
	id: text("Id"),
	formatStringPositive: text("FormatString_Positive"),
	formatStringNegative: text("FormatString_Negative"),
});

export const colours = sqliteTable("Colours", {
	$idx: integer("$idx").primaryKey(),
	item: text("Item"),
	red: integer("Red"),
	green: integer("Green"),
	blue: integer("Blue"),
	rgbCode: text("RgbCode"),
});

export const costTypes = sqliteTable("CostTypes", {
	$idx: integer("$idx").primaryKey(),
	id: text("Id"),
	stat: integer("Stat").references(() => stats.$idx),
	formatText: text("FormatText"),
	divisor: integer("Divisor"),
	perMinute: numeric("PerMinute"),
});

export const craftingItemClassCategories = sqliteTable("CraftingItemClassCategories", {
	$idx: integer("$idx").primaryKey(),
	id: text("Id"),
	itemClasses: text("ItemClasses").references(() => itemClasses.$idx),
	text: text("Text"),
});

export const currencyItems = sqliteTable("CurrencyItems", {
	$idx: integer("$idx").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$idx),
	stackSize: integer("StackSize"),
	currencyUseType: integer("CurrencyUseType"),
	action: text("Action"),
	directions: text("Directions"),
	fullStackBaseItemType: integer("FullStack_BaseItemType").references(() => baseItemTypes.$idx),
	description: text("Description"),
	usageAchievementItems: text("Usage_AchievementItems"),
	scroll: numeric("Scroll"),
	possessionAchievementItem: integer("Possession_AchievementItem"),
	currencyTabStackSize: integer("CurrencyTab_StackSize"),
	xboxDirections: text("XBoxDirections"),
	modifyMapsAchievements: text("ModifyMapsAchievements"),
	modifyContractsAchievements: text("ModifyContractsAchievements"),
	combineAchievements: text("CombineAchievements"),
	changedForHardmode: numeric("ChangedForHardmode"),
	descriptionHardmode: text("DescriptionHardmode"),
	isGold: numeric("IsGold"),
	usageHint: text("UsageHint"),
});

export const flasks = sqliteTable("Flasks", {
	$idx: integer("$idx").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$idx),
	name: text("Name"),
	type: integer("Type"),
	lifePerUse: integer("LifePerUse"),
	manaPerUse: integer("ManaPerUse"),
	recoveryTime: integer("RecoveryTime"),
	recoveryTime2: integer("RecoveryTime2"),
	buffDefinition: integer("BuffDefinition"),
	utilityBuff: text("UtilityBuff"),
});

export const flavourText = sqliteTable("FlavourText", {
	$idx: integer("$idx").primaryKey(),
	id: text("Id"),
	hash16: integer("HASH16"),
	text: text("Text"),
});

export const gameConstants = sqliteTable("GameConstants", {
	$idx: integer("$idx").primaryKey(),
	id: text("Id"),
	value: integer("Value"),
	divisor: integer("Divisor"),
});

export const grantedEffectQualityStats = sqliteTable("GrantedEffectQualityStats", {
	$idx: integer("$idx").primaryKey(),
	grantedEffect: integer("GrantedEffect").references(() => grantedEffects.$idx),
	stats: text("Stats").references(() => stats.$idx),
	statsValuesPermille: text("StatsValuesPermille"),
	addTypes: text("AddTypes"),
	addMinionTypes: text("AddMinionTypes"),
});

export const grantedEffects = sqliteTable("GrantedEffects", {
	$idx: integer("$idx").primaryKey(),
	id: text("Id"),
	isSupport: numeric("IsSupport"),
	allowedActiveSkillTypes: text("AllowedActiveSkillTypes"),
	supportGemLetter: text("SupportGemLetter"),
	addedActiveSkillTypes: text("AddedActiveSkillTypes"),
	excludedActiveSkillTypes: text("ExcludedActiveSkillTypes"),
	supportsGemsOnly: numeric("SupportsGemsOnly"),
	hash32: integer("HASH32"),
	cannotBeSupported: numeric("CannotBeSupported"),
	lifeLeech: integer("LifeLeech"),
	castTime: integer("CastTime"),
	activeSkill: integer("ActiveSkill"),
	ignoreMinionTypes: numeric("IgnoreMinionTypes"),
	cooldownNotRecoverDuringActive: numeric("CooldownNotRecoverDuringActive"),
	addedMinionActiveSkillTypes: text("AddedMinionActiveSkillTypes"),
	animation: integer("Animation"),
	multiPartAchievement: integer("MultiPartAchievement"),
	supportWeaponRestrictions: text("SupportWeaponRestrictions").references(() => itemClasses.$idx),
	regularVariant: integer("RegularVariant"),
	statSet: integer("StatSet").references(() => grantedEffectStatSets.$idx),
	additionalStatSets: text("AdditionalStatSets").references(() => grantedEffectStatSets.$idx),
	audio: text("Audio"),
	costTypes: text("CostTypes").references(() => costTypes.$idx),
},
(table) => [
	foreignKey(() => ({
			columns: [table.regularVariant],
			foreignColumns: [table.$idx],
			name: "GrantedEffects_RegularVariant_GrantedEffects_$idx_fk"
		})),
]);

export const grantedEffectsPerLevel = sqliteTable("GrantedEffectsPerLevel", {
	$idx: integer("$idx").primaryKey(),
	grantedEffect: integer("GrantedEffect").references(() => grantedEffects.$idx),
	level: integer("Level"),
	costMultiplier: integer("CostMultiplier"),
	storedUses: integer("StoredUses"),
	cooldown: integer("Cooldown"),
	cooldownBypassType: integer("CooldownBypassType"),
	vaalSouls: integer("VaalSouls"),
	vaalStoredUses: integer("VaalStoredUses"),
	cooldownGroup: integer("CooldownGroup"),
	pvPdamageMultiplier: integer("PvPDamageMultiplier"),
	soulGainPreventionDuration: integer("SoulGainPreventionDuration"),
	attackSpeedMultiplier: integer("AttackSpeedMultiplier"),
	attackTime: integer("AttackTime"),
	reservation: integer("Reservation"),
	costAmounts: text("CostAmounts"),
	effectOnPlayer: integer("EffectOnPlayer"),
});

export const grantedEffectStatSets = sqliteTable("GrantedEffectStatSets", {
	$idx: integer("$idx").primaryKey(),
	id: text("Id"),
	label: integer("Label").references(() => grantedEffectLabels.$idx),
	implicitStats: text("ImplicitStats").references(() => stats.$idx),
	constantStats: text("ConstantStats").references(() => stats.$idx),
	constantStatsValues: text("ConstantStatsValues"),
	baseEffectiveness: real("BaseEffectiveness"),
	incrementalEffectiveness: real("IncrementalEffectiveness"),
	damageIncrementalEffectiveness: real("DamageIncrementalEffectiveness"),
	copiedStats: text("CopiedStats").references(() => stats.$idx),
});

export const grantedEffectStatSetsPerLevel = sqliteTable("GrantedEffectStatSetsPerLevel", {
	$idx: integer("$idx").primaryKey(),
	statSet: integer("StatSet").references(() => grantedEffectStatSets.$idx),
	gemLevel: integer("GemLevel"),
	spellCritChance: integer("SpellCritChance"),
	attackCritChance: integer("AttackCritChance"),
	baseResolvedValues: text("BaseResolvedValues"),
	additionalStatsValues: text("AdditionalStatsValues"),
	grantedEffects: text("GrantedEffects").references(() => grantedEffects.$idx),
	additionalFlags: text("AdditionalFlags").references(() => stats.$idx),
	floatStats: text("FloatStats").references(() => stats.$idx),
	interpolationBases: text("InterpolationBases").references(() => stats.$idx),
	additionalStats: text("AdditionalStats").references(() => stats.$idx),
	statInterpolations: text("StatInterpolations"),
	floatStatsValues: text("FloatStatsValues"),
	actorLevel: real("ActorLevel"),
	baseMultiplier: integer("BaseMultiplier"),
});

export const itemClassCategories = sqliteTable("ItemClassCategories", {
	$idx: integer("$idx").primaryKey(),
	id: text("Id"),
	text: text("Text"),
});

export const itemClasses = sqliteTable("ItemClasses", {
	$idx: integer("$idx").primaryKey(),
	id: text("Id"),
	name: text("Name"),
	tradeMarketCategory: integer("TradeMarketCategory"),
	itemClassCategory: integer("ItemClassCategory").references(() => itemClassCategories.$idx),
	removedIfLeavesArea: numeric("RemovedIfLeavesArea"),
	identifyAchievements: text("IdentifyAchievements"),
	allocateToMapOwner: numeric("AllocateToMapOwner"),
	alwaysAllocate: numeric("AlwaysAllocate"),
	canHaveVeiledMods: numeric("CanHaveVeiledMods"),
	pickedUpQuest: integer("PickedUpQuest"),
	alwaysShow: numeric("AlwaysShow"),
	canBeCorrupted: numeric("CanBeCorrupted"),
	canHaveIncubators: numeric("CanHaveIncubators"),
	canHaveInfluence: numeric("CanHaveInfluence"),
	canBeDoubleCorrupted: numeric("CanBeDoubleCorrupted"),
	canHaveAspects: numeric("CanHaveAspects"),
	canTransferSkin: numeric("CanTransferSkin"),
	itemStance: integer("ItemStance"),
	canScourge: numeric("CanScourge"),
	canUpgradeRarity: numeric("CanUpgradeRarity"),
	inventoryDimensions: text("InventoryDimensions"),
	itemClassFlags: text("ItemClassFlags"),
	unmodfiable: numeric("Unmodfiable"),
	canBeFractured: numeric("CanBeFractured"),
	equipAchievement: integer("EquipAchievement"),
	usableInMapDevice: numeric("UsableInMapDevice"),
});

export const itemFrameType = sqliteTable("ItemFrameType", {
	$idx: integer("$idx").primaryKey(),
	id: text("Id"),
	doubleLine: numeric("DoubleLine"),
	headerSingle: text("HeaderSingle"),
	headerDouble: text("HeaderDouble"),
	hardmodeHeaderSingle: text("HardmodeHeaderSingle"),
	hardmodeHeaderDouble: text("HardmodeHeaderDouble"),
	color: text("Color"),
	separator: text("Separator"),
	rarity: integer("Rarity").references(() => rarity.$idx),
	displayString: integer("DisplayString"),
	colorMarkup: text("ColorMarkup"),
});

export const itemisedVisualEffect = sqliteTable("ItemisedVisualEffect", {
	$idx: integer("$idx").primaryKey(),
	effectBaseType: integer("EffectBaseType").references(() => baseItemTypes.$idx),
	visualEffect: integer("VisualEffect"),
	visualIdentity: integer("VisualIdentity").references(() => itemVisualIdentity.$idx),
	stats: text("Stats").references(() => stats.$idx),
	itemClasses: text("ItemClasses").references(() => itemClasses.$idx),
});

export const itemVisualIdentity = sqliteTable("ItemVisualIdentity", {
	$idx: integer("$idx").primaryKey(),
	id: text("Id"),
	ddsFile: text("DDSFile"),
	aoFile: text("AOFile"),
	inventorySoundEffect: integer("InventorySoundEffect"),
	hash16: integer("HASH16"),
	aoFile2: text("AOFile2"),
	marauderSmFiles: text("MarauderSMFiles"),
	rangerSmFiles: text("RangerSMFiles"),
	witchSmFiles: text("WitchSMFiles"),
	duelistDexSmFiles: text("DuelistDexSMFiles"),
	templarSmFiles: text("TemplarSMFiles"),
	shadowSmFiles: text("ShadowSMFiles"),
	scionSmFiles: text("ScionSMFiles"),
	marauderShape: text("MarauderShape"),
	rangerShape: text("RangerShape"),
	witchShape: text("WitchShape"),
	duelistShape: text("DuelistShape"),
	templarShape: text("TemplarShape"),
	shadowShape: text("ShadowShape"),
	scionShape: text("ScionShape"),
	pickupAchievementItems: text("Pickup_AchievementItems"),
	smFiles: text("SMFiles"),
	identifyAchievementItems: text("Identify_AchievementItems"),
	epkFile: text("EPKFile"),
	corruptAchievementItems: text("Corrupt_AchievementItems"),
	isAlternateArt: numeric("IsAlternateArt"),
	createCorruptedJewelAchievementItem: integer("CreateCorruptedJewelAchievementItem"),
	animationLocation: text("AnimationLocation"),
	isAtlasOfWorldsMapIcon: numeric("IsAtlasOfWorldsMapIcon"),
	isTier16Icon: numeric("IsTier16Icon"),
	composition: integer("Composition"),
});

export const modFamily = sqliteTable("ModFamily", {
	$idx: integer("$idx").primaryKey(),
	id: text("Id"),
});

export const mods = sqliteTable("Mods", {
	$idx: integer("$idx").primaryKey(),
	id: text("Id"),
	hash16: integer("HASH16"),
	modType: integer("ModType").references(() => modType.$idx),
	level: integer("Level"),
	stat1: integer("Stat1").references(() => stats.$idx),
	stat2: integer("Stat2").references(() => stats.$idx),
	stat3: integer("Stat3").references(() => stats.$idx),
	stat4: integer("Stat4").references(() => stats.$idx),
	domain: integer("Domain"),
	name: text("Name"),
	generationType: integer("GenerationType"),
	families: text("Families").references(() => modFamily.$idx),
	stat1Value: text("Stat1Value"),
	stat2Value: text("Stat2Value"),
	stat3Value: text("Stat3Value"),
	stat4Value: text("Stat4Value"),
	spawnWeightTags: text("SpawnWeight_Tags").references(() => tags.$idx),
	spawnWeightValues: text("SpawnWeight_Values"),
	tags: text("Tags").references(() => tags.$idx),
	grantedEffectsPerLevel: text("GrantedEffectsPerLevel").references(() => grantedEffectsPerLevel.$idx),
	auraFlags: text("AuraFlags"),
	monsterMetadata: text("MonsterMetadata"),
	monsterKillAchievements: text("MonsterKillAchievements"),
	chestModType: text("ChestModType").references(() => modType.$idx),
	stat5Value: text("Stat5Value"),
	stat5: integer("Stat5").references(() => stats.$idx),
	fullAreaClearAchievementItems: text("FullAreaClear_AchievementItems"),
	achievementItems: text("AchievementItems"),
	generationWeightTags: text("GenerationWeight_Tags").references(() => tags.$idx),
	generationWeightValues: text("GenerationWeight_Values"),
	modifyMapsAchievements: text("ModifyMapsAchievements"),
	isEssenceOnlyModifier: numeric("IsEssenceOnlyModifier"),
	stat6Value: text("Stat6Value"),
	stat6: integer("Stat6").references(() => stats.$idx),
	maxLevel: integer("MaxLevel"),
	craftingItemClassRestrictions: text("CraftingItemClassRestrictions").references(() => itemClasses.$idx),
	monsterOnDeath: text("MonsterOnDeath"),
	heistAchievements: text("HeistAchievements"),
	heistSubStatValue1: integer("Heist_SubStatValue1"),
	heistSubStatValue2: integer("Heist_SubStatValue2"),
	heistStat0: integer("Heist_Stat0").references(() => stats.$idx),
	heistStat1: integer("Heist_Stat1").references(() => stats.$idx),
	heistAddStatValue1: integer("Heist_AddStatValue1"),
	heistAddStatValue2: integer("Heist_AddStatValue2"),
	influenceType: integer("InfluenceType"),
	implicitTags: text("ImplicitTags").references(() => tags.$idx),
	buffTemplate: integer("BuffTemplate"),
	archnemesisMinionMod: integer("ArchnemesisMinionMod"),
	hash32: integer("HASH32"),
	radiusJewelType: integer("RadiusJewelType"),
},
(table) => [
	foreignKey(() => ({
			columns: [table.archnemesisMinionMod],
			foreignColumns: [table.$idx],
			name: "Mods_ArchnemesisMinionMod_Mods_$idx_fk"
		})),
]);

export const modSellPriceTypes = sqliteTable("ModSellPriceTypes", {
	$idx: integer("$idx").primaryKey(),
	id: text("Id"),
});

export const modType = sqliteTable("ModType", {
	$idx: integer("$idx").primaryKey(),
	name: text("Name"),
	modSellPriceTypesKeys: text("ModSellPriceTypesKeys").references(() => modSellPriceTypes.$idx),
});

export const passiveSkillStatCategories = sqliteTable("PassiveSkillStatCategories", {
	$idx: integer("$idx").primaryKey(),
	id: text("Id"),
	name: text("Name"),
});

export const questItems = sqliteTable("QuestItems", {
	$idx: integer("$idx").primaryKey(),
	item: integer("Item").references(() => baseItemTypes.$idx),
	triggeredQuestFlag: integer("TriggeredQuestFlag"),
	script: text("Script"),
});

export const rarity = sqliteTable("Rarity", {
	$idx: integer("$idx").primaryKey(),
	id: text("Id"),
	minMods: integer("MinMods"),
	maxMods: integer("MaxMods"),
	maxPrefix: integer("MaxPrefix"),
	maxSuffix: integer("MaxSuffix"),
	color: text("Color"),
	text: text("Text"),
});

export const shieldTypes = sqliteTable("ShieldTypes", {
	$idx: integer("$idx").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$idx),
	block: integer("Block"),
});

export const skillGems = sqliteTable("SkillGems", {
	$idx: integer("$idx").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$idx),
	strengthRequirementPercent: integer("StrengthRequirementPercent"),
	dexterityRequirementPercent: integer("DexterityRequirementPercent"),
	intelligenceRequirementPercent: integer("IntelligenceRequirementPercent"),
	vaalVariantBaseItemType: integer("VaalVariant_BaseItemType").references(() => baseItemTypes.$idx),
	isVaalVariant: numeric("IsVaalVariant"),
	minionGlobalSkillLevelStat: integer("MinionGlobalSkillLevelStat").references(() => stats.$idx),
	gemType: integer("GemType"),
	awakened: integer("Awakened"),
	gemColour: integer("GemColour"),
	minLevelReq: integer("MinLevelReq"),
	itemExperienceType: integer("ItemExperienceType"),
	craftingTypes: text("CraftingTypes"),
	mtxSlotTypes: text("MtxSlotTypes"),
	gemEffects: text("GemEffects"),
	tutorialVideo: text("TutorialVideo"),
	uiImage: text("UI_Image"),
	craftingLevel: integer("CraftingLevel"),
});

export const statsAffectingGeneration = sqliteTable("StatsAffectingGeneration", {
	$idx: integer("$idx").primaryKey(),
	stat: integer("Stat").references(() => stats.$idx),
	statValue: integer("StatValue"),
});

export const stats = sqliteTable("Stats", {
	$idx: integer("$idx").primaryKey(),
	id: text("Id"),
	isLocal: numeric("IsLocal"),
	isWeaponLocal: numeric("IsWeaponLocal"),
	semantic: integer("Semantic"),
	text: text("Text"),
	isVirtual: numeric("IsVirtual"),
	mainHandAliasStat: integer("MainHandAlias_Stat"),
	offHandAliasStat: integer("OffHandAlias_Stat"),
	hash32: integer("HASH32"),
	belongsActiveSkills: text("BelongsActiveSkills"),
	category: integer("Category").references(() => passiveSkillStatCategories.$idx),
	isScalable: numeric("IsScalable"),
	contextFlags: text("ContextFlags"),
	dotFlag: text("DotFlag"),
	weaponHandCheck: numeric("WeaponHandCheck"),
},
(table) => [
	foreignKey(() => ({
			columns: [table.offHandAliasStat],
			foreignColumns: [table.$idx],
			name: "Stats_OffHandAlias_Stat_Stats_$idx_fk"
		})),
	foreignKey(() => ({
			columns: [table.mainHandAliasStat],
			foreignColumns: [table.$idx],
			name: "Stats_MainHandAlias_Stat_Stats_$idx_fk"
		})),
]);

export const tags = sqliteTable("Tags", {
	$idx: integer("$idx").primaryKey(),
	id: text("Id"),
	hash32: integer("HASH32"),
	displayString: text("DisplayString"),
	uiHints: text("UiHints"),
});

export const uniqueStashLayout = sqliteTable("UniqueStashLayout", {
	$idx: integer("$idx").primaryKey(),
	wordsKey: integer("WordsKey").references(() => words.$idx),
	itemVisualIdentityKey: integer("ItemVisualIdentityKey").references(() => itemVisualIdentity.$idx),
	uniqueStashTypesKey: integer("UniqueStashTypesKey"),
	overrideWidth: integer("OverrideWidth"),
	overrideHeight: integer("OverrideHeight"),
	showIfEmptyChallengeLeague: numeric("ShowIfEmptyChallengeLeague"),
	showIfEmptyStandard: numeric("ShowIfEmptyStandard"),
	renamedVersion: integer("RenamedVersion"),
	baseVersion: integer("BaseVersion"),
	isAlternateArt: numeric("IsAlternateArt"),
},
(table) => [
	foreignKey(() => ({
			columns: [table.baseVersion],
			foreignColumns: [table.$idx],
			name: "UniqueStashLayout_BaseVersion_UniqueStashLayout_$idx_fk"
		})),
	foreignKey(() => ({
			columns: [table.renamedVersion],
			foreignColumns: [table.$idx],
			name: "UniqueStashLayout_RenamedVersion_UniqueStashLayout_$idx_fk"
		})),
]);

export const weaponTypes = sqliteTable("WeaponTypes", {
	$idx: integer("$idx").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$idx),
	critical: integer("Critical"),
	speed: integer("Speed"),
	damageMin: integer("DamageMin"),
	damageMax: integer("DamageMax"),
	rangeMax: integer("RangeMax"),
});

export const words = sqliteTable("Words", {
	$idx: integer("$idx").primaryKey(),
	wordlist: integer("Wordlist"),
	text: text("Text"),
	spawnWeightTags: text("SpawnWeight_Tags").references(() => tags.$idx),
	spawnWeightValues: text("SpawnWeight_Values"),
	text2: text("Text2"),
	inflection: text("Inflection"),
});

export const statsFromSkillStats = sqliteTable("StatsFromSkillStats", {
	$idx: integer("$idx").primaryKey(),
	skillCondition: integer("SkillCondition").references(() => stats.$idx),
	grantedFlag: integer("GrantedFlag").references(() => stats.$idx),
	flagValue: numeric("FlagValue"),
});

export const statVisuals = sqliteTable("StatVisuals", {
	$idx: integer("$idx").primaryKey(),
	epkFiles: text("EPKFiles"),
});

export const attributeRequirements = sqliteTable("AttributeRequirements", {
	$idx: integer("$idx").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$idx),
	reqStr: integer("ReqStr"),
	reqInt: integer("ReqInt"),
	reqDex: integer("ReqDex"),
});

export const beltTypes = sqliteTable("BeltTypes", {
	$idx: integer("$idx").primaryKey(),
	baseItem: integer("BaseItem").references(() => baseItemTypes.$idx),
	charmSlots: integer("CharmSlots"),
});

export const grantedEffectLabels = sqliteTable("GrantedEffectLabels", {
	$idx: integer("$idx").primaryKey(),
	id: text("Id"),
	text: text("Text"),
});

export const itemInherentSkills = sqliteTable("ItemInherentSkills", {
	$idx: integer("$idx").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$idx),
	skillsGranted: text("SkillsGranted").references(() => skillGems.$idx),
	isWeapon: numeric("IsWeapon"),
});

export const itemSpirit = sqliteTable("ItemSpirit", {
	$idx: integer("$idx").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$idx),
	spiritGranted: integer("SpiritGranted"),
});

export const keywordPopups = sqliteTable("KeywordPopups", {
	$idx: integer("$idx").primaryKey(),
	id: text("Id"),
	term: text("Term"),
	definition: text("Definition"),
});

export const soulCores = sqliteTable("SoulCores", {
	$idx: integer("$idx").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$idx),
	statsWeapon: text("StatsWeapon").references(() => stats.$idx),
	statsValuesWeapon: text("StatsValuesWeapon"),
	statsArmour: text("StatsArmour").references(() => stats.$idx),
	statsValuesArmour: text("StatsValuesArmour"),
});

export const uncutGemAdditionalTiers = sqliteTable("UncutGemAdditionalTiers", {
	$idx: integer("$idx").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$idx),
	areaLevel: integer("AreaLevel"),
	tier: integer("Tier"),
	odds: integer("Odds"),
});

export const uncutGemTiers = sqliteTable("UncutGemTiers", {
	$idx: integer("$idx").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$idx),
	tier: integer("Tier"),
	areaLevel: integer("AreaLevel"),
});

