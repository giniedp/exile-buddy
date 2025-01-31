<script lang="ts">
  import { getImageUrl, recordIdToSlug } from '$lib/utils'
  let { data, children } = $props()
</script>

<div class="flex flex-row overflow-hidden h-full">
  <div class="flex flex-col overflow-auto flex-auto">
    <table class="table">
      <tbody>
        {#each data.items as item}
          <tr>
            <td>
              {#if item.npcPortrait?.portraitFile}
              <div class="avatar">
                <div class="w-24 rounded">
                  <img src="{getImageUrl(item.npcPortrait?.portraitFile)}" alt="Portrait" loading="lazy"/>
                </div>
              </div>
              {:else}
              <div class="avatar avatar-placeholder">
                <div class="bg-neutral text-neutral-content w-24 rounded">
                  <span></span>
                </div>
              </div>
              {/if}
            </td>
            <td>
              <a href="/npcs/{recordIdToSlug(item.id)}">
                {item.name}
              </a>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div>
    {@render children()}
  </div>
</div>
