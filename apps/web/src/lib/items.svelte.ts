import type { BaseItemTypes } from '$lib/data/baseitemtypes'
import type { ItemClasses } from '$lib/data/itemclasses'

import {
  Medal, // Amulets
  Skull, // Archnemesis
  Shield, // Armours
  Swords, // AtlasExiles
  Map as MapIcon, // AtlasUpgrades
  // BeltFilled, // Belts
  // Vintage, // Classic
  Coins, // Currency
  Pickaxe, // Delve
  Compass, // Expedition
  FlaskConical, // Flasks
  Gem, // Gem/Gems
  Key, // Heist
  Timer, // Incursion
  Diamond, // Jewels
  // PuzzlePiece, // MapFragments
  Users, // Masters
  // Memory, // MemoryLines
  Database, // Metadata
  Play, // MicrotransactionAnimations
  CreditCard, // MicrotransactionCurrency
  Crown, // PantheonSouls
  Mountain, // Pinnacle
  Scroll, // QuestItems
  Target, // Quivers
  Trophy, // Relics
  CircleEllipsis, // Rings
  Building2, // Sanctum
  Bug, // Scarabs
  Radio, // Sentinel
  Heart, // SoulCores
  Building, // TowerAugment
  Sword, // Ultimatum
  Puzzle,
  MemoryStick,
  HardHat, // UniqueFragments
} from 'lucide-svelte'

import type { ItemClassCategories } from '$lib/data/itemclasscategories'

export class ItemCategorization {
  private itemClasses: ItemClasses[]
  private itemCategories: ItemClassCategories[]
  private ctx: Context[] = $state([])

  constructor(itemClasses: ItemClasses[], itemCategories: ItemClassCategories[]) {
    this.itemClasses = itemClasses
    this.itemCategories = itemCategories
  }

  setCtx<T extends string>(namespace: T, items: BaseItemTypes[]): this {
    const map = new Map<string, ContextData[]>()

    items.forEach((it, idx) => {
      const segments = it.Id.replace(namespace + '/', '').split('/')
      const category = segments.shift()!
      const item = segments.pop()!

      const entry = map.get(category) ?? []
      entry.push({ item, segments, ref: it })
      map.set(category, entry)
    })

    this.ctx = Array.from(map).sort()

    return this
  }

  getCategories(category: string, url: string) {
    return this.ctx.map(([cat, entries]) => ({
      title: cat,
      url: `/items/${cat.toLowerCase()}`,
      icon: categoryToIcon[cat as keyof typeof categoryToIcon],
      isActive: category === cat.toLowerCase(),
      ...(entries.length && {
        items: buildSegmentTree(
          entries.filter(({ segments }) => segments.length).map(({ segments }) => segments.join('/')),
          cat,
          `/items/${cat.toLowerCase()}`,
          url,
        ),
      }),
    }))
  }
}

type NavItems = { title: string; url: string; isActive?: boolean; items?: NavItems[] | undefined }

function buildSegmentTree(segments: string[], parentPath: string, parentUrl: string, url: string): NavItems[] {
  const segmentMap = new Map<string, string[][]>()

  segments.forEach((segment) => {
    const [first, ...rest] = segment.split('/')
    const existing = segmentMap.get(first) || []
    if (rest.length > 0) {
      existing.push(rest)
    }
    segmentMap.set(first, existing)
  })

  return Array.from(segmentMap.entries()).map(([segment, children]) => ({
    title: segment,
    url: `${parentUrl}/${segment.toLowerCase()}`,
    icon: categoryToIcon[segment as keyof typeof categoryToIcon],
    isActive: url.endsWith(`${parentUrl}/${segment.toLowerCase()}`),
    ...(children.length > 0 && {
      items: buildSegmentTree(
        children.flat(),
        `${parentPath}/${segment}`,
        `${parentUrl}/${segment.toLowerCase()}`,
        url,
      ),
    }),
  }))
}

type ContextData = {
  item: string
  ref: BaseItemTypes
  segments: string[]
}
type Context = [string, ContextData[]]

function filterContext(ctx: Context[], category?: string, paths?: string) {
  if (category) {
    ctx = ctx.filter(([cat]) => cat.toLowerCase() == category)
  }
  if (paths) {
    ctx = ctx.map(([cat, entries]) => [
      cat,
      entries.filter(({ item, segments }) => {
        const fullPath = [...segments, item].join('/').toLowerCase()
        return fullPath.startsWith(paths)
      }),
    ])
  }
}

const categoryToIcon = {
  Amulets: Medal,
  Archnemesis: Skull,
  // Armours: Armor,
  AtlasExiles: Swords,
  AtlasUpgrades: MapIcon,
  // "Belts": BeltFilled,
  // "Classic": Vintage,
  Currency: Coins,
  Delve: Pickaxe,
  Expedition: Compass,
  Flasks: FlaskConical,
  Gem: Gem,
  Gems: Gem,
  Heist: Key,
  Incursion: Timer,
  Jewels: Diamond,
  MapFragments: Puzzle,
  Maps: MapIcon,
  Masters: Users,
  MemoryLines: MemoryStick,
  Metadata: Database,
  MicrotransactionAnimations: Play,
  MicrotransactionCurrency: CreditCard,
  PantheonSouls: Crown,
  Pinnacle: Mountain,
  QuestItems: Scroll,
  Quivers: Target,
  Relics: Trophy,
  Rings: CircleEllipsis,
  Sanctum: Building2,
  Scarabs: Bug,
  Sentinel: Radio,
  SoulCores: Heart,
  TowerAugment: Building,
  Ultimatum: Sword,
  UltimatumKey: Key,
  UniqueFragments: Puzzle,
  Weapons: Swords,
  Shields: Shield,
  Helmets: HardHat,
  // BodyArmours: BodyArmor,
}

export const MainCategory = {
  Armour: () => {},
  Weapons: 'Weapons',
  Equipment: 'Equipment',
  Gems: 'Gems',
  Consumables: 'Consumables',
  SpecialItems: 'SpecialItems',
}

export const enum EquipmentSubCategory {
  Ring = 'Ring',
  Belt = 'Belt',
}

export const enum WeaponType {
  OneHanded = 'OneHanded',
  TwoHanded = 'TwoHanded',
}
