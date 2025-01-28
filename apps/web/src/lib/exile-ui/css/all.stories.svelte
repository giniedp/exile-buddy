<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'

  const { Story } = defineMeta({
    title: 'Exile UI / CSS Components / All',
    tags: ['autodocs'],
    argTypes: {},
    args: {
      content: ``,
    },
  })
</script>

<Story name="White Item">
  <div class="bg-black text-center text-poe-normal font-poe-fontin uppercase  min-w-80">
    <div class="poe-item-header h-12 px-8 flex flex-col justify-center text-lg font-bold">
      <div>Expert Waxed Jacket</div>
    </div>
    <!-- <div class="poe-item-header-lg h-16 flex flex-col justify-center text-lg font-bold leading-tight">
      <div>Expert Waxed Jacket</div>
    </div> -->
    <div class="p-2 text-gray-400">
      <div>Body Armour</div>
      <div>
        <span class="exile-text-tag">Evasion Rating</span>:
        <span class="text-white">268</span>
      </div>
      <div>
        <span class="exile-text-tag">Energy Shield</span>:
        <span class="text-white">101</span>
      </div>
      <div class="poe-item-separator"></div>
      <div>Requires:
        <span class="text-white">
          Level 65,
          86 <span class="exile-text-tag">dex</span>,
          86 <span class="exile-text-tag">int</span>
        </span></div>
    </div>
  </div>
</Story>

<Story name="Magic Item">
  <div class="bg-black text-center text-poe-normal font-poe-fontin uppercase  min-w-80">
    <div class="poe-item-header-magic h-12 px-8 flex flex-col justify-center text-lg font-bold">
      <div class="text-poe-magic">Polished advanced cultist bow of ire</div>
    </div>
    <!-- <div class="poe-item-header double h-16 flex flex-col justify-center text-lg font-bold leading-tight">
      <div>Expert Waxed Jacket</div>
    </div> -->
    <div class="p-2 text-gray-400">
      <div>
        <span class="exile-text-tag">Bow</span>
      </div>
      <div>
        <span class="exile-text-tag">Physical</span> damage:
        <span class="text-poe-magic">8-16</span>
      </div>
      <div>
        <span class="exile-text-tag">Chaos</span> damage:
        <span class="text-poe-chaos">41-69</span>
      </div>
      <div>
        <span class="exile-text-tag">Critical hit</span> chance:
        <span class="text-white">5.00%</span>
      </div>
      <div>
        Attacks per second:
        <span class="text-white">1.20</span>
      </div>
      <div class="poe-item-separator magic"></div>
      <div>Requires:
        <span class="text-white">
          Level 59,
          165 <span class="exile-text-tag">dex</span>
        </span>
      </div>
      <div class="poe-item-separator magic"></div>
      <div class="text-poe-magic">
        Adds 8 to 13 <span class="text-poe-tag">physical</span> damage
      </div>
      <div class="text-poe-magic">
        +11% to <span class="text-poe-tag">critical damage bonus</span>
      </div>
    </div>
  </div>
</Story>


<Story name="Rare Item">
  <div class="bg-black text-center text-poe-normal font-poe-fontin uppercase min-w-80">
    <div class="poe-item-header poe-item-header-rare h-12 px-8 flex flex-col justify-center text-lg font-bold">
      <div class="text-poe-rare">Advanced cultist bow</div>
    </div>
    <div class="poe-item-header-lg poe-item-header-rare h-16 px-8 flex flex-col justify-center text-lg font-bold leading-tight">
      <div class="text-poe-rare">Soul blast</div>
      <div class="text-poe-rare">Advanced cultist bow</div>
    </div>
    <div class="p-2 text-gray-400">
      <div>
        <span class="exile-text-tag">Bow</span>
      </div>
      <div>
        <span class="exile-text-tag">Quality</span>:
        <span class="text-poe-magic">+20%</span>
      </div>
      <div>
        <span class="exile-text-tag">Elemental</span> damage:
        <span class="text-poe-fire">16-28</span>,
        <span class="text-poe-lighting">1-15</span>
      </div>
      <div>
        <span class="exile-text-tag">Chaos</span> damage:
        <span class="text-poe-chaos">51-85</span>
      </div>
      <div>
        <span class="exile-text-tag">Critical hit</span> chance:
        <span class="text-poe-magic">7.16%</span>
      </div>
      <div>
        Attacks per second:
        <span class="text-white">1.20</span>
      </div>
      <div class="poe-item-separator rare"></div>
      <div>Requires:
        <span class="text-white">
          Level 59,
          135 <span class="exile-text-tag">dex</span>
        </span>
      </div>
      <div class="poe-item-separator rare"></div>
      <div class="text-poe-magic">
        Adds 8 to 13 <span class="text-poe-tag">physical</span> damage
      </div>
      <div class="text-poe-magic">
        +11% to <span class="text-poe-tag">critical damage bonus</span>
      </div>
      <div class="poe-item-separator rare"></div>
      <div class="text-poe-corrupt">
        <span class="text-poe-tag">corrupted</span>
      </div>
    </div>
  </div>
</Story>


<Story name="Dialog">
  <div class="min-w-96 bg-black font-poe-fontin">
    <div class="poe-title-bar h-12  text-poe-normal text-center py-3 relative">
      Title Text
      <button class="btn btn-circle btn-sm poe-icon-btn-close absolute right-3 top-1.5" aria-label="Close"> </button>
    </div>
    <div class="poe-panel-border min-h-96 p-4">
      <div class="min-h-96">

      </div>
      <div class="flex flex-row align-center justify-center">
        <button class="border-0 btn poe-btn-red w-20">Cancel</button>
        <button class="border-0 btn poe-btn w-20">OK</button>
      </div>
    </div>
  </div>
</Story>

<Story name="Dialog Ornate">
  <div class="min-w-96 bg-black font-poe-fontin">
    <div class="poe-title-bar h-12  text-poe-normal text-center py-3 relative">
      Title Text
      <button class="btn btn-circle btn-sm poe-icon-btn-close absolute right-3 top-1.5" aria-label="Close"> </button>
    </div>
    <div class="poe-panel-ornate min-h-96 p-4">
      <div class="min-h-96">

      </div>
      <div class="flex flex-row align-center justify-center">
        <button class="border-0 btn poe-btn-red w-20">Cancel</button>
        <button class="border-0 btn poe-btn w-20">OK</button>
      </div>
    </div>
  </div>
</Story>
