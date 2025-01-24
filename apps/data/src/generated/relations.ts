import { relations } from "drizzle-orm/relations";
import { tags, essences, mods, baseItemTypes, delveCraftingModifiers, heistObjectives, expeditionCurrency, scoutingReports, currencyExchangeCategories, currencyExchange, armourTypes, itemVisualIdentity, flavourText, itemClasses, stats, costTypes, craftingItemClassCategories, currencyItems, flasks, grantedEffectQualityStats, grantedEffects, grantedEffectStatSets, grantedEffectsPerLevel, grantedEffectLabels, grantedEffectStatSetsPerLevel, itemClassCategories, rarity, itemFrameType, itemisedVisualEffect, modType, modFamily, modSellPriceTypes, questItems, shieldTypes, skillGems, statsAffectingGeneration, passiveSkillStatCategories, uniqueStashLayout, words, weaponTypes, statsFromSkillStats, attributeRequirements, beltTypes, itemInherentSkills, itemSpirit, soulCores, uncutGemAdditionalTiers, uncutGemTiers } from "./schema";

export const essencesRelations = relations(essences, ({one}) => ({
	tag: one(tags, {
		fields: [essences.craftTag],
		references: [tags.rowid]
	}),
	mod: one(mods, {
		fields: [essences.monsterMod],
		references: [mods.rowid]
	}),
	baseItemType: one(baseItemTypes, {
		fields: [essences.baseItemType],
		references: [baseItemTypes.rowid]
	}),
}));

export const tagsRelations = relations(tags, ({many}) => ({
	essences: many(essences),
	delveCraftingModifiers_weightTags: many(delveCraftingModifiers, {
		relationName: "delveCraftingModifiers_weightTags_tags_rowid"
	}),
	delveCraftingModifiers_negativeWeightTags: many(delveCraftingModifiers, {
		relationName: "delveCraftingModifiers_negativeWeightTags_tags_rowid"
	}),
	baseItemTypes: many(baseItemTypes),
	mods_implicitTags: many(mods, {
		relationName: "mods_implicitTags_tags_rowid"
	}),
	mods_generationWeightTags: many(mods, {
		relationName: "mods_generationWeightTags_tags_rowid"
	}),
	mods_tags: many(mods, {
		relationName: "mods_tags_tags_rowid"
	}),
	mods_spawnWeightTags: many(mods, {
		relationName: "mods_spawnWeightTags_tags_rowid"
	}),
	words: many(words),
}));

export const modsRelations = relations(mods, ({one, many}) => ({
	essences: many(essences),
	delveCraftingModifiers_sellPriceMods: many(delveCraftingModifiers, {
		relationName: "delveCraftingModifiers_sellPriceMods_mods_rowid"
	}),
	delveCraftingModifiers_forcedAddMods: many(delveCraftingModifiers, {
		relationName: "delveCraftingModifiers_forcedAddMods_mods_rowid"
	}),
	delveCraftingModifiers_addedMods: many(delveCraftingModifiers, {
		relationName: "delveCraftingModifiers_addedMods_mods_rowid"
	}),
	baseItemTypes: many(baseItemTypes),
	mod: one(mods, {
		fields: [mods.archnemesisMinionMod],
		references: [mods.rowid],
		relationName: "mods_archnemesisMinionMod_mods_rowid"
	}),
	mods: many(mods, {
		relationName: "mods_archnemesisMinionMod_mods_rowid"
	}),
	tag_implicitTags: one(tags, {
		fields: [mods.implicitTags],
		references: [tags.rowid],
		relationName: "mods_implicitTags_tags_rowid"
	}),
	stat_heistStat1: one(stats, {
		fields: [mods.heistStat1],
		references: [stats.rowid],
		relationName: "mods_heistStat1_stats_rowid"
	}),
	stat_heistStat0: one(stats, {
		fields: [mods.heistStat0],
		references: [stats.rowid],
		relationName: "mods_heistStat0_stats_rowid"
	}),
	itemClass: one(itemClasses, {
		fields: [mods.craftingItemClassRestrictions],
		references: [itemClasses.rowid]
	}),
	stat_stat6: one(stats, {
		fields: [mods.stat6],
		references: [stats.rowid],
		relationName: "mods_stat6_stats_rowid"
	}),
	tag_generationWeightTags: one(tags, {
		fields: [mods.generationWeightTags],
		references: [tags.rowid],
		relationName: "mods_generationWeightTags_tags_rowid"
	}),
	stat_stat5: one(stats, {
		fields: [mods.stat5],
		references: [stats.rowid],
		relationName: "mods_stat5_stats_rowid"
	}),
	modType_chestModType: one(modType, {
		fields: [mods.chestModType],
		references: [modType.rowid],
		relationName: "mods_chestModType_modType_rowid"
	}),
	grantedEffectsPerLevel: one(grantedEffectsPerLevel, {
		fields: [mods.grantedEffectsPerLevel],
		references: [grantedEffectsPerLevel.rowid]
	}),
	tag_tags: one(tags, {
		fields: [mods.tags],
		references: [tags.rowid],
		relationName: "mods_tags_tags_rowid"
	}),
	tag_spawnWeightTags: one(tags, {
		fields: [mods.spawnWeightTags],
		references: [tags.rowid],
		relationName: "mods_spawnWeightTags_tags_rowid"
	}),
	modFamily: one(modFamily, {
		fields: [mods.families],
		references: [modFamily.rowid]
	}),
	stat_stat4: one(stats, {
		fields: [mods.stat4],
		references: [stats.rowid],
		relationName: "mods_stat4_stats_rowid"
	}),
	stat_stat3: one(stats, {
		fields: [mods.stat3],
		references: [stats.rowid],
		relationName: "mods_stat3_stats_rowid"
	}),
	stat_stat2: one(stats, {
		fields: [mods.stat2],
		references: [stats.rowid],
		relationName: "mods_stat2_stats_rowid"
	}),
	stat_stat1: one(stats, {
		fields: [mods.stat1],
		references: [stats.rowid],
		relationName: "mods_stat1_stats_rowid"
	}),
	modType_modType: one(modType, {
		fields: [mods.modType],
		references: [modType.rowid],
		relationName: "mods_modType_modType_rowid"
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
		references: [baseItemTypes.rowid],
		relationName: "baseItemTypes_fragmentBaseItemType_baseItemTypes_rowid"
	}),
	baseItemTypes: many(baseItemTypes, {
		relationName: "baseItemTypes_fragmentBaseItemType_baseItemTypes_rowid"
	}),
	itemVisualIdentity: one(itemVisualIdentity, {
		fields: [baseItemTypes.itemVisualIdentity],
		references: [itemVisualIdentity.rowid]
	}),
	tag: one(tags, {
		fields: [baseItemTypes.tags],
		references: [tags.rowid]
	}),
	mod: one(mods, {
		fields: [baseItemTypes.implicitMods],
		references: [mods.rowid]
	}),
	flavourText: one(flavourText, {
		fields: [baseItemTypes.flavourText],
		references: [flavourText.rowid]
	}),
	itemClass: one(itemClasses, {
		fields: [baseItemTypes.itemClass],
		references: [itemClasses.rowid]
	}),
	currencyItems_fullStackBaseItemType: many(currencyItems, {
		relationName: "currencyItems_fullStackBaseItemType_baseItemTypes_rowid"
	}),
	currencyItems_baseItemType: many(currencyItems, {
		relationName: "currencyItems_baseItemType_baseItemTypes_rowid"
	}),
	flasks: many(flasks),
	itemisedVisualEffects: many(itemisedVisualEffect),
	questItems: many(questItems),
	shieldTypes: many(shieldTypes),
	skillGems_vaalVariantBaseItemType: many(skillGems, {
		relationName: "skillGems_vaalVariantBaseItemType_baseItemTypes_rowid"
	}),
	skillGems_baseItemType: many(skillGems, {
		relationName: "skillGems_baseItemType_baseItemTypes_rowid"
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
		references: [tags.rowid],
		relationName: "delveCraftingModifiers_weightTags_tags_rowid"
	}),
	mod_sellPriceMods: one(mods, {
		fields: [delveCraftingModifiers.sellPriceMods],
		references: [mods.rowid],
		relationName: "delveCraftingModifiers_sellPriceMods_mods_rowid"
	}),
	mod_forcedAddMods: one(mods, {
		fields: [delveCraftingModifiers.forcedAddMods],
		references: [mods.rowid],
		relationName: "delveCraftingModifiers_forcedAddMods_mods_rowid"
	}),
	tag_negativeWeightTags: one(tags, {
		fields: [delveCraftingModifiers.negativeWeightTags],
		references: [tags.rowid],
		relationName: "delveCraftingModifiers_negativeWeightTags_tags_rowid"
	}),
	mod_addedMods: one(mods, {
		fields: [delveCraftingModifiers.addedMods],
		references: [mods.rowid],
		relationName: "delveCraftingModifiers_addedMods_mods_rowid"
	}),
	baseItemType: one(baseItemTypes, {
		fields: [delveCraftingModifiers.baseItemType],
		references: [baseItemTypes.rowid]
	}),
}));

export const heistObjectivesRelations = relations(heistObjectives, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [heistObjectives.baseItemType],
		references: [baseItemTypes.rowid]
	}),
}));

export const expeditionCurrencyRelations = relations(expeditionCurrency, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [expeditionCurrency.baseItemType],
		references: [baseItemTypes.rowid]
	}),
}));

export const scoutingReportsRelations = relations(scoutingReports, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [scoutingReports.baseItemType],
		references: [baseItemTypes.rowid]
	}),
}));

export const currencyExchangeRelations = relations(currencyExchange, ({one}) => ({
	currencyExchangeCategory_subCategory: one(currencyExchangeCategories, {
		fields: [currencyExchange.subCategory],
		references: [currencyExchangeCategories.rowid],
		relationName: "currencyExchange_subCategory_currencyExchangeCategories_rowid"
	}),
	currencyExchangeCategory_category: one(currencyExchangeCategories, {
		fields: [currencyExchange.category],
		references: [currencyExchangeCategories.rowid],
		relationName: "currencyExchange_category_currencyExchangeCategories_rowid"
	}),
	baseItemType: one(baseItemTypes, {
		fields: [currencyExchange.item],
		references: [baseItemTypes.rowid]
	}),
}));

export const currencyExchangeCategoriesRelations = relations(currencyExchangeCategories, ({many}) => ({
	currencyExchanges_subCategory: many(currencyExchange, {
		relationName: "currencyExchange_subCategory_currencyExchangeCategories_rowid"
	}),
	currencyExchanges_category: many(currencyExchange, {
		relationName: "currencyExchange_category_currencyExchangeCategories_rowid"
	}),
}));

export const armourTypesRelations = relations(armourTypes, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [armourTypes.baseItemType],
		references: [baseItemTypes.rowid]
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
		references: [itemClassCategories.rowid]
	}),
	itemisedVisualEffects: many(itemisedVisualEffect),
	mods: many(mods),
}));

export const costTypesRelations = relations(costTypes, ({one, many}) => ({
	stat: one(stats, {
		fields: [costTypes.stat],
		references: [stats.rowid]
	}),
	grantedEffects: many(grantedEffects),
}));

export const statsRelations = relations(stats, ({one, many}) => ({
	costTypes: many(costTypes),
	grantedEffectQualityStats: many(grantedEffectQualityStats),
	grantedEffectStatSets_copiedStats: many(grantedEffectStatSets, {
		relationName: "grantedEffectStatSets_copiedStats_stats_rowid"
	}),
	grantedEffectStatSets_constantStats: many(grantedEffectStatSets, {
		relationName: "grantedEffectStatSets_constantStats_stats_rowid"
	}),
	grantedEffectStatSets_implicitStats: many(grantedEffectStatSets, {
		relationName: "grantedEffectStatSets_implicitStats_stats_rowid"
	}),
	grantedEffectStatSetsPerLevels_additionalStats: many(grantedEffectStatSetsPerLevel, {
		relationName: "grantedEffectStatSetsPerLevel_additionalStats_stats_rowid"
	}),
	grantedEffectStatSetsPerLevels_interpolationBases: many(grantedEffectStatSetsPerLevel, {
		relationName: "grantedEffectStatSetsPerLevel_interpolationBases_stats_rowid"
	}),
	grantedEffectStatSetsPerLevels_floatStats: many(grantedEffectStatSetsPerLevel, {
		relationName: "grantedEffectStatSetsPerLevel_floatStats_stats_rowid"
	}),
	grantedEffectStatSetsPerLevels_additionalFlags: many(grantedEffectStatSetsPerLevel, {
		relationName: "grantedEffectStatSetsPerLevel_additionalFlags_stats_rowid"
	}),
	itemisedVisualEffects: many(itemisedVisualEffect),
	mods_heistStat1: many(mods, {
		relationName: "mods_heistStat1_stats_rowid"
	}),
	mods_heistStat0: many(mods, {
		relationName: "mods_heistStat0_stats_rowid"
	}),
	mods_stat6: many(mods, {
		relationName: "mods_stat6_stats_rowid"
	}),
	mods_stat5: many(mods, {
		relationName: "mods_stat5_stats_rowid"
	}),
	mods_stat4: many(mods, {
		relationName: "mods_stat4_stats_rowid"
	}),
	mods_stat3: many(mods, {
		relationName: "mods_stat3_stats_rowid"
	}),
	mods_stat2: many(mods, {
		relationName: "mods_stat2_stats_rowid"
	}),
	mods_stat1: many(mods, {
		relationName: "mods_stat1_stats_rowid"
	}),
	skillGems: many(skillGems),
	statsAffectingGenerations: many(statsAffectingGeneration),
	passiveSkillStatCategory: one(passiveSkillStatCategories, {
		fields: [stats.category],
		references: [passiveSkillStatCategories.rowid]
	}),
	stat_offHandAliasStat: one(stats, {
		fields: [stats.offHandAliasStat],
		references: [stats.rowid],
		relationName: "stats_offHandAliasStat_stats_rowid"
	}),
	stats_offHandAliasStat: many(stats, {
		relationName: "stats_offHandAliasStat_stats_rowid"
	}),
	stat_mainHandAliasStat: one(stats, {
		fields: [stats.mainHandAliasStat],
		references: [stats.rowid],
		relationName: "stats_mainHandAliasStat_stats_rowid"
	}),
	stats_mainHandAliasStat: many(stats, {
		relationName: "stats_mainHandAliasStat_stats_rowid"
	}),
	statsFromSkillStats_grantedFlag: many(statsFromSkillStats, {
		relationName: "statsFromSkillStats_grantedFlag_stats_rowid"
	}),
	statsFromSkillStats_skillCondition: many(statsFromSkillStats, {
		relationName: "statsFromSkillStats_skillCondition_stats_rowid"
	}),
	soulCores_statsArmour: many(soulCores, {
		relationName: "soulCores_statsArmour_stats_rowid"
	}),
	soulCores_statsWeapon: many(soulCores, {
		relationName: "soulCores_statsWeapon_stats_rowid"
	}),
}));

export const craftingItemClassCategoriesRelations = relations(craftingItemClassCategories, ({one}) => ({
	itemClass: one(itemClasses, {
		fields: [craftingItemClassCategories.itemClasses],
		references: [itemClasses.rowid]
	}),
}));

export const currencyItemsRelations = relations(currencyItems, ({one}) => ({
	baseItemType_fullStackBaseItemType: one(baseItemTypes, {
		fields: [currencyItems.fullStackBaseItemType],
		references: [baseItemTypes.rowid],
		relationName: "currencyItems_fullStackBaseItemType_baseItemTypes_rowid"
	}),
	baseItemType_baseItemType: one(baseItemTypes, {
		fields: [currencyItems.baseItemType],
		references: [baseItemTypes.rowid],
		relationName: "currencyItems_baseItemType_baseItemTypes_rowid"
	}),
}));

export const flasksRelations = relations(flasks, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [flasks.baseItemType],
		references: [baseItemTypes.rowid]
	}),
}));

export const grantedEffectQualityStatsRelations = relations(grantedEffectQualityStats, ({one}) => ({
	stat: one(stats, {
		fields: [grantedEffectQualityStats.stats],
		references: [stats.rowid]
	}),
	grantedEffect: one(grantedEffects, {
		fields: [grantedEffectQualityStats.grantedEffect],
		references: [grantedEffects.rowid]
	}),
}));

export const grantedEffectsRelations = relations(grantedEffects, ({one, many}) => ({
	grantedEffectQualityStats: many(grantedEffectQualityStats),
	costType: one(costTypes, {
		fields: [grantedEffects.costTypes],
		references: [costTypes.rowid]
	}),
	grantedEffectStatSet_additionalStatSets: one(grantedEffectStatSets, {
		fields: [grantedEffects.additionalStatSets],
		references: [grantedEffectStatSets.rowid],
		relationName: "grantedEffects_additionalStatSets_grantedEffectStatSets_rowid"
	}),
	grantedEffectStatSet_statSet: one(grantedEffectStatSets, {
		fields: [grantedEffects.statSet],
		references: [grantedEffectStatSets.rowid],
		relationName: "grantedEffects_statSet_grantedEffectStatSets_rowid"
	}),
	grantedEffect: one(grantedEffects, {
		fields: [grantedEffects.regularVariant],
		references: [grantedEffects.rowid],
		relationName: "grantedEffects_regularVariant_grantedEffects_rowid"
	}),
	grantedEffects: many(grantedEffects, {
		relationName: "grantedEffects_regularVariant_grantedEffects_rowid"
	}),
	itemClass: one(itemClasses, {
		fields: [grantedEffects.supportWeaponRestrictions],
		references: [itemClasses.rowid]
	}),
	grantedEffectsPerLevels: many(grantedEffectsPerLevel),
	grantedEffectStatSetsPerLevels: many(grantedEffectStatSetsPerLevel),
}));

export const grantedEffectStatSetsRelations = relations(grantedEffectStatSets, ({one, many}) => ({
	grantedEffects_additionalStatSets: many(grantedEffects, {
		relationName: "grantedEffects_additionalStatSets_grantedEffectStatSets_rowid"
	}),
	grantedEffects_statSet: many(grantedEffects, {
		relationName: "grantedEffects_statSet_grantedEffectStatSets_rowid"
	}),
	stat_copiedStats: one(stats, {
		fields: [grantedEffectStatSets.copiedStats],
		references: [stats.rowid],
		relationName: "grantedEffectStatSets_copiedStats_stats_rowid"
	}),
	stat_constantStats: one(stats, {
		fields: [grantedEffectStatSets.constantStats],
		references: [stats.rowid],
		relationName: "grantedEffectStatSets_constantStats_stats_rowid"
	}),
	stat_implicitStats: one(stats, {
		fields: [grantedEffectStatSets.implicitStats],
		references: [stats.rowid],
		relationName: "grantedEffectStatSets_implicitStats_stats_rowid"
	}),
	grantedEffectLabel: one(grantedEffectLabels, {
		fields: [grantedEffectStatSets.label],
		references: [grantedEffectLabels.rowid]
	}),
	grantedEffectStatSetsPerLevels: many(grantedEffectStatSetsPerLevel),
}));

export const grantedEffectsPerLevelRelations = relations(grantedEffectsPerLevel, ({one, many}) => ({
	grantedEffect: one(grantedEffects, {
		fields: [grantedEffectsPerLevel.grantedEffect],
		references: [grantedEffects.rowid]
	}),
	mods: many(mods),
}));

export const grantedEffectLabelsRelations = relations(grantedEffectLabels, ({many}) => ({
	grantedEffectStatSets: many(grantedEffectStatSets),
}));

export const grantedEffectStatSetsPerLevelRelations = relations(grantedEffectStatSetsPerLevel, ({one}) => ({
	stat_additionalStats: one(stats, {
		fields: [grantedEffectStatSetsPerLevel.additionalStats],
		references: [stats.rowid],
		relationName: "grantedEffectStatSetsPerLevel_additionalStats_stats_rowid"
	}),
	stat_interpolationBases: one(stats, {
		fields: [grantedEffectStatSetsPerLevel.interpolationBases],
		references: [stats.rowid],
		relationName: "grantedEffectStatSetsPerLevel_interpolationBases_stats_rowid"
	}),
	stat_floatStats: one(stats, {
		fields: [grantedEffectStatSetsPerLevel.floatStats],
		references: [stats.rowid],
		relationName: "grantedEffectStatSetsPerLevel_floatStats_stats_rowid"
	}),
	stat_additionalFlags: one(stats, {
		fields: [grantedEffectStatSetsPerLevel.additionalFlags],
		references: [stats.rowid],
		relationName: "grantedEffectStatSetsPerLevel_additionalFlags_stats_rowid"
	}),
	grantedEffect: one(grantedEffects, {
		fields: [grantedEffectStatSetsPerLevel.grantedEffects],
		references: [grantedEffects.rowid]
	}),
	grantedEffectStatSet: one(grantedEffectStatSets, {
		fields: [grantedEffectStatSetsPerLevel.statSet],
		references: [grantedEffectStatSets.rowid]
	}),
}));

export const itemClassCategoriesRelations = relations(itemClassCategories, ({many}) => ({
	itemClasses: many(itemClasses),
}));

export const itemFrameTypeRelations = relations(itemFrameType, ({one}) => ({
	rarity: one(rarity, {
		fields: [itemFrameType.rarity],
		references: [rarity.rowid]
	}),
}));

export const rarityRelations = relations(rarity, ({many}) => ({
	itemFrameTypes: many(itemFrameType),
}));

export const itemisedVisualEffectRelations = relations(itemisedVisualEffect, ({one}) => ({
	itemClass: one(itemClasses, {
		fields: [itemisedVisualEffect.itemClasses],
		references: [itemClasses.rowid]
	}),
	stat: one(stats, {
		fields: [itemisedVisualEffect.stats],
		references: [stats.rowid]
	}),
	itemVisualIdentity: one(itemVisualIdentity, {
		fields: [itemisedVisualEffect.visualIdentity],
		references: [itemVisualIdentity.rowid]
	}),
	baseItemType: one(baseItemTypes, {
		fields: [itemisedVisualEffect.effectBaseType],
		references: [baseItemTypes.rowid]
	}),
}));

export const modTypeRelations = relations(modType, ({one, many}) => ({
	mods_chestModType: many(mods, {
		relationName: "mods_chestModType_modType_rowid"
	}),
	mods_modType: many(mods, {
		relationName: "mods_modType_modType_rowid"
	}),
	modSellPriceType: one(modSellPriceTypes, {
		fields: [modType.modSellPriceTypesKeys],
		references: [modSellPriceTypes.rowid]
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
		references: [baseItemTypes.rowid]
	}),
}));

export const shieldTypesRelations = relations(shieldTypes, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [shieldTypes.baseItemType],
		references: [baseItemTypes.rowid]
	}),
}));

export const skillGemsRelations = relations(skillGems, ({one, many}) => ({
	stat: one(stats, {
		fields: [skillGems.minionGlobalSkillLevelStat],
		references: [stats.rowid]
	}),
	baseItemType_vaalVariantBaseItemType: one(baseItemTypes, {
		fields: [skillGems.vaalVariantBaseItemType],
		references: [baseItemTypes.rowid],
		relationName: "skillGems_vaalVariantBaseItemType_baseItemTypes_rowid"
	}),
	baseItemType_baseItemType: one(baseItemTypes, {
		fields: [skillGems.baseItemType],
		references: [baseItemTypes.rowid],
		relationName: "skillGems_baseItemType_baseItemTypes_rowid"
	}),
	itemInherentSkills: many(itemInherentSkills),
}));

export const statsAffectingGenerationRelations = relations(statsAffectingGeneration, ({one}) => ({
	stat: one(stats, {
		fields: [statsAffectingGeneration.stat],
		references: [stats.rowid]
	}),
}));

export const passiveSkillStatCategoriesRelations = relations(passiveSkillStatCategories, ({many}) => ({
	stats: many(stats),
}));

export const uniqueStashLayoutRelations = relations(uniqueStashLayout, ({one, many}) => ({
	uniqueStashLayout_baseVersion: one(uniqueStashLayout, {
		fields: [uniqueStashLayout.baseVersion],
		references: [uniqueStashLayout.rowid],
		relationName: "uniqueStashLayout_baseVersion_uniqueStashLayout_rowid"
	}),
	uniqueStashLayouts_baseVersion: many(uniqueStashLayout, {
		relationName: "uniqueStashLayout_baseVersion_uniqueStashLayout_rowid"
	}),
	uniqueStashLayout_renamedVersion: one(uniqueStashLayout, {
		fields: [uniqueStashLayout.renamedVersion],
		references: [uniqueStashLayout.rowid],
		relationName: "uniqueStashLayout_renamedVersion_uniqueStashLayout_rowid"
	}),
	uniqueStashLayouts_renamedVersion: many(uniqueStashLayout, {
		relationName: "uniqueStashLayout_renamedVersion_uniqueStashLayout_rowid"
	}),
	itemVisualIdentity: one(itemVisualIdentity, {
		fields: [uniqueStashLayout.itemVisualIdentityKey],
		references: [itemVisualIdentity.rowid]
	}),
	word: one(words, {
		fields: [uniqueStashLayout.wordsKey],
		references: [words.rowid]
	}),
}));

export const wordsRelations = relations(words, ({one, many}) => ({
	uniqueStashLayouts: many(uniqueStashLayout),
	tag: one(tags, {
		fields: [words.spawnWeightTags],
		references: [tags.rowid]
	}),
}));

export const weaponTypesRelations = relations(weaponTypes, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [weaponTypes.baseItemType],
		references: [baseItemTypes.rowid]
	}),
}));

export const statsFromSkillStatsRelations = relations(statsFromSkillStats, ({one}) => ({
	stat_grantedFlag: one(stats, {
		fields: [statsFromSkillStats.grantedFlag],
		references: [stats.rowid],
		relationName: "statsFromSkillStats_grantedFlag_stats_rowid"
	}),
	stat_skillCondition: one(stats, {
		fields: [statsFromSkillStats.skillCondition],
		references: [stats.rowid],
		relationName: "statsFromSkillStats_skillCondition_stats_rowid"
	}),
}));

export const attributeRequirementsRelations = relations(attributeRequirements, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [attributeRequirements.baseItemType],
		references: [baseItemTypes.rowid]
	}),
}));

export const beltTypesRelations = relations(beltTypes, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [beltTypes.baseItem],
		references: [baseItemTypes.rowid]
	}),
}));

export const itemInherentSkillsRelations = relations(itemInherentSkills, ({one}) => ({
	skillGem: one(skillGems, {
		fields: [itemInherentSkills.skillsGranted],
		references: [skillGems.rowid]
	}),
	baseItemType: one(baseItemTypes, {
		fields: [itemInherentSkills.baseItemType],
		references: [baseItemTypes.rowid]
	}),
}));

export const itemSpiritRelations = relations(itemSpirit, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [itemSpirit.baseItemType],
		references: [baseItemTypes.rowid]
	}),
}));

export const soulCoresRelations = relations(soulCores, ({one}) => ({
	stat_statsArmour: one(stats, {
		fields: [soulCores.statsArmour],
		references: [stats.rowid],
		relationName: "soulCores_statsArmour_stats_rowid"
	}),
	stat_statsWeapon: one(stats, {
		fields: [soulCores.statsWeapon],
		references: [stats.rowid],
		relationName: "soulCores_statsWeapon_stats_rowid"
	}),
	baseItemType: one(baseItemTypes, {
		fields: [soulCores.baseItemType],
		references: [baseItemTypes.rowid]
	}),
}));

export const uncutGemAdditionalTiersRelations = relations(uncutGemAdditionalTiers, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [uncutGemAdditionalTiers.baseItemType],
		references: [baseItemTypes.rowid]
	}),
}));

export const uncutGemTiersRelations = relations(uncutGemTiers, ({one}) => ({
	baseItemType: one(baseItemTypes, {
		fields: [uncutGemTiers.baseItemType],
		references: [baseItemTypes.rowid]
	}),
}));