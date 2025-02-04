<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import ItemDetail from './item-detail.svelte'

  const { Story } = defineMeta({
    title: 'Widgets / Items / Detail',
    tags: ['autodocs'],
    argTypes: {},
    component: ItemDetail,
    args: {
      record: {
        id: 'Metadata/Items/Weapons/OneHandWeapons/OneHandMaces/FourOneHandMace1',
        name: 'Wooden Club',
        hash32: 1886603766,
        itemVisualIdentity: null,
      },
    },
  })
</script>

<Story name="Detail" />
<Story
  name="With Image"
  args={{
    record: {
      id: 'Metadata/Items/Weapons/OneHandWeapons/OneHandMaces/FourOneHandMace1',
      name: 'Wooden Club',
      hash32: 1886603766,
      itemVisualIdentity: {
        $idx: 13811,
        animationLocation: '',
        aoFile: 'Metadata/Items/Weapons/OneHandWeapons/OneHandMaces/MacesFour/WoodenClub/WoodenClubDrop.ao',
        aoFile2: 'Metadata/Items/Weapons/OneHandWeapons/OneHandMaces/MacesFour/WoodenClub/WoodenClubHeld.ao',
        composition: 0,
        corruptAchievementItems: '[]',
        createCorruptedJewelAchievementItem: null,
        ddsFile: 'art/2ditems/weapons/onehandweapons/onehandmaces/basetypes/1hmace01.webp',
        duelistDexSmFiles: '[]',
        duelistShape: '',
        epkFile: '',
        hash16: 52869,
        id: 'FourOneHandMace1',
        identifyAchievementItems: '[]',
        inventorySoundEffect: 540,
        isAlternateArt: '',
        isAtlasOfWorldsMapIcon: '',
        isTier16Icon: '',
        marauderShape: '',
        marauderSmFiles: '[]',
        pickupAchievementItems: '[]',
        rangerShape: '',
        rangerSmFiles: '[]',
        scionShape: '',
        scionSmFiles: '[]',
        shadowShape: '',
        shadowSmFiles: '[]',
        smFiles: '[]',
        templarShape: '',
        templarSmFiles: '[]',
        witchShape: '',
        witchSmFiles: '[]',
      },
    },
  }}
/>
