<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'

  const { Story } = defineMeta({
    title: 'Exile UI / Item Header',
    tags: ['autodocs'],
    argTypes: {},
    args: {
      content: ``,
    },
  })
</script>

<Story name="exile-item-header">
  <div class="bg-black text-center text-exile-normal font-fontin uppercase ">
    <div class="exile-item-header h-12 flex flex-col justify-center text-lg">
      <div>Quilted Vest</div>
    </div>
    <div class="exile-item-header double h-16 flex flex-col justify-center text-lg leading-tight">
      <div>Foxshade</div>
      <div>Quilted Vest</div>
    </div>
    <div class="p-4">
      <div>Body Armour</div>
      <div>Evasion Rating: <span class="text-exile-magic">104</span></div>
      <div class="exile-item-separator"></div>
      <div>Requires: <span class="">10 Dexterity</span></div>
      <div class="exile-item-separator"></div>
      <div class="text-exile-magic">+60 to evaion rating</div>
      <div class="text-exile-magic">+21 to dexterity</div>
      <div class="text-exile-magic">10% Increased movement speed when on full life</div>
      <div class="text-exile-magic">100% increased evasion rating when on full life</div>
      <div class="exile-item-separator"></div>
      <div class="italic">
        To catch an animal, think like an animal
      </div>
    </div>
  </div>
</Story>

<Story name="exile-item-header magic">
  <div class="exile-item-header magic h-12"></div>
  <div class="exile-item-header magic double h-16"></div>
</Story>

<Story name="exile-item-header rare">
  <div class="exile-item-header rare h-12"></div>
  <div class="exile-item-header rare double h-16"></div>
</Story>

<Story name="exile-item-header unique">
  <div class="exile-item-header unique h-12"></div>
  <div class="exile-item-header unique double h-16"></div>
</Story>

<Story name="exile-item-header currency">
  <div class="exile-item-header currency h-12"></div>
  <div class="exile-item-header currency double h-16"></div>
</Story>

<Story name="exile-item-header gem">
  <div class="exile-item-header gem h-12"></div>
  <div class="exile-item-header gem double h-16"></div>
</Story>

<Story name="exile-item-header quest">
  <div class="exile-item-header quest h-12"></div>
  <div class="exile-item-header quest double h-16"></div>
</Story>

