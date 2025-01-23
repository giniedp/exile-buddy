import { sqliteTable, type AnySQLiteColumn, integer, text, numeric, real } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const essences = sqliteTable('Essences', {
  baseItemType: integer('BaseItemType'),
  hash32: integer('HASH32'),
  monsterMod: integer('MonsterMod'),
  craftTag: integer('CraftTag'),
})

export const delveCraftingModifiers = sqliteTable('DelveCraftingModifiers', {
  baseItemType: integer('BaseItemType'),
  addedMods: text('AddedMods'),
  negativeWeightTags: text('NegativeWeight_Tags'),
  negativeWeightValues: text('NegativeWeight_Values'),
  forcedAddMods: text('ForcedAddMods'),
  forbiddenDelveCraftingTags: text('ForbiddenDelveCraftingTags'),
  allowedDelveCraftingTags: text('AllowedDelveCraftingTags'),
  canMirrorItem: numeric('CanMirrorItem'),
  corruptedEssenceChance: integer('CorruptedEssenceChance'),
  canImproveQuality: numeric('CanImproveQuality'),
  hasLuckyRolls: numeric('HasLuckyRolls'),
  sellPriceMods: text('SellPrice_Mods'),
  canRollWhiteSockets: numeric('CanRollWhiteSockets'),
  weightTags: text('Weight_Tags'),
  weightValues: text('Weight_Values'),
  delveCraftingModifierDescriptions: text('DelveCraftingModifierDescriptions'),
  blockedDelveCraftingModifierDescriptions: text('BlockedDelveCraftingModifierDescriptions'),
})

export const heistObjectives = sqliteTable('HeistObjectives', {
  baseItemType: integer('BaseItemType'),
  scaling: real('Scaling'),
  name: text('Name'),
})

export const expeditionCurrency = sqliteTable('ExpeditionCurrency', {
  baseItemType: integer('BaseItemType'),
})

export const scoutingReports = sqliteTable('ScoutingReports', {
  id: text('Id'),
  baseItemType: integer('BaseItemType'),
  minMapTier: integer('MinMapTier'),
})

export const currencyExchange = sqliteTable('CurrencyExchange', {
  item: integer('Item'),
  category: integer('Category'),
  subCategory: integer('SubCategory'),
  enabledInChallengeLeague: numeric('EnabledInChallengeLeague'),
  goldPurchaseFee: integer('GoldPurchaseFee'),
})

export const currencyExchangeCategories = sqliteTable('CurrencyExchangeCategories', {
  id: text('Id'),
  name: text('Name'),
})

export const armourTypes = sqliteTable('ArmourTypes', {
  baseItemType: integer('BaseItemType'),
  armour: integer('Armour'),
  evasion: integer('Evasion'),
  energyShield: integer('EnergyShield'),
  increasedMovementSpeed: integer('IncreasedMovementSpeed'),
  ward: integer('Ward'),
})

export const baseItemTypes = sqliteTable('BaseItemTypes', {
  id: text('Id'),
  itemClass: integer('ItemClass'),
  width: integer('Width'),
  height: integer('Height'),
  name: text('Name'),
  inheritsFrom: text('InheritsFrom'),
  dropLevel: integer('DropLevel'),
  flavourText: integer('FlavourText'),
  implicitMods: text('Implicit_Mods'),
  sizeOnGround: integer('SizeOnGround'),
  soundEffect: integer('SoundEffect'),
  tags: text('Tags'),
  modDomain: integer('ModDomain'),
  siteVisibility: integer('SiteVisibility'),
  itemVisualIdentity: integer('ItemVisualIdentity'),
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
})

export const characterPanelDescriptionModes = sqliteTable('CharacterPanelDescriptionModes', {
  id: text('Id'),
  formatStringPositive: text('FormatString_Positive'),
  formatStringNegative: text('FormatString_Negative'),
})

export const colours = sqliteTable('Colours', {
  item: text('Item'),
  red: integer('Red'),
  green: integer('Green'),
  blue: integer('Blue'),
  rgbCode: text('RgbCode'),
})

export const costTypes = sqliteTable('CostTypes', {
  id: text('Id'),
  stat: integer('Stat'),
  formatText: text('FormatText'),
  divisor: integer('Divisor'),
  perMinute: numeric('PerMinute'),
})

export const craftingItemClassCategories = sqliteTable('CraftingItemClassCategories', {
  id: text('Id'),
  itemClasses: text('ItemClasses'),
  text: text('Text'),
})

export const currencyItems = sqliteTable('CurrencyItems', {
  baseItemType: integer('BaseItemType'),
  stackSize: integer('StackSize'),
  currencyUseType: integer('CurrencyUseType'),
  action: text('Action'),
  directions: text('Directions'),
  fullStackBaseItemType: integer('FullStack_BaseItemType'),
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
  baseItemType: integer('BaseItemType'),
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
  id: text('Id'),
  hash16: integer('HASH16'),
  text: text('Text'),
})

export const gameConstants = sqliteTable('GameConstants', {
  id: text('Id'),
  value: integer('Value'),
  divisor: integer('Divisor'),
})

export const grantedEffectQualityStats = sqliteTable('GrantedEffectQualityStats', {
  grantedEffect: integer('GrantedEffect'),
  stats: text('Stats'),
  statsValuesPermille: text('StatsValuesPermille'),
  addTypes: text('AddTypes'),
  addMinionTypes: text('AddMinionTypes'),
})

export const grantedEffects = sqliteTable('GrantedEffects', {
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
  supportWeaponRestrictions: text('SupportWeaponRestrictions'),
  regularVariant: integer('RegularVariant'),
  statSet: integer('StatSet'),
  additionalStatSets: text('AdditionalStatSets'),
  audio: text('Audio'),
  costTypes: text('CostTypes'),
})

export const grantedEffectsPerLevel = sqliteTable('GrantedEffectsPerLevel', {
  grantedEffect: integer('GrantedEffect'),
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
  id: text('Id'),
  label: integer('Label'),
  implicitStats: text('ImplicitStats'),
  constantStats: text('ConstantStats'),
  constantStatsValues: text('ConstantStatsValues'),
  baseEffectiveness: real('BaseEffectiveness'),
  incrementalEffectiveness: real('IncrementalEffectiveness'),
  damageIncrementalEffectiveness: real('DamageIncrementalEffectiveness'),
  copiedStats: text('CopiedStats'),
})

export const grantedEffectStatSetsPerLevel = sqliteTable('GrantedEffectStatSetsPerLevel', {
  statSet: integer('StatSet'),
  gemLevel: integer('GemLevel'),
  spellCritChance: integer('SpellCritChance'),
  attackCritChance: integer('AttackCritChance'),
  baseResolvedValues: text('BaseResolvedValues'),
  additionalStatsValues: text('AdditionalStatsValues'),
  grantedEffects: text('GrantedEffects'),
  additionalFlags: text('AdditionalFlags'),
  floatStats: text('FloatStats'),
  interpolationBases: text('InterpolationBases'),
  additionalStats: text('AdditionalStats'),
  statInterpolations: text('StatInterpolations'),
  floatStatsValues: text('FloatStatsValues'),
  actorLevel: real('ActorLevel'),
  baseMultiplier: integer('BaseMultiplier'),
})

export const itemClassCategories = sqliteTable('ItemClassCategories', {
  id: text('Id'),
  text: text('Text'),
})

export const itemClasses = sqliteTable('ItemClasses', {
  id: text('Id'),
  name: text('Name'),
  tradeMarketCategory: integer('TradeMarketCategory'),
  itemClassCategory: integer('ItemClassCategory'),
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
  id: text('Id'),
  doubleLine: numeric('DoubleLine'),
  headerSingle: text('HeaderSingle'),
  headerDouble: text('HeaderDouble'),
  hardmodeHeaderSingle: text('HardmodeHeaderSingle'),
  hardmodeHeaderDouble: text('HardmodeHeaderDouble'),
  color: text('Color'),
  separator: text('Separator'),
  rarity: integer('Rarity'),
  displayString: integer('DisplayString'),
  colorMarkup: text('ColorMarkup'),
})

export const itemisedVisualEffect = sqliteTable('ItemisedVisualEffect', {
  effectBaseType: integer('EffectBaseType'),
  visualEffect: integer('VisualEffect'),
  visualIdentity: integer('VisualIdentity'),
  stats: text('Stats'),
  itemClasses: text('ItemClasses'),
})

export const itemVisualIdentity = sqliteTable('ItemVisualIdentity', {
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
  id: text('Id'),
})

export const mods = sqliteTable('Mods', {
  id: text('Id'),
  hash16: integer('HASH16'),
  modType: integer('ModType'),
  level: integer('Level'),
  stat1: integer('Stat1'),
  stat2: integer('Stat2'),
  stat3: integer('Stat3'),
  stat4: integer('Stat4'),
  domain: integer('Domain'),
  name: text('Name'),
  generationType: integer('GenerationType'),
  families: text('Families'),
  stat1Value: text('Stat1Value'),
  stat2Value: text('Stat2Value'),
  stat3Value: text('Stat3Value'),
  stat4Value: text('Stat4Value'),
  spawnWeightTags: text('SpawnWeight_Tags'),
  spawnWeightValues: text('SpawnWeight_Values'),
  tags: text('Tags'),
  grantedEffectsPerLevel: text('GrantedEffectsPerLevel'),
  auraFlags: text('AuraFlags'),
  monsterMetadata: text('MonsterMetadata'),
  monsterKillAchievements: text('MonsterKillAchievements'),
  chestModType: text('ChestModType'),
  stat5Value: text('Stat5Value'),
  stat5: integer('Stat5'),
  fullAreaClearAchievementItems: text('FullAreaClear_AchievementItems'),
  achievementItems: text('AchievementItems'),
  generationWeightTags: text('GenerationWeight_Tags'),
  generationWeightValues: text('GenerationWeight_Values'),
  modifyMapsAchievements: text('ModifyMapsAchievements'),
  isEssenceOnlyModifier: numeric('IsEssenceOnlyModifier'),
  stat6Value: text('Stat6Value'),
  stat6: integer('Stat6'),
  maxLevel: integer('MaxLevel'),
  craftingItemClassRestrictions: text('CraftingItemClassRestrictions'),
  monsterOnDeath: text('MonsterOnDeath'),
  heistAchievements: text('HeistAchievements'),
  heistSubStatValue1: integer('Heist_SubStatValue1'),
  heistSubStatValue2: integer('Heist_SubStatValue2'),
  heistStat0: integer('Heist_Stat0'),
  heistStat1: integer('Heist_Stat1'),
  heistAddStatValue1: integer('Heist_AddStatValue1'),
  heistAddStatValue2: integer('Heist_AddStatValue2'),
  influenceType: integer('InfluenceType'),
  implicitTags: text('ImplicitTags'),
  buffTemplate: integer('BuffTemplate'),
  archnemesisMinionMod: integer('ArchnemesisMinionMod'),
  hash32: integer('HASH32'),
  radiusJewelType: integer('RadiusJewelType'),
})

export const modSellPriceTypes = sqliteTable('ModSellPriceTypes', {
  id: text('Id'),
})

export const modType = sqliteTable('ModType', {
  name: text('Name'),
  modSellPriceTypesKeys: text('ModSellPriceTypesKeys'),
})

export const passiveSkillStatCategories = sqliteTable('PassiveSkillStatCategories', {
  id: text('Id'),
  name: text('Name'),
})

export const questItems = sqliteTable('QuestItems', {
  item: integer('Item'),
  triggeredQuestFlag: integer('TriggeredQuestFlag'),
  script: text('Script'),
})

export const rarity = sqliteTable('Rarity', {
  id: text('Id'),
  minMods: integer('MinMods'),
  maxMods: integer('MaxMods'),
  maxPrefix: integer('MaxPrefix'),
  maxSuffix: integer('MaxSuffix'),
  color: text('Color'),
  text: text('Text'),
})

export const shieldTypes = sqliteTable('ShieldTypes', {
  baseItemType: integer('BaseItemType'),
  block: integer('Block'),
})

export const skillGems = sqliteTable('SkillGems', {
  baseItemType: integer('BaseItemType'),
  strengthRequirementPercent: integer('StrengthRequirementPercent'),
  dexterityRequirementPercent: integer('DexterityRequirementPercent'),
  intelligenceRequirementPercent: integer('IntelligenceRequirementPercent'),
  vaalVariantBaseItemType: integer('VaalVariant_BaseItemType'),
  isVaalVariant: numeric('IsVaalVariant'),
  minionGlobalSkillLevelStat: integer('MinionGlobalSkillLevelStat'),
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
  stat: integer('Stat'),
  statValue: integer('StatValue'),
})

export const stats = sqliteTable('Stats', {
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
  category: integer('Category'),
  isScalable: numeric('IsScalable'),
  contextFlags: text('ContextFlags'),
  dotFlag: text('DotFlag'),
  weaponHandCheck: numeric('WeaponHandCheck'),
})

export const tags = sqliteTable('Tags', {
  id: text('Id'),
  hash32: integer('HASH32'),
  displayString: text('DisplayString'),
  uiHints: text('UiHints'),
})

export const uniqueStashLayout = sqliteTable('UniqueStashLayout', {
  wordsKey: integer('WordsKey'),
  itemVisualIdentityKey: integer('ItemVisualIdentityKey'),
  uniqueStashTypesKey: integer('UniqueStashTypesKey'),
  overrideWidth: integer('OverrideWidth'),
  overrideHeight: integer('OverrideHeight'),
  showIfEmptyChallengeLeague: numeric('ShowIfEmptyChallengeLeague'),
  showIfEmptyStandard: numeric('ShowIfEmptyStandard'),
  renamedVersion: integer('RenamedVersion'),
  baseVersion: integer('BaseVersion'),
  isAlternateArt: numeric('IsAlternateArt'),
})

export const weaponTypes = sqliteTable('WeaponTypes', {
  baseItemType: integer('BaseItemType'),
  critical: integer('Critical'),
  speed: integer('Speed'),
  damageMin: integer('DamageMin'),
  damageMax: integer('DamageMax'),
  rangeMax: integer('RangeMax'),
})

export const words = sqliteTable('Words', {
  wordlist: integer('Wordlist'),
  text: text('Text'),
  spawnWeightTags: text('SpawnWeight_Tags'),
  spawnWeightValues: text('SpawnWeight_Values'),
  text2: text('Text2'),
  inflection: text('Inflection'),
})

export const statsFromSkillStats = sqliteTable('StatsFromSkillStats', {
  skillCondition: integer('SkillCondition'),
  grantedFlag: integer('GrantedFlag'),
  flagValue: numeric('FlagValue'),
})

export const statVisuals = sqliteTable('StatVisuals', {
  epkFiles: text('EPKFiles'),
})

export const attributeRequirements = sqliteTable('AttributeRequirements', {
  baseItemType: integer('BaseItemType'),
  reqStr: integer('ReqStr'),
  reqInt: integer('ReqInt'),
  reqDex: integer('ReqDex'),
})

export const beltTypes = sqliteTable('BeltTypes', {
  baseItem: integer('BaseItem'),
  charmSlots: integer('CharmSlots'),
})

export const grantedEffectLabels = sqliteTable('GrantedEffectLabels', {
  id: text('Id'),
  text: text('Text'),
})

export const itemInherentSkills = sqliteTable('ItemInherentSkills', {
  baseItemType: integer('BaseItemType'),
  skillsGranted: text('SkillsGranted'),
  isWeapon: numeric('IsWeapon'),
})

export const itemSpirit = sqliteTable('ItemSpirit', {
  baseItemType: integer('BaseItemType'),
  spiritGranted: integer('SpiritGranted'),
})

export const keywordPopups = sqliteTable('KeywordPopups', {
  id: text('Id'),
  term: text('Term'),
  definition: text('Definition'),
})

export const soulCores = sqliteTable('SoulCores', {
  baseItemType: integer('BaseItemType'),
  statsWeapon: text('StatsWeapon'),
  statsValuesWeapon: text('StatsValuesWeapon'),
  statsArmour: text('StatsArmour'),
  statsValuesArmour: text('StatsValuesArmour'),
})

export const uncutGemAdditionalTiers = sqliteTable('UncutGemAdditionalTiers', {
  baseItemType: integer('BaseItemType'),
  areaLevel: integer('AreaLevel'),
  tier: integer('Tier'),
  odds: integer('Odds'),
})

export const uncutGemTiers = sqliteTable('UncutGemTiers', {
  baseItemType: integer('BaseItemType'),
  tier: integer('Tier'),
  areaLevel: integer('AreaLevel'),
})
