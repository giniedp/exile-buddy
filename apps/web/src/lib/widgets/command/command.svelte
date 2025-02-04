<script lang="ts" module>
  import type { searchBaseItemTypes, searchNPCs } from '$data/queries'
  import { db } from '$lib/db'
  import * as Command from '$lib/shadcn/ui/command'
  import { normalizeIdString, recordIdToSlug } from '$lib/utils'

  let open = $state(false)
  let value = $state('')
  let results = $state({ items: [], npcs: [] })

  export function toggleOpen() {
    open = !open
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === '/' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      open = !open
    }
    if (e.key === 'Enter' && open) {
      open = !open
    }
  }

  type BaseItemTypeSearchResult = Awaited<ReturnType<typeof searchBaseItemTypes>>
  type NPCSearchResult = Awaited<ReturnType<typeof searchNPCs>>

  async function handleSearch(term: string) {
    if (!term) return { items: [], npcs: [] }

    const [items, npcs] = (await Promise.allSettled([db.searchBaseItemTypes(term), db.searchNPCs(term)])).map((it) =>
      it.status === 'fulfilled' ? it.value : [],
    ) as [BaseItemTypeSearchResult, NPCSearchResult]

    results = { items, npcs }
    return {
      items,
      npcs,
    }
  }

  let r = $state('')
</script>

<script lang="ts">
  $effect(() => {
    handleSearch(value)
  })
</script>

<svelte:document onkeydown={handleKeydown} />

<Command.Dialog bind:open shouldFilter={false}>
  <Command.Input placeholder="Search for item or npc..." bind:value />
  <Command.List>
    <Command.Empty>No results found.</Command.Empty>
    <Command.Group heading="Items">
      {#each results.items as { name, id, itemClass } (id)}
        {#if itemClass?.itemClassCategory?.id}
          <Command.LinkItem
            href={`/db/items/${normalizeIdString(itemClass.itemClassCategory.id)}/${normalizeIdString(itemClass.id)}/${recordIdToSlug(id)}`}
            value={id}>{name}</Command.LinkItem
          >
        {/if}
      {/each}
    </Command.Group>
    <Command.Separator />
    <Command.Group heading="NPCs">
      {#each results.npcs as { name, id } (id)}
        {#if name && id}
          <Command.LinkItem href={`/db/npcs/${recordIdToSlug(id)}`} value={id}>{name}</Command.LinkItem>
        {/if}
      {/each}
    </Command.Group>
  </Command.List>
</Command.Dialog>
