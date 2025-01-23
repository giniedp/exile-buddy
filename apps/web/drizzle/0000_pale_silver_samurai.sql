-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `Essences` (
	`BaseItemType` integer,
	`HASH32` integer,
	`MonsterMod` integer,
	`CraftTag` integer
);
--> statement-breakpoint
CREATE TABLE `DelveCraftingModifiers` (
	`BaseItemType` integer,
	`AddedMods` text,
	`NegativeWeight_Tags` text,
	`NegativeWeight_Values` text,
	`ForcedAddMods` text,
	`ForbiddenDelveCraftingTags` text,
	`AllowedDelveCraftingTags` text,
	`CanMirrorItem` numeric,
	`CorruptedEssenceChance` integer,
	`CanImproveQuality` numeric,
	`HasLuckyRolls` numeric,
	`SellPrice_Mods` text,
	`CanRollWhiteSockets` numeric,
	`Weight_Tags` text,
	`Weight_Values` text,
	`DelveCraftingModifierDescriptions` text,
	`BlockedDelveCraftingModifierDescriptions` text
);
--> statement-breakpoint
CREATE TABLE `HeistObjectives` (
	`BaseItemType` integer,
	`Scaling` real,
	`Name` text
);
--> statement-breakpoint
CREATE TABLE `ExpeditionCurrency` (
	`BaseItemType` integer
);
--> statement-breakpoint
CREATE TABLE `ScoutingReports` (
	`Id` text,
	`BaseItemType` integer,
	`MinMapTier` integer
);
--> statement-breakpoint
CREATE TABLE `CurrencyExchange` (
	`Item` integer,
	`Category` integer,
	`SubCategory` integer,
	`EnabledInChallengeLeague` numeric,
	`GoldPurchaseFee` integer
);
--> statement-breakpoint
CREATE TABLE `CurrencyExchangeCategories` (
	`Id` text,
	`Name` text
);
--> statement-breakpoint
CREATE TABLE `ArmourTypes` (
	`BaseItemType` integer,
	`Armour` integer,
	`Evasion` integer,
	`EnergyShield` integer,
	`IncreasedMovementSpeed` integer,
	`Ward` integer
);
--> statement-breakpoint
CREATE TABLE `BaseItemTypes` (
	`Id` text,
	`ItemClass` integer,
	`Width` integer,
	`Height` integer,
	`Name` text,
	`InheritsFrom` text,
	`DropLevel` integer,
	`FlavourText` integer,
	`Implicit_Mods` text,
	`SizeOnGround` integer,
	`SoundEffect` integer,
	`Tags` text,
	`ModDomain` integer,
	`SiteVisibility` integer,
	`ItemVisualIdentity` integer,
	`HASH32` integer,
	`VendorRecipe_AchievementItems` text,
	`Inflection` text,
	`Equip_AchievementItem` integer,
	`IsCorrupted` numeric,
	`Identify_AchievementItems` text,
	`IdentifyMagic_AchievementItems` text,
	`FragmentBaseItemType` integer,
	`UncutGemSoundEffect` integer,
	`TradeMarketCategory` integer,
	`Unmodifiable` numeric,
	`Achievement` text,
	`ShopTag` integer
);
--> statement-breakpoint
CREATE TABLE `CharacterPanelDescriptionModes` (
	`Id` text,
	`FormatString_Positive` text,
	`FormatString_Negative` text
);
--> statement-breakpoint
CREATE TABLE `Colours` (
	`Item` text,
	`Red` integer,
	`Green` integer,
	`Blue` integer,
	`RgbCode` text
);
--> statement-breakpoint
CREATE TABLE `CostTypes` (
	`Id` text,
	`Stat` integer,
	`FormatText` text,
	`Divisor` integer,
	`PerMinute` numeric
);
--> statement-breakpoint
CREATE TABLE `CraftingItemClassCategories` (
	`Id` text,
	`ItemClasses` text,
	`Text` text
);
--> statement-breakpoint
CREATE TABLE `CurrencyItems` (
	`BaseItemType` integer,
	`StackSize` integer,
	`CurrencyUseType` integer,
	`Action` text,
	`Directions` text,
	`FullStack_BaseItemType` integer,
	`Description` text,
	`Usage_AchievementItems` text,
	`Scroll` numeric,
	`Possession_AchievementItem` integer,
	`CurrencyTab_StackSize` integer,
	`XBoxDirections` text,
	`ModifyMapsAchievements` text,
	`ModifyContractsAchievements` text,
	`CombineAchievements` text,
	`ChangedForHardmode` numeric,
	`DescriptionHardmode` text,
	`IsGold` numeric,
	`UsageHint` text
);
--> statement-breakpoint
CREATE TABLE `Flasks` (
	`BaseItemType` integer,
	`Name` text,
	`Type` integer,
	`LifePerUse` integer,
	`ManaPerUse` integer,
	`RecoveryTime` integer,
	`RecoveryTime2` integer,
	`BuffDefinition` integer,
	`UtilityBuff` text
);
--> statement-breakpoint
CREATE TABLE `FlavourText` (
	`Id` text,
	`HASH16` integer,
	`Text` text
);
--> statement-breakpoint
CREATE TABLE `GameConstants` (
	`Id` text,
	`Value` integer,
	`Divisor` integer
);
--> statement-breakpoint
CREATE TABLE `GrantedEffectQualityStats` (
	`GrantedEffect` integer,
	`Stats` text,
	`StatsValuesPermille` text,
	`AddTypes` text,
	`AddMinionTypes` text
);
--> statement-breakpoint
CREATE TABLE `GrantedEffects` (
	`Id` text,
	`IsSupport` numeric,
	`AllowedActiveSkillTypes` text,
	`SupportGemLetter` text,
	`AddedActiveSkillTypes` text,
	`ExcludedActiveSkillTypes` text,
	`SupportsGemsOnly` numeric,
	`HASH32` integer,
	`CannotBeSupported` numeric,
	`LifeLeech` integer,
	`CastTime` integer,
	`ActiveSkill` integer,
	`IgnoreMinionTypes` numeric,
	`CooldownNotRecoverDuringActive` numeric,
	`AddedMinionActiveSkillTypes` text,
	`Animation` integer,
	`MultiPartAchievement` integer,
	`SupportWeaponRestrictions` text,
	`RegularVariant` integer,
	`StatSet` integer,
	`AdditionalStatSets` text,
	`Audio` text,
	`CostTypes` text
);
--> statement-breakpoint
CREATE TABLE `GrantedEffectsPerLevel` (
	`GrantedEffect` integer,
	`Level` integer,
	`CostMultiplier` integer,
	`StoredUses` integer,
	`Cooldown` integer,
	`CooldownBypassType` integer,
	`VaalSouls` integer,
	`VaalStoredUses` integer,
	`CooldownGroup` integer,
	`PvPDamageMultiplier` integer,
	`SoulGainPreventionDuration` integer,
	`AttackSpeedMultiplier` integer,
	`AttackTime` integer,
	`Reservation` integer,
	`CostAmounts` text,
	`EffectOnPlayer` integer
);
--> statement-breakpoint
CREATE TABLE `GrantedEffectStatSets` (
	`Id` text,
	`Label` integer,
	`ImplicitStats` text,
	`ConstantStats` text,
	`ConstantStatsValues` text,
	`BaseEffectiveness` real,
	`IncrementalEffectiveness` real,
	`DamageIncrementalEffectiveness` real,
	`CopiedStats` text
);
--> statement-breakpoint
CREATE TABLE `GrantedEffectStatSetsPerLevel` (
	`StatSet` integer,
	`GemLevel` integer,
	`SpellCritChance` integer,
	`AttackCritChance` integer,
	`BaseResolvedValues` text,
	`AdditionalStatsValues` text,
	`GrantedEffects` text,
	`AdditionalFlags` text,
	`FloatStats` text,
	`InterpolationBases` text,
	`AdditionalStats` text,
	`StatInterpolations` text,
	`FloatStatsValues` text,
	`ActorLevel` real,
	`BaseMultiplier` integer
);
--> statement-breakpoint
CREATE TABLE `ItemClassCategories` (
	`Id` text,
	`Text` text
);
--> statement-breakpoint
CREATE TABLE `ItemClasses` (
	`Id` text,
	`Name` text,
	`TradeMarketCategory` integer,
	`ItemClassCategory` integer,
	`RemovedIfLeavesArea` numeric,
	`IdentifyAchievements` text,
	`AllocateToMapOwner` numeric,
	`AlwaysAllocate` numeric,
	`CanHaveVeiledMods` numeric,
	`PickedUpQuest` integer,
	`AlwaysShow` numeric,
	`CanBeCorrupted` numeric,
	`CanHaveIncubators` numeric,
	`CanHaveInfluence` numeric,
	`CanBeDoubleCorrupted` numeric,
	`CanHaveAspects` numeric,
	`CanTransferSkin` numeric,
	`ItemStance` integer,
	`CanScourge` numeric,
	`CanUpgradeRarity` numeric,
	`InventoryDimensions` text,
	`ItemClassFlags` text,
	`Unmodfiable` numeric,
	`CanBeFractured` numeric,
	`EquipAchievement` integer,
	`UsableInMapDevice` numeric
);
--> statement-breakpoint
CREATE TABLE `ItemFrameType` (
	`Id` text,
	`DoubleLine` numeric,
	`HeaderSingle` text,
	`HeaderDouble` text,
	`HardmodeHeaderSingle` text,
	`HardmodeHeaderDouble` text,
	`Color` text,
	`Separator` text,
	`Rarity` integer,
	`DisplayString` integer,
	`ColorMarkup` text
);
--> statement-breakpoint
CREATE TABLE `ItemisedVisualEffect` (
	`EffectBaseType` integer,
	`VisualEffect` integer,
	`VisualIdentity` integer,
	`Stats` text,
	`ItemClasses` text
);
--> statement-breakpoint
CREATE TABLE `ItemVisualIdentity` (
	`Id` text,
	`DDSFile` text,
	`AOFile` text,
	`InventorySoundEffect` integer,
	`HASH16` integer,
	`AOFile2` text,
	`MarauderSMFiles` text,
	`RangerSMFiles` text,
	`WitchSMFiles` text,
	`DuelistDexSMFiles` text,
	`TemplarSMFiles` text,
	`ShadowSMFiles` text,
	`ScionSMFiles` text,
	`MarauderShape` text,
	`RangerShape` text,
	`WitchShape` text,
	`DuelistShape` text,
	`TemplarShape` text,
	`ShadowShape` text,
	`ScionShape` text,
	`Pickup_AchievementItems` text,
	`SMFiles` text,
	`Identify_AchievementItems` text,
	`EPKFile` text,
	`Corrupt_AchievementItems` text,
	`IsAlternateArt` numeric,
	`CreateCorruptedJewelAchievementItem` integer,
	`AnimationLocation` text,
	`IsAtlasOfWorldsMapIcon` numeric,
	`IsTier16Icon` numeric,
	`Composition` integer
);
--> statement-breakpoint
CREATE TABLE `ModFamily` (
	`Id` text
);
--> statement-breakpoint
CREATE TABLE `Mods` (
	`Id` text,
	`HASH16` integer,
	`ModType` integer,
	`Level` integer,
	`Stat1` integer,
	`Stat2` integer,
	`Stat3` integer,
	`Stat4` integer,
	`Domain` integer,
	`Name` text,
	`GenerationType` integer,
	`Families` text,
	`Stat1Value` text,
	`Stat2Value` text,
	`Stat3Value` text,
	`Stat4Value` text,
	`SpawnWeight_Tags` text,
	`SpawnWeight_Values` text,
	`Tags` text,
	`GrantedEffectsPerLevel` text,
	`AuraFlags` text,
	`MonsterMetadata` text,
	`MonsterKillAchievements` text,
	`ChestModType` text,
	`Stat5Value` text,
	`Stat5` integer,
	`FullAreaClear_AchievementItems` text,
	`AchievementItems` text,
	`GenerationWeight_Tags` text,
	`GenerationWeight_Values` text,
	`ModifyMapsAchievements` text,
	`IsEssenceOnlyModifier` numeric,
	`Stat6Value` text,
	`Stat6` integer,
	`MaxLevel` integer,
	`CraftingItemClassRestrictions` text,
	`MonsterOnDeath` text,
	`HeistAchievements` text,
	`Heist_SubStatValue1` integer,
	`Heist_SubStatValue2` integer,
	`Heist_Stat0` integer,
	`Heist_Stat1` integer,
	`Heist_AddStatValue1` integer,
	`Heist_AddStatValue2` integer,
	`InfluenceType` integer,
	`ImplicitTags` text,
	`BuffTemplate` integer,
	`ArchnemesisMinionMod` integer,
	`HASH32` integer,
	`RadiusJewelType` integer
);
--> statement-breakpoint
CREATE TABLE `ModSellPriceTypes` (
	`Id` text
);
--> statement-breakpoint
CREATE TABLE `ModType` (
	`Name` text,
	`ModSellPriceTypesKeys` text
);
--> statement-breakpoint
CREATE TABLE `PassiveSkillStatCategories` (
	`Id` text,
	`Name` text
);
--> statement-breakpoint
CREATE TABLE `QuestItems` (
	`Item` integer,
	`TriggeredQuestFlag` integer,
	`Script` text
);
--> statement-breakpoint
CREATE TABLE `Rarity` (
	`Id` text,
	`MinMods` integer,
	`MaxMods` integer,
	`MaxPrefix` integer,
	`MaxSuffix` integer,
	`Color` text,
	`Text` text
);
--> statement-breakpoint
CREATE TABLE `ShieldTypes` (
	`BaseItemType` integer,
	`Block` integer
);
--> statement-breakpoint
CREATE TABLE `SkillGems` (
	`BaseItemType` integer,
	`StrengthRequirementPercent` integer,
	`DexterityRequirementPercent` integer,
	`IntelligenceRequirementPercent` integer,
	`VaalVariant_BaseItemType` integer,
	`IsVaalVariant` numeric,
	`MinionGlobalSkillLevelStat` integer,
	`GemType` integer,
	`Awakened` integer,
	`GemColour` integer,
	`MinLevelReq` integer,
	`ItemExperienceType` integer,
	`CraftingTypes` text,
	`MtxSlotTypes` text,
	`GemEffects` text,
	`TutorialVideo` text,
	`UI_Image` text,
	`CraftingLevel` integer
);
--> statement-breakpoint
CREATE TABLE `StatsAffectingGeneration` (
	`Stat` integer,
	`StatValue` integer
);
--> statement-breakpoint
CREATE TABLE `Stats` (
	`Id` text,
	`IsLocal` numeric,
	`IsWeaponLocal` numeric,
	`Semantic` integer,
	`Text` text,
	`IsVirtual` numeric,
	`MainHandAlias_Stat` integer,
	`OffHandAlias_Stat` integer,
	`HASH32` integer,
	`BelongsActiveSkills` text,
	`Category` integer,
	`IsScalable` numeric,
	`ContextFlags` text,
	`DotFlag` text,
	`WeaponHandCheck` numeric
);
--> statement-breakpoint
CREATE TABLE `Tags` (
	`Id` text,
	`HASH32` integer,
	`DisplayString` text,
	`UiHints` text
);
--> statement-breakpoint
CREATE TABLE `UniqueStashLayout` (
	`WordsKey` integer,
	`ItemVisualIdentityKey` integer,
	`UniqueStashTypesKey` integer,
	`OverrideWidth` integer,
	`OverrideHeight` integer,
	`ShowIfEmptyChallengeLeague` numeric,
	`ShowIfEmptyStandard` numeric,
	`RenamedVersion` integer,
	`BaseVersion` integer,
	`IsAlternateArt` numeric
);
--> statement-breakpoint
CREATE TABLE `WeaponTypes` (
	`BaseItemType` integer,
	`Critical` integer,
	`Speed` integer,
	`DamageMin` integer,
	`DamageMax` integer,
	`RangeMax` integer
);
--> statement-breakpoint
CREATE TABLE `Words` (
	`Wordlist` integer,
	`Text` text,
	`SpawnWeight_Tags` text,
	`SpawnWeight_Values` text,
	`Text2` text,
	`Inflection` text
);
--> statement-breakpoint
CREATE TABLE `StatsFromSkillStats` (
	`SkillCondition` integer,
	`GrantedFlag` integer,
	`FlagValue` numeric
);
--> statement-breakpoint
CREATE TABLE `StatVisuals` (
	`EPKFiles` text
);
--> statement-breakpoint
CREATE TABLE `AttributeRequirements` (
	`BaseItemType` integer,
	`ReqStr` integer,
	`ReqInt` integer,
	`ReqDex` integer
);
--> statement-breakpoint
CREATE TABLE `BeltTypes` (
	`BaseItem` integer,
	`CharmSlots` integer
);
--> statement-breakpoint
CREATE TABLE `GrantedEffectLabels` (
	`Id` text,
	`Text` text
);
--> statement-breakpoint
CREATE TABLE `ItemInherentSkills` (
	`BaseItemType` integer,
	`SkillsGranted` text,
	`IsWeapon` numeric
);
--> statement-breakpoint
CREATE TABLE `ItemSpirit` (
	`BaseItemType` integer,
	`SpiritGranted` integer
);
--> statement-breakpoint
CREATE TABLE `KeywordPopups` (
	`Id` text,
	`Term` text,
	`Definition` text
);
--> statement-breakpoint
CREATE TABLE `SoulCores` (
	`BaseItemType` integer,
	`StatsWeapon` text,
	`StatsValuesWeapon` text,
	`StatsArmour` text,
	`StatsValuesArmour` text
);
--> statement-breakpoint
CREATE TABLE `UncutGemAdditionalTiers` (
	`BaseItemType` integer,
	`AreaLevel` integer,
	`Tier` integer,
	`Odds` integer
);
--> statement-breakpoint
CREATE TABLE `UncutGemTiers` (
	`BaseItemType` integer,
	`Tier` integer,
	`AreaLevel` integer
);

*/