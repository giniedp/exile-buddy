import { sqliteTable, AnySQLiteColumn, foreignKey, integer, text, numeric, real } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const essences = sqliteTable("Essences", {
	$id: integer("$id").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$id),
	hash32: integer("HASH32"),
	monsterMod: integer("MonsterMod").references(() => mods.$id),
	craftTag: integer("CraftTag").references(() => tags.$id),
});

export const delveCraftingModifiers = sqliteTable("DelveCraftingModifiers", {
	$id: integer("$id").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$id),
	addedMods: text("AddedMods").references(() => mods.$id),
	negativeWeightTags: text("NegativeWeight_Tags").references(() => tags.$id),
	negativeWeightValues: text("NegativeWeight_Values"),
	forcedAddMods: text("ForcedAddMods").references(() => mods.$id),
	forbiddenDelveCraftingTags: text("ForbiddenDelveCraftingTags"),
	allowedDelveCraftingTags: text("AllowedDelveCraftingTags"),
	canMirrorItem: numeric("CanMirrorItem"),
	corruptedEssenceChance: integer("CorruptedEssenceChance"),
	canImproveQuality: numeric("CanImproveQuality"),
	hasLuckyRolls: numeric("HasLuckyRolls"),
	sellPriceMods: text("SellPrice_Mods").references(() => mods.$id),
	canRollWhiteSockets: numeric("CanRollWhiteSockets"),
	weightTags: text("Weight_Tags").references(() => tags.$id),
	weightValues: text("Weight_Values"),
	delveCraftingModifierDescriptions: text("DelveCraftingModifierDescriptions"),
	blockedDelveCraftingModifierDescriptions: text("BlockedDelveCraftingModifierDescriptions"),
});

export const heistObjectives = sqliteTable("HeistObjectives", {
	$id: integer("$id").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$id),
	scaling: real("Scaling"),
	name: text("Name"),
});

export const expeditionCurrency = sqliteTable("ExpeditionCurrency", {
	$id: integer("$id").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$id),
});

export const scoutingReports = sqliteTable("ScoutingReports", {
	$id: integer("$id").primaryKey(),
	id: text("Id"),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$id),
	minMapTier: integer("MinMapTier"),
});

export const currencyExchange = sqliteTable("CurrencyExchange", {
	$id: integer("$id").primaryKey(),
	item: integer("Item").references(() => baseItemTypes.$id),
	category: integer("Category").references(() => currencyExchangeCategories.$id),
	subCategory: integer("SubCategory").references(() => currencyExchangeCategories.$id),
	enabledInChallengeLeague: numeric("EnabledInChallengeLeague"),
	goldPurchaseFee: integer("GoldPurchaseFee"),
});

export const currencyExchangeCategories = sqliteTable("CurrencyExchangeCategories", {
	$id: integer("$id").primaryKey(),
	id: text("Id"),
	name: text("Name"),
});

export const armourTypes = sqliteTable("ArmourTypes", {
	$id: integer("$id").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$id),
	armour: integer("Armour"),
	evasion: integer("Evasion"),
	energyShield: integer("EnergyShield"),
	increasedMovementSpeed: integer("IncreasedMovementSpeed"),
	ward: integer("Ward"),
});

export const baseItemTypes = sqliteTable("BaseItemTypes", {
	$id: integer("$id").primaryKey(),
	id: text("Id"),
	itemClass: integer("ItemClass").references(() => itemClasses.$id),
	width: integer("Width"),
	height: integer("Height"),
	name: text("Name"),
	inheritsFrom: text("InheritsFrom"),
	dropLevel: integer("DropLevel"),
	flavourText: integer("FlavourText").references(() => flavourText.$id),
	implicitMods: text("Implicit_Mods").references(() => mods.$id),
	sizeOnGround: integer("SizeOnGround"),
	soundEffect: integer("SoundEffect"),
	tags: text("Tags").references(() => tags.$id),
	modDomain: integer("ModDomain"),
	siteVisibility: integer("SiteVisibility"),
	itemVisualIdentity: integer("ItemVisualIdentity").references(() => itemVisualIdentity.$id),
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
			foreignColumns: [table.$id],
			name: "BaseItemTypes_FragmentBaseItemType_BaseItemTypes_$id_fk"
		})),
]);

export const characterPanelDescriptionModes = sqliteTable("CharacterPanelDescriptionModes", {
	$id: integer("$id").primaryKey(),
	id: text("Id"),
	formatStringPositive: text("FormatString_Positive"),
	formatStringNegative: text("FormatString_Negative"),
});

export const colours = sqliteTable("Colours", {
	$id: integer("$id").primaryKey(),
	item: text("Item"),
	red: integer("Red"),
	green: integer("Green"),
	blue: integer("Blue"),
	rgbCode: text("RgbCode"),
});

export const costTypes = sqliteTable("CostTypes", {
	$id: integer("$id").primaryKey(),
	id: text("Id"),
	stat: integer("Stat").references(() => stats.$id),
	formatText: text("FormatText"),
	divisor: integer("Divisor"),
	perMinute: numeric("PerMinute"),
});

export const craftingItemClassCategories = sqliteTable("CraftingItemClassCategories", {
	$id: integer("$id").primaryKey(),
	id: text("Id"),
	itemClasses: text("ItemClasses").references(() => itemClasses.$id),
	text: text("Text"),
});

export const currencyItems = sqliteTable("CurrencyItems", {
	$id: integer("$id").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$id),
	stackSize: integer("StackSize"),
	currencyUseType: integer("CurrencyUseType"),
	action: text("Action"),
	directions: text("Directions"),
	fullStackBaseItemType: integer("FullStack_BaseItemType").references(() => baseItemTypes.$id),
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
	$id: integer("$id").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$id),
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
	$id: integer("$id").primaryKey(),
	id: text("Id"),
	hash16: integer("HASH16"),
	text: text("Text"),
});

export const gameConstants = sqliteTable("GameConstants", {
	$id: integer("$id").primaryKey(),
	id: text("Id"),
	value: integer("Value"),
	divisor: integer("Divisor"),
});

export const grantedEffectQualityStats = sqliteTable("GrantedEffectQualityStats", {
	$id: integer("$id").primaryKey(),
	grantedEffect: integer("GrantedEffect").references(() => grantedEffects.$id),
	stats: text("Stats").references(() => stats.$id),
	statsValuesPermille: text("StatsValuesPermille"),
	addTypes: text("AddTypes"),
	addMinionTypes: text("AddMinionTypes"),
});

export const grantedEffects = sqliteTable("GrantedEffects", {
	$id: integer("$id").primaryKey(),
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
	supportWeaponRestrictions: text("SupportWeaponRestrictions").references(() => itemClasses.$id),
	regularVariant: integer("RegularVariant"),
	statSet: integer("StatSet").references(() => grantedEffectStatSets.$id),
	additionalStatSets: text("AdditionalStatSets").references(() => grantedEffectStatSets.$id),
	audio: text("Audio"),
	costTypes: text("CostTypes").references(() => costTypes.$id),
},
(table) => [
	foreignKey(() => ({
			columns: [table.regularVariant],
			foreignColumns: [table.$id],
			name: "GrantedEffects_RegularVariant_GrantedEffects_$id_fk"
		})),
]);

export const grantedEffectsPerLevel = sqliteTable("GrantedEffectsPerLevel", {
	$id: integer("$id").primaryKey(),
	grantedEffect: integer("GrantedEffect").references(() => grantedEffects.$id),
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
	$id: integer("$id").primaryKey(),
	id: text("Id"),
	label: integer("Label").references(() => grantedEffectLabels.$id),
	implicitStats: text("ImplicitStats").references(() => stats.$id),
	constantStats: text("ConstantStats").references(() => stats.$id),
	constantStatsValues: text("ConstantStatsValues"),
	baseEffectiveness: real("BaseEffectiveness"),
	incrementalEffectiveness: real("IncrementalEffectiveness"),
	damageIncrementalEffectiveness: real("DamageIncrementalEffectiveness"),
	copiedStats: text("CopiedStats").references(() => stats.$id),
});

export const grantedEffectStatSetsPerLevel = sqliteTable("GrantedEffectStatSetsPerLevel", {
	$id: integer("$id").primaryKey(),
	statSet: integer("StatSet").references(() => grantedEffectStatSets.$id),
	gemLevel: integer("GemLevel"),
	spellCritChance: integer("SpellCritChance"),
	attackCritChance: integer("AttackCritChance"),
	baseResolvedValues: text("BaseResolvedValues"),
	additionalStatsValues: text("AdditionalStatsValues"),
	grantedEffects: text("GrantedEffects").references(() => grantedEffects.$id),
	additionalFlags: text("AdditionalFlags").references(() => stats.$id),
	floatStats: text("FloatStats").references(() => stats.$id),
	interpolationBases: text("InterpolationBases").references(() => stats.$id),
	additionalStats: text("AdditionalStats").references(() => stats.$id),
	statInterpolations: text("StatInterpolations"),
	floatStatsValues: text("FloatStatsValues"),
	actorLevel: real("ActorLevel"),
	baseMultiplier: integer("BaseMultiplier"),
});

export const itemClassCategories = sqliteTable("ItemClassCategories", {
	$id: integer("$id").primaryKey(),
	id: text("Id"),
	text: text("Text"),
});

export const itemClasses = sqliteTable("ItemClasses", {
	$id: integer("$id").primaryKey(),
	id: text("Id"),
	name: text("Name"),
	tradeMarketCategory: integer("TradeMarketCategory"),
	itemClassCategory: integer("ItemClassCategory").references(() => itemClassCategories.$id),
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
	$id: integer("$id").primaryKey(),
	id: text("Id"),
	doubleLine: numeric("DoubleLine"),
	headerSingle: text("HeaderSingle"),
	headerDouble: text("HeaderDouble"),
	hardmodeHeaderSingle: text("HardmodeHeaderSingle"),
	hardmodeHeaderDouble: text("HardmodeHeaderDouble"),
	color: text("Color"),
	separator: text("Separator"),
	rarity: integer("Rarity").references(() => rarity.$id),
	displayString: integer("DisplayString"),
	colorMarkup: text("ColorMarkup"),
});

export const itemisedVisualEffect = sqliteTable("ItemisedVisualEffect", {
	$id: integer("$id").primaryKey(),
	effectBaseType: integer("EffectBaseType").references(() => baseItemTypes.$id),
	visualEffect: integer("VisualEffect"),
	visualIdentity: integer("VisualIdentity").references(() => itemVisualIdentity.$id),
	stats: text("Stats").references(() => stats.$id),
	itemClasses: text("ItemClasses").references(() => itemClasses.$id),
});

export const itemVisualIdentity = sqliteTable("ItemVisualIdentity", {
	$id: integer("$id").primaryKey(),
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
	$id: integer("$id").primaryKey(),
	id: text("Id"),
});

export const mods = sqliteTable("Mods", {
	$id: integer("$id").primaryKey(),
	id: text("Id"),
	hash16: integer("HASH16"),
	modType: integer("ModType").references(() => modType.$id),
	level: integer("Level"),
	stat1: integer("Stat1").references(() => stats.$id),
	stat2: integer("Stat2").references(() => stats.$id),
	stat3: integer("Stat3").references(() => stats.$id),
	stat4: integer("Stat4").references(() => stats.$id),
	domain: integer("Domain"),
	name: text("Name"),
	generationType: integer("GenerationType"),
	families: text("Families").references(() => modFamily.$id),
	stat1Value: text("Stat1Value"),
	stat2Value: text("Stat2Value"),
	stat3Value: text("Stat3Value"),
	stat4Value: text("Stat4Value"),
	spawnWeightTags: text("SpawnWeight_Tags").references(() => tags.$id),
	spawnWeightValues: text("SpawnWeight_Values"),
	tags: text("Tags").references(() => tags.$id),
	grantedEffectsPerLevel: text("GrantedEffectsPerLevel").references(() => grantedEffectsPerLevel.$id),
	auraFlags: text("AuraFlags"),
	monsterMetadata: text("MonsterMetadata"),
	monsterKillAchievements: text("MonsterKillAchievements"),
	chestModType: text("ChestModType").references(() => modType.$id),
	stat5Value: text("Stat5Value"),
	stat5: integer("Stat5").references(() => stats.$id),
	fullAreaClearAchievementItems: text("FullAreaClear_AchievementItems"),
	achievementItems: text("AchievementItems"),
	generationWeightTags: text("GenerationWeight_Tags").references(() => tags.$id),
	generationWeightValues: text("GenerationWeight_Values"),
	modifyMapsAchievements: text("ModifyMapsAchievements"),
	isEssenceOnlyModifier: numeric("IsEssenceOnlyModifier"),
	stat6Value: text("Stat6Value"),
	stat6: integer("Stat6").references(() => stats.$id),
	maxLevel: integer("MaxLevel"),
	craftingItemClassRestrictions: text("CraftingItemClassRestrictions").references(() => itemClasses.$id),
	monsterOnDeath: text("MonsterOnDeath"),
	heistAchievements: text("HeistAchievements"),
	heistSubStatValue1: integer("Heist_SubStatValue1"),
	heistSubStatValue2: integer("Heist_SubStatValue2"),
	heistStat0: integer("Heist_Stat0").references(() => stats.$id),
	heistStat1: integer("Heist_Stat1").references(() => stats.$id),
	heistAddStatValue1: integer("Heist_AddStatValue1"),
	heistAddStatValue2: integer("Heist_AddStatValue2"),
	influenceType: integer("InfluenceType"),
	implicitTags: text("ImplicitTags").references(() => tags.$id),
	buffTemplate: integer("BuffTemplate"),
	archnemesisMinionMod: integer("ArchnemesisMinionMod"),
	hash32: integer("HASH32"),
	radiusJewelType: integer("RadiusJewelType"),
},
(table) => [
	foreignKey(() => ({
			columns: [table.archnemesisMinionMod],
			foreignColumns: [table.$id],
			name: "Mods_ArchnemesisMinionMod_Mods_$id_fk"
		})),
]);

export const modSellPriceTypes = sqliteTable("ModSellPriceTypes", {
	$id: integer("$id").primaryKey(),
	id: text("Id"),
});

export const modType = sqliteTable("ModType", {
	$id: integer("$id").primaryKey(),
	name: text("Name"),
	modSellPriceTypesKeys: text("ModSellPriceTypesKeys").references(() => modSellPriceTypes.$id),
});

export const passiveSkillStatCategories = sqliteTable("PassiveSkillStatCategories", {
	$id: integer("$id").primaryKey(),
	id: text("Id"),
	name: text("Name"),
});

export const questItems = sqliteTable("QuestItems", {
	$id: integer("$id").primaryKey(),
	item: integer("Item").references(() => baseItemTypes.$id),
	triggeredQuestFlag: integer("TriggeredQuestFlag"),
	script: text("Script"),
});

export const rarity = sqliteTable("Rarity", {
	$id: integer("$id").primaryKey(),
	id: text("Id"),
	minMods: integer("MinMods"),
	maxMods: integer("MaxMods"),
	maxPrefix: integer("MaxPrefix"),
	maxSuffix: integer("MaxSuffix"),
	color: text("Color"),
	text: text("Text"),
});

export const shieldTypes = sqliteTable("ShieldTypes", {
	$id: integer("$id").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$id),
	block: integer("Block"),
});

export const skillGems = sqliteTable("SkillGems", {
	$id: integer("$id").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$id),
	strengthRequirementPercent: integer("StrengthRequirementPercent"),
	dexterityRequirementPercent: integer("DexterityRequirementPercent"),
	intelligenceRequirementPercent: integer("IntelligenceRequirementPercent"),
	vaalVariantBaseItemType: integer("VaalVariant_BaseItemType").references(() => baseItemTypes.$id),
	isVaalVariant: numeric("IsVaalVariant"),
	minionGlobalSkillLevelStat: integer("MinionGlobalSkillLevelStat").references(() => stats.$id),
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
	$id: integer("$id").primaryKey(),
	stat: integer("Stat").references(() => stats.$id),
	statValue: integer("StatValue"),
});

export const stats = sqliteTable("Stats", {
	$id: integer("$id").primaryKey(),
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
	category: integer("Category").references(() => passiveSkillStatCategories.$id),
	isScalable: numeric("IsScalable"),
	contextFlags: text("ContextFlags"),
	dotFlag: text("DotFlag"),
	weaponHandCheck: numeric("WeaponHandCheck"),
},
(table) => [
	foreignKey(() => ({
			columns: [table.offHandAliasStat],
			foreignColumns: [table.$id],
			name: "Stats_OffHandAlias_Stat_Stats_$id_fk"
		})),
	foreignKey(() => ({
			columns: [table.mainHandAliasStat],
			foreignColumns: [table.$id],
			name: "Stats_MainHandAlias_Stat_Stats_$id_fk"
		})),
]);

export const tags = sqliteTable("Tags", {
	$id: integer("$id").primaryKey(),
	id: text("Id"),
	hash32: integer("HASH32"),
	displayString: text("DisplayString"),
	uiHints: text("UiHints"),
});

export const uniqueStashLayout = sqliteTable("UniqueStashLayout", {
	$id: integer("$id").primaryKey(),
	wordsKey: integer("WordsKey").references(() => words.$id),
	itemVisualIdentityKey: integer("ItemVisualIdentityKey").references(() => itemVisualIdentity.$id),
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
			foreignColumns: [table.$id],
			name: "UniqueStashLayout_BaseVersion_UniqueStashLayout_$id_fk"
		})),
	foreignKey(() => ({
			columns: [table.renamedVersion],
			foreignColumns: [table.$id],
			name: "UniqueStashLayout_RenamedVersion_UniqueStashLayout_$id_fk"
		})),
]);

export const weaponTypes = sqliteTable("WeaponTypes", {
	$id: integer("$id").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$id),
	critical: integer("Critical"),
	speed: integer("Speed"),
	damageMin: integer("DamageMin"),
	damageMax: integer("DamageMax"),
	rangeMax: integer("RangeMax"),
});

export const words = sqliteTable("Words", {
	$id: integer("$id").primaryKey(),
	wordlist: integer("Wordlist"),
	text: text("Text"),
	spawnWeightTags: text("SpawnWeight_Tags").references(() => tags.$id),
	spawnWeightValues: text("SpawnWeight_Values"),
	text2: text("Text2"),
	inflection: text("Inflection"),
});

export const statsFromSkillStats = sqliteTable("StatsFromSkillStats", {
	$id: integer("$id").primaryKey(),
	skillCondition: integer("SkillCondition").references(() => stats.$id),
	grantedFlag: integer("GrantedFlag").references(() => stats.$id),
	flagValue: numeric("FlagValue"),
});

export const statVisuals = sqliteTable("StatVisuals", {
	$id: integer("$id").primaryKey(),
	epkFiles: text("EPKFiles"),
});

export const attributeRequirements = sqliteTable("AttributeRequirements", {
	$id: integer("$id").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$id),
	reqStr: integer("ReqStr"),
	reqInt: integer("ReqInt"),
	reqDex: integer("ReqDex"),
});

export const beltTypes = sqliteTable("BeltTypes", {
	$id: integer("$id").primaryKey(),
	baseItem: integer("BaseItem").references(() => baseItemTypes.$id),
	charmSlots: integer("CharmSlots"),
});

export const grantedEffectLabels = sqliteTable("GrantedEffectLabels", {
	$id: integer("$id").primaryKey(),
	id: text("Id"),
	text: text("Text"),
});

export const itemInherentSkills = sqliteTable("ItemInherentSkills", {
	$id: integer("$id").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$id),
	skillsGranted: text("SkillsGranted").references(() => skillGems.$id),
	isWeapon: numeric("IsWeapon"),
});

export const itemSpirit = sqliteTable("ItemSpirit", {
	$id: integer("$id").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$id),
	spiritGranted: integer("SpiritGranted"),
});

export const keywordPopups = sqliteTable("KeywordPopups", {
	$id: integer("$id").primaryKey(),
	id: text("Id"),
	term: text("Term"),
	definition: text("Definition"),
});

export const soulCores = sqliteTable("SoulCores", {
	$id: integer("$id").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$id),
	statsWeapon: text("StatsWeapon").references(() => stats.$id),
	statsValuesWeapon: text("StatsValuesWeapon"),
	statsArmour: text("StatsArmour").references(() => stats.$id),
	statsValuesArmour: text("StatsValuesArmour"),
});

export const uncutGemAdditionalTiers = sqliteTable("UncutGemAdditionalTiers", {
	$id: integer("$id").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$id),
	areaLevel: integer("AreaLevel"),
	tier: integer("Tier"),
	odds: integer("Odds"),
});

export const uncutGemTiers = sqliteTable("UncutGemTiers", {
	$id: integer("$id").primaryKey(),
	baseItemType: integer("BaseItemType").references(() => baseItemTypes.$id),
	tier: integer("Tier"),
	areaLevel: integer("AreaLevel"),
});

