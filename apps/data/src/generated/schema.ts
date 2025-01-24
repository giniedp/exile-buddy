import { sqliteTable, AnySQLiteColumn, foreignKey, integer, text, numeric, real } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const essences = sqliteTable('Essences', {
  rowid: integer().primaryKey(),
  baseItemType: integer('BaseItemType').references(() => baseItemTypes.rowid),
  hash32: integer('HASH32'),
  monsterMod: integer('MonsterMod').references(() => mods.rowid),
  craftTag: integer('CraftTag').references(() => tags.rowid),
})

export const delveCraftingModifiers = sqliteTable('DelveCraftingModifiers', {
  rowid: integer().primaryKey(),
  baseItemType: integer('BaseItemType').references(() => baseItemTypes.rowid),
  addedMods: text('AddedMods').references(() => mods.rowid),
  negativeWeightTags: text('NegativeWeight_Tags').references(() => tags.rowid),
  negativeWeightValues: text('NegativeWeight_Values'),
  forcedAddMods: text('ForcedAddMods').references(() => mods.rowid),
  forbiddenDelveCraftingTags: text('ForbiddenDelveCraftingTags'),
  allowedDelveCraftingTags: text('AllowedDelveCraftingTags'),
  canMirrorItem: numeric('CanMirrorItem'),
  corruptedEssenceChance: integer('CorruptedEssenceChance'),
  canImproveQuality: numeric('CanImproveQuality'),
  hasLuckyRolls: numeric('HasLuckyRolls'),
  sellPriceMods: text('SellPrice_Mods').references(() => mods.rowid),
  canRollWhiteSockets: numeric('CanRollWhiteSockets'),
  weightTags: text('Weight_Tags').references(() => tags.rowid),
  weightValues: text('Weight_Values'),
  delveCraftingModifierDescriptions: text('DelveCraftingModifierDescriptions'),
  blockedDelveCraftingModifierDescriptions: text('BlockedDelveCraftingModifierDescriptions'),
})

export const heistObjectives = sqliteTable('HeistObjectives', {
  rowid: integer().primaryKey(),
  baseItemType: integer('BaseItemType').references(() => baseItemTypes.rowid),
  scaling: real('Scaling'),
  name: text('Name'),
})

export const expeditionCurrency = sqliteTable('ExpeditionCurrency', {
  rowid: integer().primaryKey(),
  baseItemType: integer('BaseItemType').references(() => baseItemTypes.rowid),
})

export const scoutingReports = sqliteTable('ScoutingReports', {
  rowid: integer().primaryKey(),
  id: text('Id'),
  baseItemType: integer('BaseItemType').references(() => baseItemTypes.rowid),
  minMapTier: integer('MinMapTier'),
})

export const currencyExchange = sqliteTable('CurrencyExchange', {
  rowid: integer().primaryKey(),
  item: integer('Item').references(() => baseItemTypes.rowid),
  category: integer('Category').references(() => currencyExchangeCategories.rowid),
  subCategory: integer('SubCategory').references(() => currencyExchangeCategories.rowid),
  enabledInChallengeLeague: numeric('EnabledInChallengeLeague'),
  goldPurchaseFee: integer('GoldPurchaseFee'),
})

export const currencyExchangeCategories = sqliteTable('CurrencyExchangeCategories', {
  rowid: integer().primaryKey(),
  id: text('Id'),
  name: text('Name'),
})

export const armourTypes = sqliteTable('ArmourTypes', {
  rowid: integer().primaryKey(),
  baseItemType: integer('BaseItemType').references(() => baseItemTypes.rowid),
  armour: integer('Armour'),
  evasion: integer('Evasion'),
  energyShield: integer('EnergyShield'),
  increasedMovementSpeed: integer('IncreasedMovementSpeed'),
  ward: integer('Ward'),
})

export const baseItemTypes = sqliteTable(
  'BaseItemTypes',
  {
    rowid: integer().primaryKey(),
    id: text('Id'),
    itemClass: integer('ItemClass').references(() => itemClasses.rowid),
    width: integer('Width'),
    height: integer('Height'),
    name: text('Name'),
    inheritsFrom: text('InheritsFrom'),
    dropLevel: integer('DropLevel'),
    flavourText: integer('FlavourText').references(() => flavourText.rowid),
    implicitMods: text('Implicit_Mods').references(() => mods.rowid),
    sizeOnGround: integer('SizeOnGround'),
    soundEffect: integer('SoundEffect'),
    tags: text('Tags').references(() => tags.rowid),
    modDomain: integer('ModDomain'),
    siteVisibility: integer('SiteVisibility'),
    itemVisualIdentity: integer('ItemVisualIdentity').references(() => itemVisualIdentity.rowid),
    hash32: integer('HASH32'),
    vendorRecipeAchievementItems: text('VendorRecipe_AchievementItems'),
    inflection: text('Inflection'),
    equipAchievementItem: integer('Equip_AchievementItem'),
    isCorrupted: numeric('IsCorrupted'),
    identifyAchievementItems: text('Identify_AchievementItems'),
    identifyMagicAchievementItems: text('IdentifyMagic_AchievementItems'),
    fragmentBaseItemType: integer('FragmentBaseItemType'),
    uncutGemSoundEffect: integer('UncutGemSoundEffect'),
    tradeMarketCategory: integer('TradeMarketCategory'),
    unmodifiable: numeric('Unmodifiable'),
    achievement: text('Achievement'),
    shopTag: integer('ShopTag'),
  },
  (table) => [
    foreignKey(() => ({
      columns: [table.fragmentBaseItemType],
      foreignColumns: [table.rowid],
      name: 'BaseItemTypes_FragmentBaseItemType_BaseItemTypes_rowid_fk',
    })),
  ],
)

export const characterPanelDescriptionModes = sqliteTable('CharacterPanelDescriptionModes', {
  rowid: integer().primaryKey(),
  id: text('Id'),
  formatStringPositive: text('FormatString_Positive'),
  formatStringNegative: text('FormatString_Negative'),
})

export const colours = sqliteTable('Colours', {
  rowid: integer().primaryKey(),
  item: text('Item'),
  red: integer('Red'),
  green: integer('Green'),
  blue: integer('Blue'),
  rgbCode: text('RgbCode'),
})

export const costTypes = sqliteTable('CostTypes', {
  rowid: integer().primaryKey(),
  id: text('Id'),
  stat: integer('Stat').references(() => stats.rowid),
  formatText: text('FormatText'),
  divisor: integer('Divisor'),
  perMinute: numeric('PerMinute'),
})

export const craftingItemClassCategories = sqliteTable('CraftingItemClassCategories', {
  rowid: integer().primaryKey(),
  id: text('Id'),
  itemClasses: text('ItemClasses').references(() => itemClasses.rowid),
  text: text('Text'),
})

export const currencyItems = sqliteTable('CurrencyItems', {
  rowid: integer().primaryKey(),
  baseItemType: integer('BaseItemType').references(() => baseItemTypes.rowid),
  stackSize: integer('StackSize'),
  currencyUseType: integer('CurrencyUseType'),
  action: text('Action'),
  directions: text('Directions'),
  fullStackBaseItemType: integer('FullStack_BaseItemType').references(() => baseItemTypes.rowid),
  description: text('Description'),
  usageAchievementItems: text('Usage_AchievementItems'),
  scroll: numeric('Scroll'),
  possessionAchievementItem: integer('Possession_AchievementItem'),
  currencyTabStackSize: integer('CurrencyTab_StackSize'),
  xboxDirections: text('XBoxDirections'),
  modifyMapsAchievements: text('ModifyMapsAchievements'),
  modifyContractsAchievements: text('ModifyContractsAchievements'),
  combineAchievements: text('CombineAchievements'),
  changedForHardmode: numeric('ChangedForHardmode'),
  descriptionHardmode: text('DescriptionHardmode'),
  isGold: numeric('IsGold'),
  usageHint: text('UsageHint'),
})

export const flasks = sqliteTable('Flasks', {
  rowid: integer().primaryKey(),
  baseItemType: integer('BaseItemType').references(() => baseItemTypes.rowid),
  name: text('Name'),
  type: integer('Type'),
  lifePerUse: integer('LifePerUse'),
  manaPerUse: integer('ManaPerUse'),
  recoveryTime: integer('RecoveryTime'),
  recoveryTime2: integer('RecoveryTime2'),
  buffDefinition: integer('BuffDefinition'),
  utilityBuff: text('UtilityBuff'),
})

export const flavourText = sqliteTable('FlavourText', {
  rowid: integer().primaryKey(),
  id: text('Id'),
  hash16: integer('HASH16'),
  text: text('Text'),
})

export const gameConstants = sqliteTable('GameConstants', {
  rowid: integer().primaryKey(),
  id: text('Id'),
  value: integer('Value'),
  divisor: integer('Divisor'),
})

export const grantedEffectQualityStats = sqliteTable('GrantedEffectQualityStats', {
  rowid: integer().primaryKey(),
  grantedEffect: integer('GrantedEffect').references(() => grantedEffects.rowid),
  stats: text('Stats').references(() => stats.rowid),
  statsValuesPermille: text('StatsValuesPermille'),
  addTypes: text('AddTypes'),
  addMinionTypes: text('AddMinionTypes'),
})

export const grantedEffects = sqliteTable(
  'GrantedEffects',
  {
    rowid: integer().primaryKey(),
    id: text('Id'),
    isSupport: numeric('IsSupport'),
    allowedActiveSkillTypes: text('AllowedActiveSkillTypes'),
    supportGemLetter: text('SupportGemLetter'),
    addedActiveSkillTypes: text('AddedActiveSkillTypes'),
    excludedActiveSkillTypes: text('ExcludedActiveSkillTypes'),
    supportsGemsOnly: numeric('SupportsGemsOnly'),
    hash32: integer('HASH32'),
    cannotBeSupported: numeric('CannotBeSupported'),
    lifeLeech: integer('LifeLeech'),
    castTime: integer('CastTime'),
    activeSkill: integer('ActiveSkill'),
    ignoreMinionTypes: numeric('IgnoreMinionTypes'),
    cooldownNotRecoverDuringActive: numeric('CooldownNotRecoverDuringActive'),
    addedMinionActiveSkillTypes: text('AddedMinionActiveSkillTypes'),
    animation: integer('Animation'),
    multiPartAchievement: integer('MultiPartAchievement'),
    supportWeaponRestrictions: text('SupportWeaponRestrictions').references(() => itemClasses.rowid),
    regularVariant: integer('RegularVariant'),
    statSet: integer('StatSet').references(() => grantedEffectStatSets.rowid),
    additionalStatSets: text('AdditionalStatSets').references(() => grantedEffectStatSets.rowid),
    audio: text('Audio'),
    costTypes: text('CostTypes').references(() => costTypes.rowid),
  },
  (table) => [
    foreignKey(() => ({
      columns: [table.regularVariant],
      foreignColumns: [table.rowid],
      name: 'GrantedEffects_RegularVariant_GrantedEffects_rowid_fk',
    })),
  ],
)

export const grantedEffectsPerLevel = sqliteTable('GrantedEffectsPerLevel', {
  rowid: integer().primaryKey(),
  grantedEffect: integer('GrantedEffect').references(() => grantedEffects.rowid),
  level: integer('Level'),
  costMultiplier: integer('CostMultiplier'),
  storedUses: integer('StoredUses'),
  cooldown: integer('Cooldown'),
  cooldownBypassType: integer('CooldownBypassType'),
  vaalSouls: integer('VaalSouls'),
  vaalStoredUses: integer('VaalStoredUses'),
  cooldownGroup: integer('CooldownGroup'),
  pvPdamageMultiplier: integer('PvPDamageMultiplier'),
  soulGainPreventionDuration: integer('SoulGainPreventionDuration'),
  attackSpeedMultiplier: integer('AttackSpeedMultiplier'),
  attackTime: integer('AttackTime'),
  reservation: integer('Reservation'),
  costAmounts: text('CostAmounts'),
  effectOnPlayer: integer('EffectOnPlayer'),
})

export const grantedEffectStatSets = sqliteTable('GrantedEffectStatSets', {
  rowid: integer().primaryKey(),
  id: text('Id'),
  label: integer('Label').references(() => grantedEffectLabels.rowid),
  implicitStats: text('ImplicitStats').references(() => stats.rowid),
  constantStats: text('ConstantStats').references(() => stats.rowid),
  constantStatsValues: text('ConstantStatsValues'),
  baseEffectiveness: real('BaseEffectiveness'),
  incrementalEffectiveness: real('IncrementalEffectiveness'),
  damageIncrementalEffectiveness: real('DamageIncrementalEffectiveness'),
  copiedStats: text('CopiedStats').references(() => stats.rowid),
})

export const grantedEffectStatSetsPerLevel = sqliteTable('GrantedEffectStatSetsPerLevel', {
  rowid: integer().primaryKey(),
  statSet: integer('StatSet').references(() => grantedEffectStatSets.rowid),
  gemLevel: integer('GemLevel'),
  spellCritChance: integer('SpellCritChance'),
  attackCritChance: integer('AttackCritChance'),
  baseResolvedValues: text('BaseResolvedValues'),
  additionalStatsValues: text('AdditionalStatsValues'),
  grantedEffects: text('GrantedEffects').references(() => grantedEffects.rowid),
  additionalFlags: text('AdditionalFlags').references(() => stats.rowid),
  floatStats: text('FloatStats').references(() => stats.rowid),
  interpolationBases: text('InterpolationBases').references(() => stats.rowid),
  additionalStats: text('AdditionalStats').references(() => stats.rowid),
  statInterpolations: text('StatInterpolations'),
  floatStatsValues: text('FloatStatsValues'),
  actorLevel: real('ActorLevel'),
  baseMultiplier: integer('BaseMultiplier'),
})

export const itemClassCategories = sqliteTable('ItemClassCategories', {
  rowid: integer().primaryKey(),
  id: text('Id'),
  text: text('Text'),
})

export const itemClasses = sqliteTable('ItemClasses', {
  rowid: integer().primaryKey(),
  id: text('Id'),
  name: text('Name'),
  tradeMarketCategory: integer('TradeMarketCategory'),
  itemClassCategory: integer('ItemClassCategory').references(() => itemClassCategories.rowid),
  removedIfLeavesArea: numeric('RemovedIfLeavesArea'),
  identifyAchievements: text('IdentifyAchievements'),
  allocateToMapOwner: numeric('AllocateToMapOwner'),
  alwaysAllocate: numeric('AlwaysAllocate'),
  canHaveVeiledMods: numeric('CanHaveVeiledMods'),
  pickedUpQuest: integer('PickedUpQuest'),
  alwaysShow: numeric('AlwaysShow'),
  canBeCorrupted: numeric('CanBeCorrupted'),
  canHaveIncubators: numeric('CanHaveIncubators'),
  canHaveInfluence: numeric('CanHaveInfluence'),
  canBeDoubleCorrupted: numeric('CanBeDoubleCorrupted'),
  canHaveAspects: numeric('CanHaveAspects'),
  canTransferSkin: numeric('CanTransferSkin'),
  itemStance: integer('ItemStance'),
  canScourge: numeric('CanScourge'),
  canUpgradeRarity: numeric('CanUpgradeRarity'),
  inventoryDimensions: text('InventoryDimensions'),
  itemClassFlags: text('ItemClassFlags'),
  unmodfiable: numeric('Unmodfiable'),
  canBeFractured: numeric('CanBeFractured'),
  equipAchievement: integer('EquipAchievement'),
  usableInMapDevice: numeric('UsableInMapDevice'),
})

export const itemFrameType = sqliteTable('ItemFrameType', {
  rowid: integer().primaryKey(),
  id: text('Id'),
  doubleLine: numeric('DoubleLine'),
  headerSingle: text('HeaderSingle'),
  headerDouble: text('HeaderDouble'),
  hardmodeHeaderSingle: text('HardmodeHeaderSingle'),
  hardmodeHeaderDouble: text('HardmodeHeaderDouble'),
  color: text('Color'),
  separator: text('Separator'),
  rarity: integer('Rarity').references(() => rarity.rowid),
  displayString: integer('DisplayString'),
  colorMarkup: text('ColorMarkup'),
})

export const itemisedVisualEffect = sqliteTable('ItemisedVisualEffect', {
  rowid: integer().primaryKey(),
  effectBaseType: integer('EffectBaseType').references(() => baseItemTypes.rowid),
  visualEffect: integer('VisualEffect'),
  visualIdentity: integer('VisualIdentity').references(() => itemVisualIdentity.rowid),
  stats: text('Stats').references(() => stats.rowid),
  itemClasses: text('ItemClasses').references(() => itemClasses.rowid),
})

export const itemVisualIdentity = sqliteTable('ItemVisualIdentity', {
  rowid: integer().primaryKey(),
  id: text('Id'),
  ddsFile: text('DDSFile'),
  aoFile: text('AOFile'),
  inventorySoundEffect: integer('InventorySoundEffect'),
  hash16: integer('HASH16'),
  aoFile2: text('AOFile2'),
  marauderSmFiles: text('MarauderSMFiles'),
  rangerSmFiles: text('RangerSMFiles'),
  witchSmFiles: text('WitchSMFiles'),
  duelistDexSmFiles: text('DuelistDexSMFiles'),
  templarSmFiles: text('TemplarSMFiles'),
  shadowSmFiles: text('ShadowSMFiles'),
  scionSmFiles: text('ScionSMFiles'),
  marauderShape: text('MarauderShape'),
  rangerShape: text('RangerShape'),
  witchShape: text('WitchShape'),
  duelistShape: text('DuelistShape'),
  templarShape: text('TemplarShape'),
  shadowShape: text('ShadowShape'),
  scionShape: text('ScionShape'),
  pickupAchievementItems: text('Pickup_AchievementItems'),
  smFiles: text('SMFiles'),
  identifyAchievementItems: text('Identify_AchievementItems'),
  epkFile: text('EPKFile'),
  corruptAchievementItems: text('Corrupt_AchievementItems'),
  isAlternateArt: numeric('IsAlternateArt'),
  createCorruptedJewelAchievementItem: integer('CreateCorruptedJewelAchievementItem'),
  animationLocation: text('AnimationLocation'),
  isAtlasOfWorldsMapIcon: numeric('IsAtlasOfWorldsMapIcon'),
  isTier16Icon: numeric('IsTier16Icon'),
  composition: integer('Composition'),
})

export const modFamily = sqliteTable('ModFamily', {
  rowid: integer().primaryKey(),
  id: text('Id'),
})

export const mods = sqliteTable(
  'Mods',
  {
    rowid: integer().primaryKey(),
    id: text('Id'),
    hash16: integer('HASH16'),
    modType: integer('ModType').references(() => modType.rowid),
    level: integer('Level'),
    stat1: integer('Stat1').references(() => stats.rowid),
    stat2: integer('Stat2').references(() => stats.rowid),
    stat3: integer('Stat3').references(() => stats.rowid),
    stat4: integer('Stat4').references(() => stats.rowid),
    domain: integer('Domain'),
    name: text('Name'),
    generationType: integer('GenerationType'),
    families: text('Families').references(() => modFamily.rowid),
    stat1Value: text('Stat1Value'),
    stat2Value: text('Stat2Value'),
    stat3Value: text('Stat3Value'),
    stat4Value: text('Stat4Value'),
    spawnWeightTags: text('SpawnWeight_Tags').references(() => tags.rowid),
    spawnWeightValues: text('SpawnWeight_Values'),
    tags: text('Tags').references(() => tags.rowid),
    grantedEffectsPerLevel: text('GrantedEffectsPerLevel').references(() => grantedEffectsPerLevel.rowid),
    auraFlags: text('AuraFlags'),
    monsterMetadata: text('MonsterMetadata'),
    monsterKillAchievements: text('MonsterKillAchievements'),
    chestModType: text('ChestModType').references(() => modType.rowid),
    stat5Value: text('Stat5Value'),
    stat5: integer('Stat5').references(() => stats.rowid),
    fullAreaClearAchievementItems: text('FullAreaClear_AchievementItems'),
    achievementItems: text('AchievementItems'),
    generationWeightTags: text('GenerationWeight_Tags').references(() => tags.rowid),
    generationWeightValues: text('GenerationWeight_Values'),
    modifyMapsAchievements: text('ModifyMapsAchievements'),
    isEssenceOnlyModifier: numeric('IsEssenceOnlyModifier'),
    stat6Value: text('Stat6Value'),
    stat6: integer('Stat6').references(() => stats.rowid),
    maxLevel: integer('MaxLevel'),
    craftingItemClassRestrictions: text('CraftingItemClassRestrictions').references(() => itemClasses.rowid),
    monsterOnDeath: text('MonsterOnDeath'),
    heistAchievements: text('HeistAchievements'),
    heistSubStatValue1: integer('Heist_SubStatValue1'),
    heistSubStatValue2: integer('Heist_SubStatValue2'),
    heistStat0: integer('Heist_Stat0').references(() => stats.rowid),
    heistStat1: integer('Heist_Stat1').references(() => stats.rowid),
    heistAddStatValue1: integer('Heist_AddStatValue1'),
    heistAddStatValue2: integer('Heist_AddStatValue2'),
    influenceType: integer('InfluenceType'),
    implicitTags: text('ImplicitTags').references(() => tags.rowid),
    buffTemplate: integer('BuffTemplate'),
    archnemesisMinionMod: integer('ArchnemesisMinionMod'),
    hash32: integer('HASH32'),
    radiusJewelType: integer('RadiusJewelType'),
  },
  (table) => [
    foreignKey(() => ({
      columns: [table.archnemesisMinionMod],
      foreignColumns: [table.rowid],
      name: 'Mods_ArchnemesisMinionMod_Mods_rowid_fk',
    })),
  ],
)

export const modSellPriceTypes = sqliteTable('ModSellPriceTypes', {
  rowid: integer().primaryKey(),
  id: text('Id'),
})

export const modType = sqliteTable('ModType', {
  rowid: integer().primaryKey(),
  name: text('Name'),
  modSellPriceTypesKeys: text('ModSellPriceTypesKeys').references(() => modSellPriceTypes.rowid),
})

export const passiveSkillStatCategories = sqliteTable('PassiveSkillStatCategories', {
  rowid: integer().primaryKey(),
  id: text('Id'),
  name: text('Name'),
})

export const questItems = sqliteTable('QuestItems', {
  rowid: integer().primaryKey(),
  item: integer('Item').references(() => baseItemTypes.rowid),
  triggeredQuestFlag: integer('TriggeredQuestFlag'),
  script: text('Script'),
})

export const rarity = sqliteTable('Rarity', {
  rowid: integer().primaryKey(),
  id: text('Id'),
  minMods: integer('MinMods'),
  maxMods: integer('MaxMods'),
  maxPrefix: integer('MaxPrefix'),
  maxSuffix: integer('MaxSuffix'),
  color: text('Color'),
  text: text('Text'),
})

export const shieldTypes = sqliteTable('ShieldTypes', {
  rowid: integer().primaryKey(),
  baseItemType: integer('BaseItemType').references(() => baseItemTypes.rowid),
  block: integer('Block'),
})

export const skillGems = sqliteTable('SkillGems', {
  rowid: integer().primaryKey(),
  baseItemType: integer('BaseItemType').references(() => baseItemTypes.rowid),
  strengthRequirementPercent: integer('StrengthRequirementPercent'),
  dexterityRequirementPercent: integer('DexterityRequirementPercent'),
  intelligenceRequirementPercent: integer('IntelligenceRequirementPercent'),
  vaalVariantBaseItemType: integer('VaalVariant_BaseItemType').references(() => baseItemTypes.rowid),
  isVaalVariant: numeric('IsVaalVariant'),
  minionGlobalSkillLevelStat: integer('MinionGlobalSkillLevelStat').references(() => stats.rowid),
  gemType: integer('GemType'),
  awakened: integer('Awakened'),
  gemColour: integer('GemColour'),
  minLevelReq: integer('MinLevelReq'),
  itemExperienceType: integer('ItemExperienceType'),
  craftingTypes: text('CraftingTypes'),
  mtxSlotTypes: text('MtxSlotTypes'),
  gemEffects: text('GemEffects'),
  tutorialVideo: text('TutorialVideo'),
  uiImage: text('UI_Image'),
  craftingLevel: integer('CraftingLevel'),
})

export const statsAffectingGeneration = sqliteTable('StatsAffectingGeneration', {
  rowid: integer().primaryKey(),
  stat: integer('Stat').references(() => stats.rowid),
  statValue: integer('StatValue'),
})

export const stats = sqliteTable(
  'Stats',
  {
    rowid: integer().primaryKey(),
    id: text('Id'),
    isLocal: numeric('IsLocal'),
    isWeaponLocal: numeric('IsWeaponLocal'),
    semantic: integer('Semantic'),
    text: text('Text'),
    isVirtual: numeric('IsVirtual'),
    mainHandAliasStat: integer('MainHandAlias_Stat'),
    offHandAliasStat: integer('OffHandAlias_Stat'),
    hash32: integer('HASH32'),
    belongsActiveSkills: text('BelongsActiveSkills'),
    category: integer('Category').references(() => passiveSkillStatCategories.rowid),
    isScalable: numeric('IsScalable'),
    contextFlags: text('ContextFlags'),
    dotFlag: text('DotFlag'),
    weaponHandCheck: numeric('WeaponHandCheck'),
  },
  (table) => [
    foreignKey(() => ({
      columns: [table.offHandAliasStat],
      foreignColumns: [table.rowid],
      name: 'Stats_OffHandAlias_Stat_Stats_rowid_fk',
    })),
    foreignKey(() => ({
      columns: [table.mainHandAliasStat],
      foreignColumns: [table.rowid],
      name: 'Stats_MainHandAlias_Stat_Stats_rowid_fk',
    })),
  ],
)

export const tags = sqliteTable('Tags', {
  rowid: integer().primaryKey(),
  id: text('Id'),
  hash32: integer('HASH32'),
  displayString: text('DisplayString'),
  uiHints: text('UiHints'),
})

export const uniqueStashLayout = sqliteTable(
  'UniqueStashLayout',
  {
    rowid: integer().primaryKey(),
    wordsKey: integer('WordsKey').references(() => words.rowid),
    itemVisualIdentityKey: integer('ItemVisualIdentityKey').references(() => itemVisualIdentity.rowid),
    uniqueStashTypesKey: integer('UniqueStashTypesKey'),
    overrideWidth: integer('OverrideWidth'),
    overrideHeight: integer('OverrideHeight'),
    showIfEmptyChallengeLeague: numeric('ShowIfEmptyChallengeLeague'),
    showIfEmptyStandard: numeric('ShowIfEmptyStandard'),
    renamedVersion: integer('RenamedVersion'),
    baseVersion: integer('BaseVersion'),
    isAlternateArt: numeric('IsAlternateArt'),
  },
  (table) => [
    foreignKey(() => ({
      columns: [table.baseVersion],
      foreignColumns: [table.rowid],
      name: 'UniqueStashLayout_BaseVersion_UniqueStashLayout_rowid_fk',
    })),
    foreignKey(() => ({
      columns: [table.renamedVersion],
      foreignColumns: [table.rowid],
      name: 'UniqueStashLayout_RenamedVersion_UniqueStashLayout_rowid_fk',
    })),
  ],
)

export const weaponTypes = sqliteTable('WeaponTypes', {
  rowid: integer().primaryKey(),
  baseItemType: integer('BaseItemType').references(() => baseItemTypes.rowid),
  critical: integer('Critical'),
  speed: integer('Speed'),
  damageMin: integer('DamageMin'),
  damageMax: integer('DamageMax'),
  rangeMax: integer('RangeMax'),
})

export const words = sqliteTable('Words', {
  rowid: integer().primaryKey(),
  wordlist: integer('Wordlist'),
  text: text('Text'),
  spawnWeightTags: text('SpawnWeight_Tags').references(() => tags.rowid),
  spawnWeightValues: text('SpawnWeight_Values'),
  text2: text('Text2'),
  inflection: text('Inflection'),
})

export const statsFromSkillStats = sqliteTable('StatsFromSkillStats', {
  rowid: integer().primaryKey(),
  skillCondition: integer('SkillCondition').references(() => stats.rowid),
  grantedFlag: integer('GrantedFlag').references(() => stats.rowid),
  flagValue: numeric('FlagValue'),
})

export const statVisuals = sqliteTable('StatVisuals', {
  rowid: integer().primaryKey(),
  epkFiles: text('EPKFiles'),
})

export const attributeRequirements = sqliteTable('AttributeRequirements', {
  rowid: integer().primaryKey(),
  baseItemType: integer('BaseItemType').references(() => baseItemTypes.rowid),
  reqStr: integer('ReqStr'),
  reqInt: integer('ReqInt'),
  reqDex: integer('ReqDex'),
})

export const beltTypes = sqliteTable('BeltTypes', {
  rowid: integer().primaryKey(),
  baseItem: integer('BaseItem').references(() => baseItemTypes.rowid),
  charmSlots: integer('CharmSlots'),
})

export const grantedEffectLabels = sqliteTable('GrantedEffectLabels', {
  rowid: integer().primaryKey(),
  id: text('Id'),
  text: text('Text'),
})

export const itemInherentSkills = sqliteTable('ItemInherentSkills', {
  rowid: integer().primaryKey(),
  baseItemType: integer('BaseItemType').references(() => baseItemTypes.rowid),
  skillsGranted: text('SkillsGranted').references(() => skillGems.rowid),
  isWeapon: numeric('IsWeapon'),
})

export const itemSpirit = sqliteTable('ItemSpirit', {
  rowid: integer().primaryKey(),
  baseItemType: integer('BaseItemType').references(() => baseItemTypes.rowid),
  spiritGranted: integer('SpiritGranted'),
})

export const keywordPopups = sqliteTable('KeywordPopups', {
  rowid: integer().primaryKey(),
  id: text('Id'),
  term: text('Term'),
  definition: text('Definition'),
})

export const soulCores = sqliteTable('SoulCores', {
  rowid: integer().primaryKey(),
  baseItemType: integer('BaseItemType').references(() => baseItemTypes.rowid),
  statsWeapon: text('StatsWeapon').references(() => stats.rowid),
  statsValuesWeapon: text('StatsValuesWeapon'),
  statsArmour: text('StatsArmour').references(() => stats.rowid),
  statsValuesArmour: text('StatsValuesArmour'),
})

export const uncutGemAdditionalTiers = sqliteTable('UncutGemAdditionalTiers', {
  rowid: integer().primaryKey(),
  baseItemType: integer('BaseItemType').references(() => baseItemTypes.rowid),
  areaLevel: integer('AreaLevel'),
  tier: integer('Tier'),
  odds: integer('Odds'),
})

export const uncutGemTiers = sqliteTable('UncutGemTiers', {
  rowid: integer().primaryKey(),
  baseItemType: integer('BaseItemType').references(() => baseItemTypes.rowid),
  tier: integer('Tier'),
  areaLevel: integer('AreaLevel'),
})
