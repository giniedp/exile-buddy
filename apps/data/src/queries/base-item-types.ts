import { Poe2Database } from '../types'

export async function findBaseItemTypes(db: Poe2Database) {
  return await db.query.baseItemTypes.findMany({
    with: {},
  })
}

export async function findBaseItemTypeById(db: Poe2Database, id: string) {
  return await db.query.baseItemTypes.findFirst({
    where: (items, { eq }) => eq(items.id, id),
    with: {
      armourTypes: true,
      attributeRequirements: true,
      uncutGemAdditionalTiers: true,
      delveCraftingModifiers: true,
      itemClass: {
        with: {
          itemClassCategory: true,
        },
      },
      itemVisualIdentity: true,
      itemInherentSkills: true,
    },
  })
}

export async function findBaseItemTypeByClassIdx(db: Poe2Database, classIdx: number) {
  return await db.query.baseItemTypes.findMany({
    where: (items, { eq }) => eq(items.itemClass, classIdx),
    with: {
      // armourTypes: true,
      // attributeRequirements: true,
      // uncutGemAdditionalTiers: true,
      // delveCraftingModifiers: true,
      // itemClass: {
      //   with: {
      //     itemClassCategory: true,
      //   },
      // },
      itemVisualIdentity: true,
      // itemInherentSkills: true,
    },
  })
}
