import { relations } from "drizzle-orm/relations";
import { tags, essences, mods, baseItemTypes, delveCraftingModifiers, heistObjectives, expeditionCurrency, scoutingReports, currencyExchangeCategories, currencyExchange, armourTypes, itemVisualIdentity, flavourText, itemClasses, stats, costTypes, craftingItemClassCategories, currencyItems, flasks, grantedEffectQualityStats, grantedEffects, grantedEffectStatSets, grantedEffectsPerLevel, grantedEffectLabels, grantedEffectStatSetsPerLevel, itemClassCategories, rarity, itemFrameType, itemisedVisualEffect, modType, modFamily, modSellPriceTypes, questItems, shieldTypes, skillGems, statsAffectingGeneration, passiveSkillStatCategories, uniqueStashLayout, words, weaponTypes, statsFromSkillStats, attributeRequirements, beltTypes, itemInherentSkills, itemSpirit, soulCores, uncutGemAdditionalTiers, uncutGemTiers } from "./schema";

export const essencesRelations = relations(essences, ({one}) => ({
	tag: one(tags, {
		fields: [essences.craftTag],
		references: [tags.$id]
	}),
	mod: one(mods, {
		fields: [essences.monsterMod],
		references: [mods.$id]
	}),
	baseItemType: one(baseItemTypes, {
		fields: [essences.baseItemType],
		references: [baseItemTypes.$id]
	}),
}));

export const tagsRelations = relations(tags, ({many}) => ({
	essences: many(essences),
	delveCraftingModifiers_weightTags: many(delveCraftingModifiers, {
		relationName: "delveCraftingModifiers_weightTags_tags_$id"
	}),
	delveCraftingModifiers_negativeWeightTags: many(delveCraftingModifiers, {
		relationName: "delveCraftingModifiers_negativeWeightTags_tags_$id"
	}),
	baseItemTypes: many(baseItemTypes),
	mods_implicitTags: many(mods, {
		relationName: "mods_implicitTags_tags_$id"
	}),
	mods_generationWeightTags: many(mods, {
		relationName: "mods_generationWeightTags_tags_$id"
	}),
	mods_tags: many(mods, {
		relationName: "mods_tags_tags_$id"
	}),
	mods_spawnWeightTags: many(mods, {
		relationName: "mods_spawnWeightTags_tags_$id"
	}),
	words: many(words),
}));

export const modsRelations = relations(mods, ({one, many}) => ({
	essences: many(essences),
	delveCraftingModifiers_sellPriceMods: many(delveCraftingModifiers, {
		relationName: "delveCraftingModifiers_sellPriceMods_mods_$id"
	}),
	delveCraftingModifiers_forcedAddMods: many(delveCraftingModifiers, {
		relationName: "delveCraftingModifiers_forcedAddMods_mods_$id"
	}),
	delveCraftingModifiers_addedMods: many(delveCraftingModifiers, {
		relationName: "delveCraftingModifiers_addedMods_mods_$id"
	}),
	baseItemTypes: many(baseItemTypes),
	mod: one(mods, {
		fields: [mods.archnemesisMinionMod],
		references: [mods.$id],
		relationName: "mods_archnemesisMinionMod_mods_$id"
	}),
	mods: many(mods, {
		relationName: "mods_archnemesisMinionMod_mods_$id"
	}),
	tag_implicitTags: one(tags, {
		fields: [mods.implicitTags],
		references: [tags.$id],
		relationName: "mods_implicitTags_tags_$id"
	}),
	stat_heistStat1: one(stats, {
		fields: [mods.heistStat1],
		references: [stats.$id],
		relationName: "mods_heistStat1_stats_$id"
	}),
	stat_heistStat0: one(stats, {
		fields: [mods.heistStat0],
		references: [stats.$id],
		relationName: "mods_heistStat0_stats_$id"
	}),
	itemClass: one(itemClasses, {
		fields: [mods.craftingItemClassRestrictions],
		references: [itemClasses.$id]
	}),
	stat_stat6: one(stats, {
		fields: [mods.stat6],
		references: [stats.$id],
		relationName: "mods_stat6_stats_$id"
	}),
	tag_generationWeightTags: one(tags, {
		fields: [mods.generationWeightTags],
		references: [tags.$id],
		relationName: "mods_generationWeightTags_tags_$id"
	}),
	stat_stat5: one(stats, {
		fields: [mods.stat5],
		references: [stats.$id],
		relationName: "mods_stat5_stats_$id"
	}),
	modType_chestModType: one(modType, {
		fields: [mods.chestModType],
		references: [modType.$id],
		relationName: "mods_chestModType_modType_$id"
	}),
	grantedEffectsPerLevel: one(grantedEffectsPerLevel, {
		fields: [mods.grantedEffectsPerLevel],
		references: [grantedEffectsPerLevel.$id]
	}),
	tag_tags: one(tags, {
		fields: [mods.tags],
		references: [tags.$id],
		relationName: "mods_tags_tags_$id"
	}),
	tag_spawnWeightTags: one(tags, {
		fields: [mods.spawnWeightTags],
		references: [tags.$id],
		relationName: "mods_spawnWeightTags_tags_$id"
	}),
	modFamily: one(modFamily, {
		fields: [mods.families],
		references: [modFamily.$id]
	}),
	stat_stat4: one(stats, {
		fields: [mods.stat4],
		references: [stats.$id],
		relationName: "mods_stat4_stats_$id"
	}),
	stat_stat3: one(stats, {
		fields: [mods.stat3],
		references: [stats.$id],
		relationName: "mods_stat3_stats_$id"
	}),
	stat_stat2: one(stats, {
		fields: [mods.stat2],
		references: [stats.$id],
		relationName: "mods_stat2_stats_$id"
	}),
	stat_stat1: one(stats, {
		fields: [mods.stat1],
		references: [stats.$id],
		relationName: "mods_stat1_stats_$id"
	}),
	modType_modType: one(modType, {
		fields: [mods.modType],
		references: [modType.$id],
		relationName: "mods_modType_modType_$id"
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
		references: [baseItemTypes.$id],
		relationName: "baseItemTypes_fragmentBaseItemType_baseItemTypes_$id"
	}),
	baseItemTypes: many(baseItemTypes, {
		relationName: "baseItemTypes_fragmentBaseItemType_baseItemTypes_$id"
	}),
	itemVisualIdentity: one(itemVisualIdentity, {
		fields: [baseItemTypes.itemVisualIdentity],
		references: [itemVisualIdentity.$id]
	}),
	tag: one(tags, {
		fields: [baseItemTypes.tags],
		references: [tags.$id]
	}),
	mod: one(mods, {
		fields: [baseItemTypes.implicitMods],
		references: [mods.$id]
	}),
	flavourText: one(flavourText, {
		fields: [baseItemTypes.flavourText],
		references: [flavourText.$id]
	}),
	itemClass: one(itemClasses, {
		fields: [baseItemTypes.itemClass],
		references: [itemClasses.$id]
	}),
	currencyItems_fullStackBaseItemType: many(currencyItems, {
		relationName: "currencyItems_fullStackBaseItemType_baseItemTypes_$id"
	}),
	currencyItems_baseItemType: many(currencyItems, {
		relationName: "currencyItems_baseItemType_baseItemTypes_$id"
	}),
	flasks: many(flasks),
	itemisedVisualEffects: many(itemisedVisualEffect),
	questItems: many(questItems),
	shieldTypes: many(shieldTypes),
	skillGems_vaalVariantBaseItemType: many(skillGems, {
		relationName: "skillGems_vaalVariantBaseItemType_baseItemTypes_$id"
	}),
	skillGems_baseItemType: many(skillGems, {
		relationName: "skillGems_baseItemType_baseItemTypes_$id"
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
		references: [tags.$id],
		relationName: "delveCraftingModifiers_weightTags_tags_$id"
	}),
	mod_sellPriceMods: one(mods, {
		fields: [delveCraftingModifiers.sellPriceMods],
		references: [mods.$id],
		relationName: "delveCraftingModifiers_sellPriceMods_mods_$id"
	}),
	mod_forcedAddMods: one(mods, {
		fields: [delveCraftingModifiers.forcedAddMods],
		references: [mods.$id],
		relationName: "delveCraftingModifiers_forcedAddMods_mods_$id"
	}),
	tag_negativeWeightTags: one(tags, {
		fields: [delveCraftingModifiers.negativeWeightTags],
		references: [tags.$id],
		relationName: "delveCraftingModifiers_negativeWeightTags_tags_$id"
	}),
	mod_addedMods: one(mods, {
		fields: [delveCraftingModifiers.addedMods],
		references: [mods.$id],
		relationName: "delveCraftingModifiers_addedMods_mods_$id"
	}),
	baseItemType: one(baseItemTypes, {
		fields: [delveCraftingModifiers.baseItemType],
		references: [baseItemTypes.$id]
	}),
}));

export const heistObjectivesRelations = relations(heistObjectives, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [heistObjectives.baseItemType],
		references: [baseItemTypes.$id]
	}),
}));

export const expeditionCurrencyRelations = relations(expeditionCurrency, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [expeditionCurrency.baseItemType],
		references: [baseItemTypes.$id]
	}),
}));

export const scoutingReportsRelations = relations(scoutingReports, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [scoutingReports.baseItemType],
		references: [baseItemTypes.$id]
	}),
}));

export const currencyExchangeRelations = relations(currencyExchange, ({one}) => ({
	currencyExchangeCategory_subCategory: one(currencyExchangeCategories, {
		fields: [currencyExchange.subCategory],
		references: [currencyExchangeCategories.$id],
		relationName: "currencyExchange_subCategory_currencyExchangeCategories_$id"
	}),
	currencyExchangeCategory_category: one(currencyExchangeCategories, {
		fields: [currencyExchange.category],
		references: [currencyExchangeCategories.$id],
		relationName: "currencyExchange_category_currencyExchangeCategories_$id"
	}),
	baseItemType: one(baseItemTypes, {
		fields: [currencyExchange.item],
		references: [baseItemTypes.$id]
	}),
}));

export const currencyExchangeCategoriesRelations = relations(currencyExchangeCategories, ({many}) => ({
	currencyExchanges_subCategory: many(currencyExchange, {
		relationName: "currencyExchange_subCategory_currencyExchangeCategories_$id"
	}),
	currencyExchanges_category: many(currencyExchange, {
		relationName: "currencyExchange_category_currencyExchangeCategories_$id"
	}),
}));

export const armourTypesRelations = relations(armourTypes, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [armourTypes.baseItemType],
		references: [baseItemTypes.$id]
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
		references: [itemClassCategories.$id]
	}),
	itemisedVisualEffects: many(itemisedVisualEffect),
	mods: many(mods),
}));

export const costTypesRelations = relations(costTypes, ({one, many}) => ({
	stat: one(stats, {
		fields: [costTypes.stat],
		references: [stats.$id]
	}),
	grantedEffects: many(grantedEffects),
}));

export const statsRelations = relations(stats, ({one, many}) => ({
	costTypes: many(costTypes),
	grantedEffectQualityStats: many(grantedEffectQualityStats),
	grantedEffectStatSets_copiedStats: many(grantedEffectStatSets, {
		relationName: "grantedEffectStatSets_copiedStats_stats_$id"
	}),
	grantedEffectStatSets_constantStats: many(grantedEffectStatSets, {
		relationName: "grantedEffectStatSets_constantStats_stats_$id"
	}),
	grantedEffectStatSets_implicitStats: many(grantedEffectStatSets, {
		relationName: "grantedEffectStatSets_implicitStats_stats_$id"
	}),
	grantedEffectStatSetsPerLevels_additionalStats: many(grantedEffectStatSetsPerLevel, {
		relationName: "grantedEffectStatSetsPerLevel_additionalStats_stats_$id"
	}),
	grantedEffectStatSetsPerLevels_interpolationBases: many(grantedEffectStatSetsPerLevel, {
		relationName: "grantedEffectStatSetsPerLevel_interpolationBases_stats_$id"
	}),
	grantedEffectStatSetsPerLevels_floatStats: many(grantedEffectStatSetsPerLevel, {
		relationName: "grantedEffectStatSetsPerLevel_floatStats_stats_$id"
	}),
	grantedEffectStatSetsPerLevels_additionalFlags: many(grantedEffectStatSetsPerLevel, {
		relationName: "grantedEffectStatSetsPerLevel_additionalFlags_stats_$id"
	}),
	itemisedVisualEffects: many(itemisedVisualEffect),
	mods_heistStat1: many(mods, {
		relationName: "mods_heistStat1_stats_$id"
	}),
	mods_heistStat0: many(mods, {
		relationName: "mods_heistStat0_stats_$id"
	}),
	mods_stat6: many(mods, {
		relationName: "mods_stat6_stats_$id"
	}),
	mods_stat5: many(mods, {
		relationName: "mods_stat5_stats_$id"
	}),
	mods_stat4: many(mods, {
		relationName: "mods_stat4_stats_$id"
	}),
	mods_stat3: many(mods, {
		relationName: "mods_stat3_stats_$id"
	}),
	mods_stat2: many(mods, {
		relationName: "mods_stat2_stats_$id"
	}),
	mods_stat1: many(mods, {
		relationName: "mods_stat1_stats_$id"
	}),
	skillGems: many(skillGems),
	statsAffectingGenerations: many(statsAffectingGeneration),
	passiveSkillStatCategory: one(passiveSkillStatCategories, {
		fields: [stats.category],
		references: [passiveSkillStatCategories.$id]
	}),
	stat_offHandAliasStat: one(stats, {
		fields: [stats.offHandAliasStat],
		references: [stats.$id],
		relationName: "stats_offHandAliasStat_stats_$id"
	}),
	stats_offHandAliasStat: many(stats, {
		relationName: "stats_offHandAliasStat_stats_$id"
	}),
	stat_mainHandAliasStat: one(stats, {
		fields: [stats.mainHandAliasStat],
		references: [stats.$id],
		relationName: "stats_mainHandAliasStat_stats_$id"
	}),
	stats_mainHandAliasStat: many(stats, {
		relationName: "stats_mainHandAliasStat_stats_$id"
	}),
	statsFromSkillStats_grantedFlag: many(statsFromSkillStats, {
		relationName: "statsFromSkillStats_grantedFlag_stats_$id"
	}),
	statsFromSkillStats_skillCondition: many(statsFromSkillStats, {
		relationName: "statsFromSkillStats_skillCondition_stats_$id"
	}),
	soulCores_statsArmour: many(soulCores, {
		relationName: "soulCores_statsArmour_stats_$id"
	}),
	soulCores_statsWeapon: many(soulCores, {
		relationName: "soulCores_statsWeapon_stats_$id"
	}),
}));

export const craftingItemClassCategoriesRelations = relations(craftingItemClassCategories, ({one}) => ({
	itemClass: one(itemClasses, {
		fields: [craftingItemClassCategories.itemClasses],
		references: [itemClasses.$id]
	}),
}));

export const currencyItemsRelations = relations(currencyItems, ({one}) => ({
	baseItemType_fullStackBaseItemType: one(baseItemTypes, {
		fields: [currencyItems.fullStackBaseItemType],
		references: [baseItemTypes.$id],
		relationName: "currencyItems_fullStackBaseItemType_baseItemTypes_$id"
	}),
	baseItemType_baseItemType: one(baseItemTypes, {
		fields: [currencyItems.baseItemType],
		references: [baseItemTypes.$id],
		relationName: "currencyItems_baseItemType_baseItemTypes_$id"
	}),
}));

export const flasksRelations = relations(flasks, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [flasks.baseItemType],
		references: [baseItemTypes.$id]
	}),
}));

export const grantedEffectQualityStatsRelations = relations(grantedEffectQualityStats, ({one}) => ({
	stat: one(stats, {
		fields: [grantedEffectQualityStats.stats],
		references: [stats.$id]
	}),
	grantedEffect: one(grantedEffects, {
		fields: [grantedEffectQualityStats.grantedEffect],
		references: [grantedEffects.$id]
	}),
}));

export const grantedEffectsRelations = relations(grantedEffects, ({one, many}) => ({
	grantedEffectQualityStats: many(grantedEffectQualityStats),
	costType: one(costTypes, {
		fields: [grantedEffects.costTypes],
		references: [costTypes.$id]
	}),
	grantedEffectStatSet_additionalStatSets: one(grantedEffectStatSets, {
		fields: [grantedEffects.additionalStatSets],
		references: [grantedEffectStatSets.$id],
		relationName: "grantedEffects_additionalStatSets_grantedEffectStatSets_$id"
	}),
	grantedEffectStatSet_statSet: one(grantedEffectStatSets, {
		fields: [grantedEffects.statSet],
		references: [grantedEffectStatSets.$id],
		relationName: "grantedEffects_statSet_grantedEffectStatSets_$id"
	}),
	grantedEffect: one(grantedEffects, {
		fields: [grantedEffects.regularVariant],
		references: [grantedEffects.$id],
		relationName: "grantedEffects_regularVariant_grantedEffects_$id"
	}),
	grantedEffects: many(grantedEffects, {
		relationName: "grantedEffects_regularVariant_grantedEffects_$id"
	}),
	itemClass: one(itemClasses, {
		fields: [grantedEffects.supportWeaponRestrictions],
		references: [itemClasses.$id]
	}),
	grantedEffectsPerLevels: many(grantedEffectsPerLevel),
	grantedEffectStatSetsPerLevels: many(grantedEffectStatSetsPerLevel),
}));

export const grantedEffectStatSetsRelations = relations(grantedEffectStatSets, ({one, many}) => ({
	grantedEffects_additionalStatSets: many(grantedEffects, {
		relationName: "grantedEffects_additionalStatSets_grantedEffectStatSets_$id"
	}),
	grantedEffects_statSet: many(grantedEffects, {
		relationName: "grantedEffects_statSet_grantedEffectStatSets_$id"
	}),
	stat_copiedStats: one(stats, {
		fields: [grantedEffectStatSets.copiedStats],
		references: [stats.$id],
		relationName: "grantedEffectStatSets_copiedStats_stats_$id"
	}),
	stat_constantStats: one(stats, {
		fields: [grantedEffectStatSets.constantStats],
		references: [stats.$id],
		relationName: "grantedEffectStatSets_constantStats_stats_$id"
	}),
	stat_implicitStats: one(stats, {
		fields: [grantedEffectStatSets.implicitStats],
		references: [stats.$id],
		relationName: "grantedEffectStatSets_implicitStats_stats_$id"
	}),
	grantedEffectLabel: one(grantedEffectLabels, {
		fields: [grantedEffectStatSets.label],
		references: [grantedEffectLabels.$id]
	}),
	grantedEffectStatSetsPerLevels: many(grantedEffectStatSetsPerLevel),
}));

export const grantedEffectsPerLevelRelations = relations(grantedEffectsPerLevel, ({one, many}) => ({
	grantedEffect: one(grantedEffects, {
		fields: [grantedEffectsPerLevel.grantedEffect],
		references: [grantedEffects.$id]
	}),
	mods: many(mods),
}));

export const grantedEffectLabelsRelations = relations(grantedEffectLabels, ({many}) => ({
	grantedEffectStatSets: many(grantedEffectStatSets),
}));

export const grantedEffectStatSetsPerLevelRelations = relations(grantedEffectStatSetsPerLevel, ({one}) => ({
	stat_additionalStats: one(stats, {
		fields: [grantedEffectStatSetsPerLevel.additionalStats],
		references: [stats.$id],
		relationName: "grantedEffectStatSetsPerLevel_additionalStats_stats_$id"
	}),
	stat_interpolationBases: one(stats, {
		fields: [grantedEffectStatSetsPerLevel.interpolationBases],
		references: [stats.$id],
		relationName: "grantedEffectStatSetsPerLevel_interpolationBases_stats_$id"
	}),
	stat_floatStats: one(stats, {
		fields: [grantedEffectStatSetsPerLevel.floatStats],
		references: [stats.$id],
		relationName: "grantedEffectStatSetsPerLevel_floatStats_stats_$id"
	}),
	stat_additionalFlags: one(stats, {
		fields: [grantedEffectStatSetsPerLevel.additionalFlags],
		references: [stats.$id],
		relationName: "grantedEffectStatSetsPerLevel_additionalFlags_stats_$id"
	}),
	grantedEffect: one(grantedEffects, {
		fields: [grantedEffectStatSetsPerLevel.grantedEffects],
		references: [grantedEffects.$id]
	}),
	grantedEffectStatSet: one(grantedEffectStatSets, {
		fields: [grantedEffectStatSetsPerLevel.statSet],
		references: [grantedEffectStatSets.$id]
	}),
}));

export const itemClassCategoriesRelations = relations(itemClassCategories, ({many}) => ({
	itemClasses: many(itemClasses),
}));

export const itemFrameTypeRelations = relations(itemFrameType, ({one}) => ({
	rarity: one(rarity, {
		fields: [itemFrameType.rarity],
		references: [rarity.$id]
	}),
}));

export const rarityRelations = relations(rarity, ({many}) => ({
	itemFrameTypes: many(itemFrameType),
}));

export const itemisedVisualEffectRelations = relations(itemisedVisualEffect, ({one}) => ({
	itemClass: one(itemClasses, {
		fields: [itemisedVisualEffect.itemClasses],
		references: [itemClasses.$id]
	}),
	stat: one(stats, {
		fields: [itemisedVisualEffect.stats],
		references: [stats.$id]
	}),
	itemVisualIdentity: one(itemVisualIdentity, {
		fields: [itemisedVisualEffect.visualIdentity],
		references: [itemVisualIdentity.$id]
	}),
	baseItemType: one(baseItemTypes, {
		fields: [itemisedVisualEffect.effectBaseType],
		references: [baseItemTypes.$id]
	}),
}));

export const modTypeRelations = relations(modType, ({one, many}) => ({
	mods_chestModType: many(mods, {
		relationName: "mods_chestModType_modType_$id"
	}),
	mods_modType: many(mods, {
		relationName: "mods_modType_modType_$id"
	}),
	modSellPriceType: one(modSellPriceTypes, {
		fields: [modType.modSellPriceTypesKeys],
		references: [modSellPriceTypes.$id]
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
		references: [baseItemTypes.$id]
	}),
}));

export const shieldTypesRelations = relations(shieldTypes, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [shieldTypes.baseItemType],
		references: [baseItemTypes.$id]
	}),
}));

export const skillGemsRelations = relations(skillGems, ({one, many}) => ({
	stat: one(stats, {
		fields: [skillGems.minionGlobalSkillLevelStat],
		references: [stats.$id]
	}),
	baseItemType_vaalVariantBaseItemType: one(baseItemTypes, {
		fields: [skillGems.vaalVariantBaseItemType],
		references: [baseItemTypes.$id],
		relationName: "skillGems_vaalVariantBaseItemType_baseItemTypes_$id"
	}),
	baseItemType_baseItemType: one(baseItemTypes, {
		fields: [skillGems.baseItemType],
		references: [baseItemTypes.$id],
		relationName: "skillGems_baseItemType_baseItemTypes_$id"
	}),
	itemInherentSkills: many(itemInherentSkills),
}));

export const statsAffectingGenerationRelations = relations(statsAffectingGeneration, ({one}) => ({
	stat: one(stats, {
		fields: [statsAffectingGeneration.stat],
		references: [stats.$id]
	}),
}));

export const passiveSkillStatCategoriesRelations = relations(passiveSkillStatCategories, ({many}) => ({
	stats: many(stats),
}));

export const uniqueStashLayoutRelations = relations(uniqueStashLayout, ({one, many}) => ({
	uniqueStashLayout_baseVersion: one(uniqueStashLayout, {
		fields: [uniqueStashLayout.baseVersion],
		references: [uniqueStashLayout.$id],
		relationName: "uniqueStashLayout_baseVersion_uniqueStashLayout_$id"
	}),
	uniqueStashLayouts_baseVersion: many(uniqueStashLayout, {
		relationName: "uniqueStashLayout_baseVersion_uniqueStashLayout_$id"
	}),
	uniqueStashLayout_renamedVersion: one(uniqueStashLayout, {
		fields: [uniqueStashLayout.renamedVersion],
		references: [uniqueStashLayout.$id],
		relationName: "uniqueStashLayout_renamedVersion_uniqueStashLayout_$id"
	}),
	uniqueStashLayouts_renamedVersion: many(uniqueStashLayout, {
		relationName: "uniqueStashLayout_renamedVersion_uniqueStashLayout_$id"
	}),
	itemVisualIdentity: one(itemVisualIdentity, {
		fields: [uniqueStashLayout.itemVisualIdentityKey],
		references: [itemVisualIdentity.$id]
	}),
	word: one(words, {
		fields: [uniqueStashLayout.wordsKey],
		references: [words.$id]
	}),
}));

export const wordsRelations = relations(words, ({one, many}) => ({
	uniqueStashLayouts: many(uniqueStashLayout),
	tag: one(tags, {
		fields: [words.spawnWeightTags],
		references: [tags.$id]
	}),
}));

export const weaponTypesRelations = relations(weaponTypes, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [weaponTypes.baseItemType],
		references: [baseItemTypes.$id]
	}),
}));

export const statsFromSkillStatsRelations = relations(statsFromSkillStats, ({one}) => ({
	stat_grantedFlag: one(stats, {
		fields: [statsFromSkillStats.grantedFlag],
		references: [stats.$id],
		relationName: "statsFromSkillStats_grantedFlag_stats_$id"
	}),
	stat_skillCondition: one(stats, {
		fields: [statsFromSkillStats.skillCondition],
		references: [stats.$id],
		relationName: "statsFromSkillStats_skillCondition_stats_$id"
	}),
}));

export const attributeRequirementsRelations = relations(attributeRequirements, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [attributeRequirements.baseItemType],
		references: [baseItemTypes.$id]
	}),
}));

export const beltTypesRelations = relations(beltTypes, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [beltTypes.baseItem],
		references: [baseItemTypes.$id]
	}),
}));

export const itemInherentSkillsRelations = relations(itemInherentSkills, ({one}) => ({
	skillGem: one(skillGems, {
		fields: [itemInherentSkills.skillsGranted],
		references: [skillGems.$id]
	}),
	baseItemType: one(baseItemTypes, {
		fields: [itemInherentSkills.baseItemType],
		references: [baseItemTypes.$id]
	}),
}));

export const itemSpiritRelations = relations(itemSpirit, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [itemSpirit.baseItemType],
		references: [baseItemTypes.$id]
	}),
}));

export const soulCoresRelations = relations(soulCores, ({one}) => ({
	stat_statsArmour: one(stats, {
		fields: [soulCores.statsArmour],
		references: [stats.$id],
		relationName: "soulCores_statsArmour_stats_$id"
	}),
	stat_statsWeapon: one(stats, {
		fields: [soulCores.statsWeapon],
		references: [stats.$id],
		relationName: "soulCores_statsWeapon_stats_$id"
	}),
	baseItemType: one(baseItemTypes, {
		fields: [soulCores.baseItemType],
		references: [baseItemTypes.$id]
	}),
}));

export const uncutGemAdditionalTiersRelations = relations(uncutGemAdditionalTiers, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [uncutGemAdditionalTiers.baseItemType],
		references: [baseItemTypes.$id]
	}),
}));

export const uncutGemTiersRelations = relations(uncutGemTiers, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [uncutGemTiers.baseItemType],
		references: [baseItemTypes.$id]
	}),
}));