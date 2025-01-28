import { relations } from "drizzle-orm/relations";
import { tags, essences, mods, baseItemTypes, delveCraftingModifiers, heistObjectives, expeditionCurrency, scoutingReports, currencyExchangeCategories, currencyExchange, armourTypes, itemVisualIdentity, flavourText, itemClasses, stats, costTypes, craftingItemClassCategories, currencyItems, flasks, grantedEffectQualityStats, grantedEffects, grantedEffectStatSets, grantedEffectsPerLevel, grantedEffectLabels, grantedEffectStatSetsPerLevel, itemClassCategories, rarity, itemFrameType, itemisedVisualEffect, modType, modFamily, modSellPriceTypes, questItems, shieldTypes, skillGems, statsAffectingGeneration, passiveSkillStatCategories, uniqueStashLayout, words, weaponTypes, statsFromSkillStats, attributeRequirements, beltTypes, itemInherentSkills, itemSpirit, soulCores, uncutGemAdditionalTiers, uncutGemTiers } from "./schema";

export const essencesRelations = relations(essences, ({one}) => ({
	tag: one(tags, {
		fields: [essences.craftTag],
		references: [tags.$idx]
	}),
	mod: one(mods, {
		fields: [essences.monsterMod],
		references: [mods.$idx]
	}),
	baseItemType: one(baseItemTypes, {
		fields: [essences.baseItemType],
		references: [baseItemTypes.$idx]
	}),
}));

export const tagsRelations = relations(tags, ({many}) => ({
	essences: many(essences),
	delveCraftingModifiers_weightTags: many(delveCraftingModifiers, {
		relationName: "delveCraftingModifiers_weightTags_tags_$idx"
	}),
	delveCraftingModifiers_negativeWeightTags: many(delveCraftingModifiers, {
		relationName: "delveCraftingModifiers_negativeWeightTags_tags_$idx"
	}),
	baseItemTypes: many(baseItemTypes),
	mods_implicitTags: many(mods, {
		relationName: "mods_implicitTags_tags_$idx"
	}),
	mods_generationWeightTags: many(mods, {
		relationName: "mods_generationWeightTags_tags_$idx"
	}),
	mods_tags: many(mods, {
		relationName: "mods_tags_tags_$idx"
	}),
	mods_spawnWeightTags: many(mods, {
		relationName: "mods_spawnWeightTags_tags_$idx"
	}),
	words: many(words),
}));

export const modsRelations = relations(mods, ({one, many}) => ({
	essences: many(essences),
	delveCraftingModifiers_sellPriceMods: many(delveCraftingModifiers, {
		relationName: "delveCraftingModifiers_sellPriceMods_mods_$idx"
	}),
	delveCraftingModifiers_forcedAddMods: many(delveCraftingModifiers, {
		relationName: "delveCraftingModifiers_forcedAddMods_mods_$idx"
	}),
	delveCraftingModifiers_addedMods: many(delveCraftingModifiers, {
		relationName: "delveCraftingModifiers_addedMods_mods_$idx"
	}),
	baseItemTypes: many(baseItemTypes),
	mod: one(mods, {
		fields: [mods.archnemesisMinionMod],
		references: [mods.$idx],
		relationName: "mods_archnemesisMinionMod_mods_$idx"
	}),
	mods: many(mods, {
		relationName: "mods_archnemesisMinionMod_mods_$idx"
	}),
	tag_implicitTags: one(tags, {
		fields: [mods.implicitTags],
		references: [tags.$idx],
		relationName: "mods_implicitTags_tags_$idx"
	}),
	stat_heistStat1: one(stats, {
		fields: [mods.heistStat1],
		references: [stats.$idx],
		relationName: "mods_heistStat1_stats_$idx"
	}),
	stat_heistStat0: one(stats, {
		fields: [mods.heistStat0],
		references: [stats.$idx],
		relationName: "mods_heistStat0_stats_$idx"
	}),
	itemClass: one(itemClasses, {
		fields: [mods.craftingItemClassRestrictions],
		references: [itemClasses.$idx]
	}),
	stat_stat6: one(stats, {
		fields: [mods.stat6],
		references: [stats.$idx],
		relationName: "mods_stat6_stats_$idx"
	}),
	tag_generationWeightTags: one(tags, {
		fields: [mods.generationWeightTags],
		references: [tags.$idx],
		relationName: "mods_generationWeightTags_tags_$idx"
	}),
	stat_stat5: one(stats, {
		fields: [mods.stat5],
		references: [stats.$idx],
		relationName: "mods_stat5_stats_$idx"
	}),
	modType_chestModType: one(modType, {
		fields: [mods.chestModType],
		references: [modType.$idx],
		relationName: "mods_chestModType_modType_$idx"
	}),
	grantedEffectsPerLevel: one(grantedEffectsPerLevel, {
		fields: [mods.grantedEffectsPerLevel],
		references: [grantedEffectsPerLevel.$idx]
	}),
	tag_tags: one(tags, {
		fields: [mods.tags],
		references: [tags.$idx],
		relationName: "mods_tags_tags_$idx"
	}),
	tag_spawnWeightTags: one(tags, {
		fields: [mods.spawnWeightTags],
		references: [tags.$idx],
		relationName: "mods_spawnWeightTags_tags_$idx"
	}),
	modFamily: one(modFamily, {
		fields: [mods.families],
		references: [modFamily.$idx]
	}),
	stat_stat4: one(stats, {
		fields: [mods.stat4],
		references: [stats.$idx],
		relationName: "mods_stat4_stats_$idx"
	}),
	stat_stat3: one(stats, {
		fields: [mods.stat3],
		references: [stats.$idx],
		relationName: "mods_stat3_stats_$idx"
	}),
	stat_stat2: one(stats, {
		fields: [mods.stat2],
		references: [stats.$idx],
		relationName: "mods_stat2_stats_$idx"
	}),
	stat_stat1: one(stats, {
		fields: [mods.stat1],
		references: [stats.$idx],
		relationName: "mods_stat1_stats_$idx"
	}),
	modType_modType: one(modType, {
		fields: [mods.modType],
		references: [modType.$idx],
		relationName: "mods_modType_modType_$idx"
	}),
}));

export const baseItemTypesRelations = relations(baseItemTypes, ({one, many}) => ({
	essences: many(essences),
	delveCraftingModifiers: many(delveCraftingModifiers),
	heistObjectives: many(heistObjectives),
	expeditionCurrencies: many(expeditionCurrency),
	scoutingReports: many(scoutingReports),
	currencyExchanges: many(currencyExchange),
	armourTypes: many(armourTypes),
	baseItemType: one(baseItemTypes, {
		fields: [baseItemTypes.fragmentBaseItemType],
		references: [baseItemTypes.$idx],
		relationName: "baseItemTypes_fragmentBaseItemType_baseItemTypes_$idx"
	}),
	baseItemTypes: many(baseItemTypes, {
		relationName: "baseItemTypes_fragmentBaseItemType_baseItemTypes_$idx"
	}),
	itemVisualIdentity: one(itemVisualIdentity, {
		fields: [baseItemTypes.itemVisualIdentity],
		references: [itemVisualIdentity.$idx]
	}),
	tag: one(tags, {
		fields: [baseItemTypes.tags],
		references: [tags.$idx]
	}),
	mod: one(mods, {
		fields: [baseItemTypes.implicitMods],
		references: [mods.$idx]
	}),
	flavourText: one(flavourText, {
		fields: [baseItemTypes.flavourText],
		references: [flavourText.$idx]
	}),
	itemClass: one(itemClasses, {
		fields: [baseItemTypes.itemClass],
		references: [itemClasses.$idx]
	}),
	currencyItems_fullStackBaseItemType: many(currencyItems, {
		relationName: "currencyItems_fullStackBaseItemType_baseItemTypes_$idx"
	}),
	currencyItems_baseItemType: many(currencyItems, {
		relationName: "currencyItems_baseItemType_baseItemTypes_$idx"
	}),
	flasks: many(flasks),
	itemisedVisualEffects: many(itemisedVisualEffect),
	questItems: many(questItems),
	shieldTypes: many(shieldTypes),
	skillGems_vaalVariantBaseItemType: many(skillGems, {
		relationName: "skillGems_vaalVariantBaseItemType_baseItemTypes_$idx"
	}),
	skillGems_baseItemType: many(skillGems, {
		relationName: "skillGems_baseItemType_baseItemTypes_$idx"
	}),
	weaponTypes: many(weaponTypes),
	attributeRequirements: many(attributeRequirements),
	beltTypes: many(beltTypes),
	itemInherentSkills: many(itemInherentSkills),
	itemSpirits: many(itemSpirit),
	soulCores: many(soulCores),
	uncutGemAdditionalTiers: many(uncutGemAdditionalTiers),
	uncutGemTiers: many(uncutGemTiers),
}));

export const delveCraftingModifiersRelations = relations(delveCraftingModifiers, ({one}) => ({
	tag_weightTags: one(tags, {
		fields: [delveCraftingModifiers.weightTags],
		references: [tags.$idx],
		relationName: "delveCraftingModifiers_weightTags_tags_$idx"
	}),
	mod_sellPriceMods: one(mods, {
		fields: [delveCraftingModifiers.sellPriceMods],
		references: [mods.$idx],
		relationName: "delveCraftingModifiers_sellPriceMods_mods_$idx"
	}),
	mod_forcedAddMods: one(mods, {
		fields: [delveCraftingModifiers.forcedAddMods],
		references: [mods.$idx],
		relationName: "delveCraftingModifiers_forcedAddMods_mods_$idx"
	}),
	tag_negativeWeightTags: one(tags, {
		fields: [delveCraftingModifiers.negativeWeightTags],
		references: [tags.$idx],
		relationName: "delveCraftingModifiers_negativeWeightTags_tags_$idx"
	}),
	mod_addedMods: one(mods, {
		fields: [delveCraftingModifiers.addedMods],
		references: [mods.$idx],
		relationName: "delveCraftingModifiers_addedMods_mods_$idx"
	}),
	baseItemType: one(baseItemTypes, {
		fields: [delveCraftingModifiers.baseItemType],
		references: [baseItemTypes.$idx]
	}),
}));

export const heistObjectivesRelations = relations(heistObjectives, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [heistObjectives.baseItemType],
		references: [baseItemTypes.$idx]
	}),
}));

export const expeditionCurrencyRelations = relations(expeditionCurrency, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [expeditionCurrency.baseItemType],
		references: [baseItemTypes.$idx]
	}),
}));

export const scoutingReportsRelations = relations(scoutingReports, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [scoutingReports.baseItemType],
		references: [baseItemTypes.$idx]
	}),
}));

export const currencyExchangeRelations = relations(currencyExchange, ({one}) => ({
	currencyExchangeCategory_subCategory: one(currencyExchangeCategories, {
		fields: [currencyExchange.subCategory],
		references: [currencyExchangeCategories.$idx],
		relationName: "currencyExchange_subCategory_currencyExchangeCategories_$idx"
	}),
	currencyExchangeCategory_category: one(currencyExchangeCategories, {
		fields: [currencyExchange.category],
		references: [currencyExchangeCategories.$idx],
		relationName: "currencyExchange_category_currencyExchangeCategories_$idx"
	}),
	baseItemType: one(baseItemTypes, {
		fields: [currencyExchange.item],
		references: [baseItemTypes.$idx]
	}),
}));

export const currencyExchangeCategoriesRelations = relations(currencyExchangeCategories, ({many}) => ({
	currencyExchanges_subCategory: many(currencyExchange, {
		relationName: "currencyExchange_subCategory_currencyExchangeCategories_$idx"
	}),
	currencyExchanges_category: many(currencyExchange, {
		relationName: "currencyExchange_category_currencyExchangeCategories_$idx"
	}),
}));

export const armourTypesRelations = relations(armourTypes, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [armourTypes.baseItemType],
		references: [baseItemTypes.$idx]
	}),
}));

export const itemVisualIdentityRelations = relations(itemVisualIdentity, ({many}) => ({
	baseItemTypes: many(baseItemTypes),
	itemisedVisualEffects: many(itemisedVisualEffect),
	uniqueStashLayouts: many(uniqueStashLayout),
}));

export const flavourTextRelations = relations(flavourText, ({many}) => ({
	baseItemTypes: many(baseItemTypes),
}));

export const itemClassesRelations = relations(itemClasses, ({one, many}) => ({
	baseItemTypes: many(baseItemTypes),
	craftingItemClassCategories: many(craftingItemClassCategories),
	grantedEffects: many(grantedEffects),
	itemClassCategory: one(itemClassCategories, {
		fields: [itemClasses.itemClassCategory],
		references: [itemClassCategories.$idx]
	}),
	itemisedVisualEffects: many(itemisedVisualEffect),
	mods: many(mods),
}));

export const costTypesRelations = relations(costTypes, ({one, many}) => ({
	stat: one(stats, {
		fields: [costTypes.stat],
		references: [stats.$idx]
	}),
	grantedEffects: many(grantedEffects),
}));

export const statsRelations = relations(stats, ({one, many}) => ({
	costTypes: many(costTypes),
	grantedEffectQualityStats: many(grantedEffectQualityStats),
	grantedEffectStatSets_copiedStats: many(grantedEffectStatSets, {
		relationName: "grantedEffectStatSets_copiedStats_stats_$idx"
	}),
	grantedEffectStatSets_constantStats: many(grantedEffectStatSets, {
		relationName: "grantedEffectStatSets_constantStats_stats_$idx"
	}),
	grantedEffectStatSets_implicitStats: many(grantedEffectStatSets, {
		relationName: "grantedEffectStatSets_implicitStats_stats_$idx"
	}),
	grantedEffectStatSetsPerLevels_additionalStats: many(grantedEffectStatSetsPerLevel, {
		relationName: "grantedEffectStatSetsPerLevel_additionalStats_stats_$idx"
	}),
	grantedEffectStatSetsPerLevels_interpolationBases: many(grantedEffectStatSetsPerLevel, {
		relationName: "grantedEffectStatSetsPerLevel_interpolationBases_stats_$idx"
	}),
	grantedEffectStatSetsPerLevels_floatStats: many(grantedEffectStatSetsPerLevel, {
		relationName: "grantedEffectStatSetsPerLevel_floatStats_stats_$idx"
	}),
	grantedEffectStatSetsPerLevels_additionalFlags: many(grantedEffectStatSetsPerLevel, {
		relationName: "grantedEffectStatSetsPerLevel_additionalFlags_stats_$idx"
	}),
	itemisedVisualEffects: many(itemisedVisualEffect),
	mods_heistStat1: many(mods, {
		relationName: "mods_heistStat1_stats_$idx"
	}),
	mods_heistStat0: many(mods, {
		relationName: "mods_heistStat0_stats_$idx"
	}),
	mods_stat6: many(mods, {
		relationName: "mods_stat6_stats_$idx"
	}),
	mods_stat5: many(mods, {
		relationName: "mods_stat5_stats_$idx"
	}),
	mods_stat4: many(mods, {
		relationName: "mods_stat4_stats_$idx"
	}),
	mods_stat3: many(mods, {
		relationName: "mods_stat3_stats_$idx"
	}),
	mods_stat2: many(mods, {
		relationName: "mods_stat2_stats_$idx"
	}),
	mods_stat1: many(mods, {
		relationName: "mods_stat1_stats_$idx"
	}),
	skillGems: many(skillGems),
	statsAffectingGenerations: many(statsAffectingGeneration),
	passiveSkillStatCategory: one(passiveSkillStatCategories, {
		fields: [stats.category],
		references: [passiveSkillStatCategories.$idx]
	}),
	stat_offHandAliasStat: one(stats, {
		fields: [stats.offHandAliasStat],
		references: [stats.$idx],
		relationName: "stats_offHandAliasStat_stats_$idx"
	}),
	stats_offHandAliasStat: many(stats, {
		relationName: "stats_offHandAliasStat_stats_$idx"
	}),
	stat_mainHandAliasStat: one(stats, {
		fields: [stats.mainHandAliasStat],
		references: [stats.$idx],
		relationName: "stats_mainHandAliasStat_stats_$idx"
	}),
	stats_mainHandAliasStat: many(stats, {
		relationName: "stats_mainHandAliasStat_stats_$idx"
	}),
	statsFromSkillStats_grantedFlag: many(statsFromSkillStats, {
		relationName: "statsFromSkillStats_grantedFlag_stats_$idx"
	}),
	statsFromSkillStats_skillCondition: many(statsFromSkillStats, {
		relationName: "statsFromSkillStats_skillCondition_stats_$idx"
	}),
	soulCores_statsArmour: many(soulCores, {
		relationName: "soulCores_statsArmour_stats_$idx"
	}),
	soulCores_statsWeapon: many(soulCores, {
		relationName: "soulCores_statsWeapon_stats_$idx"
	}),
}));

export const craftingItemClassCategoriesRelations = relations(craftingItemClassCategories, ({one}) => ({
	itemClass: one(itemClasses, {
		fields: [craftingItemClassCategories.itemClasses],
		references: [itemClasses.$idx]
	}),
}));

export const currencyItemsRelations = relations(currencyItems, ({one}) => ({
	baseItemType_fullStackBaseItemType: one(baseItemTypes, {
		fields: [currencyItems.fullStackBaseItemType],
		references: [baseItemTypes.$idx],
		relationName: "currencyItems_fullStackBaseItemType_baseItemTypes_$idx"
	}),
	baseItemType_baseItemType: one(baseItemTypes, {
		fields: [currencyItems.baseItemType],
		references: [baseItemTypes.$idx],
		relationName: "currencyItems_baseItemType_baseItemTypes_$idx"
	}),
}));

export const flasksRelations = relations(flasks, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [flasks.baseItemType],
		references: [baseItemTypes.$idx]
	}),
}));

export const grantedEffectQualityStatsRelations = relations(grantedEffectQualityStats, ({one}) => ({
	stat: one(stats, {
		fields: [grantedEffectQualityStats.stats],
		references: [stats.$idx]
	}),
	grantedEffect: one(grantedEffects, {
		fields: [grantedEffectQualityStats.grantedEffect],
		references: [grantedEffects.$idx]
	}),
}));

export const grantedEffectsRelations = relations(grantedEffects, ({one, many}) => ({
	grantedEffectQualityStats: many(grantedEffectQualityStats),
	costType: one(costTypes, {
		fields: [grantedEffects.costTypes],
		references: [costTypes.$idx]
	}),
	grantedEffectStatSet_additionalStatSets: one(grantedEffectStatSets, {
		fields: [grantedEffects.additionalStatSets],
		references: [grantedEffectStatSets.$idx],
		relationName: "grantedEffects_additionalStatSets_grantedEffectStatSets_$idx"
	}),
	grantedEffectStatSet_statSet: one(grantedEffectStatSets, {
		fields: [grantedEffects.statSet],
		references: [grantedEffectStatSets.$idx],
		relationName: "grantedEffects_statSet_grantedEffectStatSets_$idx"
	}),
	grantedEffect: one(grantedEffects, {
		fields: [grantedEffects.regularVariant],
		references: [grantedEffects.$idx],
		relationName: "grantedEffects_regularVariant_grantedEffects_$idx"
	}),
	grantedEffects: many(grantedEffects, {
		relationName: "grantedEffects_regularVariant_grantedEffects_$idx"
	}),
	itemClass: one(itemClasses, {
		fields: [grantedEffects.supportWeaponRestrictions],
		references: [itemClasses.$idx]
	}),
	grantedEffectsPerLevels: many(grantedEffectsPerLevel),
	grantedEffectStatSetsPerLevels: many(grantedEffectStatSetsPerLevel),
}));

export const grantedEffectStatSetsRelations = relations(grantedEffectStatSets, ({one, many}) => ({
	grantedEffects_additionalStatSets: many(grantedEffects, {
		relationName: "grantedEffects_additionalStatSets_grantedEffectStatSets_$idx"
	}),
	grantedEffects_statSet: many(grantedEffects, {
		relationName: "grantedEffects_statSet_grantedEffectStatSets_$idx"
	}),
	stat_copiedStats: one(stats, {
		fields: [grantedEffectStatSets.copiedStats],
		references: [stats.$idx],
		relationName: "grantedEffectStatSets_copiedStats_stats_$idx"
	}),
	stat_constantStats: one(stats, {
		fields: [grantedEffectStatSets.constantStats],
		references: [stats.$idx],
		relationName: "grantedEffectStatSets_constantStats_stats_$idx"
	}),
	stat_implicitStats: one(stats, {
		fields: [grantedEffectStatSets.implicitStats],
		references: [stats.$idx],
		relationName: "grantedEffectStatSets_implicitStats_stats_$idx"
	}),
	grantedEffectLabel: one(grantedEffectLabels, {
		fields: [grantedEffectStatSets.label],
		references: [grantedEffectLabels.$idx]
	}),
	grantedEffectStatSetsPerLevels: many(grantedEffectStatSetsPerLevel),
}));

export const grantedEffectsPerLevelRelations = relations(grantedEffectsPerLevel, ({one, many}) => ({
	grantedEffect: one(grantedEffects, {
		fields: [grantedEffectsPerLevel.grantedEffect],
		references: [grantedEffects.$idx]
	}),
	mods: many(mods),
}));

export const grantedEffectLabelsRelations = relations(grantedEffectLabels, ({many}) => ({
	grantedEffectStatSets: many(grantedEffectStatSets),
}));

export const grantedEffectStatSetsPerLevelRelations = relations(grantedEffectStatSetsPerLevel, ({one}) => ({
	stat_additionalStats: one(stats, {
		fields: [grantedEffectStatSetsPerLevel.additionalStats],
		references: [stats.$idx],
		relationName: "grantedEffectStatSetsPerLevel_additionalStats_stats_$idx"
	}),
	stat_interpolationBases: one(stats, {
		fields: [grantedEffectStatSetsPerLevel.interpolationBases],
		references: [stats.$idx],
		relationName: "grantedEffectStatSetsPerLevel_interpolationBases_stats_$idx"
	}),
	stat_floatStats: one(stats, {
		fields: [grantedEffectStatSetsPerLevel.floatStats],
		references: [stats.$idx],
		relationName: "grantedEffectStatSetsPerLevel_floatStats_stats_$idx"
	}),
	stat_additionalFlags: one(stats, {
		fields: [grantedEffectStatSetsPerLevel.additionalFlags],
		references: [stats.$idx],
		relationName: "grantedEffectStatSetsPerLevel_additionalFlags_stats_$idx"
	}),
	grantedEffect: one(grantedEffects, {
		fields: [grantedEffectStatSetsPerLevel.grantedEffects],
		references: [grantedEffects.$idx]
	}),
	grantedEffectStatSet: one(grantedEffectStatSets, {
		fields: [grantedEffectStatSetsPerLevel.statSet],
		references: [grantedEffectStatSets.$idx]
	}),
}));

export const itemClassCategoriesRelations = relations(itemClassCategories, ({many}) => ({
	itemClasses: many(itemClasses),
}));

export const itemFrameTypeRelations = relations(itemFrameType, ({one}) => ({
	rarity: one(rarity, {
		fields: [itemFrameType.rarity],
		references: [rarity.$idx]
	}),
}));

export const rarityRelations = relations(rarity, ({many}) => ({
	itemFrameTypes: many(itemFrameType),
}));

export const itemisedVisualEffectRelations = relations(itemisedVisualEffect, ({one}) => ({
	itemClass: one(itemClasses, {
		fields: [itemisedVisualEffect.itemClasses],
		references: [itemClasses.$idx]
	}),
	stat: one(stats, {
		fields: [itemisedVisualEffect.stats],
		references: [stats.$idx]
	}),
	itemVisualIdentity: one(itemVisualIdentity, {
		fields: [itemisedVisualEffect.visualIdentity],
		references: [itemVisualIdentity.$idx]
	}),
	baseItemType: one(baseItemTypes, {
		fields: [itemisedVisualEffect.effectBaseType],
		references: [baseItemTypes.$idx]
	}),
}));

export const modTypeRelations = relations(modType, ({one, many}) => ({
	mods_chestModType: many(mods, {
		relationName: "mods_chestModType_modType_$idx"
	}),
	mods_modType: many(mods, {
		relationName: "mods_modType_modType_$idx"
	}),
	modSellPriceType: one(modSellPriceTypes, {
		fields: [modType.modSellPriceTypesKeys],
		references: [modSellPriceTypes.$idx]
	}),
}));

export const modFamilyRelations = relations(modFamily, ({many}) => ({
	mods: many(mods),
}));

export const modSellPriceTypesRelations = relations(modSellPriceTypes, ({many}) => ({
	modTypes: many(modType),
}));

export const questItemsRelations = relations(questItems, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [questItems.item],
		references: [baseItemTypes.$idx]
	}),
}));

export const shieldTypesRelations = relations(shieldTypes, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [shieldTypes.baseItemType],
		references: [baseItemTypes.$idx]
	}),
}));

export const skillGemsRelations = relations(skillGems, ({one, many}) => ({
	stat: one(stats, {
		fields: [skillGems.minionGlobalSkillLevelStat],
		references: [stats.$idx]
	}),
	baseItemType_vaalVariantBaseItemType: one(baseItemTypes, {
		fields: [skillGems.vaalVariantBaseItemType],
		references: [baseItemTypes.$idx],
		relationName: "skillGems_vaalVariantBaseItemType_baseItemTypes_$idx"
	}),
	baseItemType_baseItemType: one(baseItemTypes, {
		fields: [skillGems.baseItemType],
		references: [baseItemTypes.$idx],
		relationName: "skillGems_baseItemType_baseItemTypes_$idx"
	}),
	itemInherentSkills: many(itemInherentSkills),
}));

export const statsAffectingGenerationRelations = relations(statsAffectingGeneration, ({one}) => ({
	stat: one(stats, {
		fields: [statsAffectingGeneration.stat],
		references: [stats.$idx]
	}),
}));

export const passiveSkillStatCategoriesRelations = relations(passiveSkillStatCategories, ({many}) => ({
	stats: many(stats),
}));

export const uniqueStashLayoutRelations = relations(uniqueStashLayout, ({one, many}) => ({
	uniqueStashLayout_baseVersion: one(uniqueStashLayout, {
		fields: [uniqueStashLayout.baseVersion],
		references: [uniqueStashLayout.$idx],
		relationName: "uniqueStashLayout_baseVersion_uniqueStashLayout_$idx"
	}),
	uniqueStashLayouts_baseVersion: many(uniqueStashLayout, {
		relationName: "uniqueStashLayout_baseVersion_uniqueStashLayout_$idx"
	}),
	uniqueStashLayout_renamedVersion: one(uniqueStashLayout, {
		fields: [uniqueStashLayout.renamedVersion],
		references: [uniqueStashLayout.$idx],
		relationName: "uniqueStashLayout_renamedVersion_uniqueStashLayout_$idx"
	}),
	uniqueStashLayouts_renamedVersion: many(uniqueStashLayout, {
		relationName: "uniqueStashLayout_renamedVersion_uniqueStashLayout_$idx"
	}),
	itemVisualIdentity: one(itemVisualIdentity, {
		fields: [uniqueStashLayout.itemVisualIdentityKey],
		references: [itemVisualIdentity.$idx]
	}),
	word: one(words, {
		fields: [uniqueStashLayout.wordsKey],
		references: [words.$idx]
	}),
}));

export const wordsRelations = relations(words, ({one, many}) => ({
	uniqueStashLayouts: many(uniqueStashLayout),
	tag: one(tags, {
		fields: [words.spawnWeightTags],
		references: [tags.$idx]
	}),
}));

export const weaponTypesRelations = relations(weaponTypes, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [weaponTypes.baseItemType],
		references: [baseItemTypes.$idx]
	}),
}));

export const statsFromSkillStatsRelations = relations(statsFromSkillStats, ({one}) => ({
	stat_grantedFlag: one(stats, {
		fields: [statsFromSkillStats.grantedFlag],
		references: [stats.$idx],
		relationName: "statsFromSkillStats_grantedFlag_stats_$idx"
	}),
	stat_skillCondition: one(stats, {
		fields: [statsFromSkillStats.skillCondition],
		references: [stats.$idx],
		relationName: "statsFromSkillStats_skillCondition_stats_$idx"
	}),
}));

export const attributeRequirementsRelations = relations(attributeRequirements, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [attributeRequirements.baseItemType],
		references: [baseItemTypes.$idx]
	}),
}));

export const beltTypesRelations = relations(beltTypes, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [beltTypes.baseItem],
		references: [baseItemTypes.$idx]
	}),
}));

export const itemInherentSkillsRelations = relations(itemInherentSkills, ({one}) => ({
	skillGem: one(skillGems, {
		fields: [itemInherentSkills.skillsGranted],
		references: [skillGems.$idx]
	}),
	baseItemType: one(baseItemTypes, {
		fields: [itemInherentSkills.baseItemType],
		references: [baseItemTypes.$idx]
	}),
}));

export const itemSpiritRelations = relations(itemSpirit, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [itemSpirit.baseItemType],
		references: [baseItemTypes.$idx]
	}),
}));

export const soulCoresRelations = relations(soulCores, ({one}) => ({
	stat_statsArmour: one(stats, {
		fields: [soulCores.statsArmour],
		references: [stats.$idx],
		relationName: "soulCores_statsArmour_stats_$idx"
	}),
	stat_statsWeapon: one(stats, {
		fields: [soulCores.statsWeapon],
		references: [stats.$idx],
		relationName: "soulCores_statsWeapon_stats_$idx"
	}),
	baseItemType: one(baseItemTypes, {
		fields: [soulCores.baseItemType],
		references: [baseItemTypes.$idx]
	}),
}));

export const uncutGemAdditionalTiersRelations = relations(uncutGemAdditionalTiers, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [uncutGemAdditionalTiers.baseItemType],
		references: [baseItemTypes.$idx]
	}),
}));

export const uncutGemTiersRelations = relations(uncutGemTiers, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [uncutGemTiers.baseItemType],
		references: [baseItemTypes.$idx]
	}),
}));