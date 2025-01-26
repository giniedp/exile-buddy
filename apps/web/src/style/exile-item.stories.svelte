<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'

  const { Story } = defineMeta({
    title: 'Exile UI / Item',
    tags: ['autodocs'],
    argTypes: {},
    args: {
      content: ``,
    },
  })
</script>

<Story name="White Item">
  <div class="bg-black text-center text-exile-normal font-fontin uppercase ">
    <div class="exile-item-header h-12 flex flex-col justify-center text-lg font-bold">
      <div>Expert Waxed Jacket</div>
    </div>
    <!-- <div class="exile-item-header double h-16 flex flex-col justify-center text-lg font-bold leading-tight">
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
      <div class="exile-item-separator"></div>
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
  <div class="bg-black text-center text-exile-normal font-fontin uppercase ">
    <div class="exile-item-header magic h-12 flex flex-col justify-center text-lg font-bold">
      <div class="text-exile-magic">Polished advanced cultist bow of ire</div>
    </div>
    <!-- <div class="exile-item-header double h-16 flex flex-col justify-center text-lg font-bold leading-tight">
      <div>Expert Waxed Jacket</div>
    </div> -->
    <div class="p-2 text-gray-400">
      <div>
        <span class="exile-text-tag">Bow</span>
      </div>
      <div>
        <span class="exile-text-tag">Physical</span> damage:
        <span class="text-exile-magic">8-16</span>
      </div>
      <div>
        <span class="exile-text-tag">Chaos</span> damage:
        <span class="text-exile-chaos">41-69</span>
      </div>
      <div>
        <span class="exile-text-tag">Critical hit</span> chance:
        <span class="text-white">5.00%</span>
      </div>
      <div>
        Attacks per second:
        <span class="text-white">1.20</span>
      </div>
      <div class="exile-item-separator magic"></div>
      <div>Requires:
        <span class="text-white">
          Level 59,
          165 <span class="exile-text-tag">dex</span>
        </span>
      </div>
      <div class="exile-item-separator magic"></div>
      <div class="text-exile-magic">
        Adds 8 to 13 <span class="text-exile-tag">physical</span> damage
      </div>
      <div class="text-exile-magic">
        +11% to <span class="text-exile-tag">critical damage bonus</span>
      </div>
    </div>
  </div>
</Story>


<Story name="Rare Item">
  <div class="bg-black text-center text-exile-normal font-fontin uppercase ">
    <div class="exile-item-header rare h-12 flex flex-col justify-center text-lg font-bold">
      <div class="text-exile-rare">Advanced cultist bow</div>
    </div>
    <div class="exile-item-header rare double h-16 flex flex-col justify-center text-lg font-bold leading-tight">
      <div class="text-exile-rare">Soul blast</div>
      <div class="text-exile-rare">Advanced cultist bow</div>
    </div>
    <div class="p-2 text-gray-400">
      <div>
        <span class="exile-text-tag">Bow</span>
      </div>
      <div>
        <span class="exile-text-tag">Quality</span>:
        <span class="text-exile-magic">+20%</span>
      </div>
      <div>
        <span class="exile-text-tag">Elemental</span> damage:
        <span class="text-exile-fire">16-28</span>,
        <span class="text-exile-lighting">1-15</span>
      </div>
      <div>
        <span class="exile-text-tag">Chaos</span> damage:
        <span class="text-exile-chaos">51-85</span>
      </div>
      <div>
        <span class="exile-text-tag">Critical hit</span> chance:
        <span class="text-exile-magic">7.16%</span>
      </div>
      <div>
        Attacks per second:
        <span class="text-white">1.20</span>
      </div>
      <div class="exile-item-separator rare"></div>
      <div>Requires:
        <span class="text-white">
          Level 59,
          135 <span class="exile-text-tag">dex</span>
        </span>
      </div>
      <div class="exile-item-separator rare"></div>
      <div class="text-exile-magic">
        Adds 8 to 13 <span class="text-exile-tag">physical</span> damage
      </div>
      <div class="text-exile-magic">
        +11% to <span class="text-exile-tag">critical damage bonus</span>
      </div>
      <div class="exile-item-separator rare"></div>
      <div class="text-exile-corrupt">
        <span class="text-exile-tag">corrupted</span>
      </div>
    </div>
  </div>
</Story>
