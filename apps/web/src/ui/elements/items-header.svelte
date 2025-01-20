<script lang="ts">
  interface Props {
    isDouble?: boolean
    variant?: 'white' | 'rare' | 'unique' | 'magic' | 'currency' | 'gem' | 'quest'
    children?: () => any
  }

  const { isDouble, variant = 'white', children  }: Props = $props()
</script>

<div class="items-header {variant}" class:double={isDouble}>
  {@render children?.()}
</div>

<!-- svelte-ignore css_unused_selector -->
<style>
  .items-header {
    --ih-h: 2rem;
    --ih-w: 1.5rem;
    --ih-bg-l: url('/images/itemsheaderwhiteleft.webp');
    --ih-bg-m: url('/images/itemsheaderwhitemiddle.webp');
    --ih-bg-r: url('/images/itemsheaderwhiteright.webp');
  }
  .items-header.double {
    --ih-h: 3rem;
    --ih-w: 2.5rem;
  }

  .items-header.white,
  .items-header.normal {
    --ih-bg-l: url('/images/itemsheaderwhiteleft.webp');
    --ih-bg-m: url('/images/itemsheaderwhitemiddle.webp');
    --ih-bg-r: url('/images/itemsheaderwhiteright.webp');
  }
  .items-header.white.double,
  .items-header.normal.double {
    --ih-bg-l: url('/images/itemsheaderdoublenormalleft.webp');
    --ih-bg-m: url('/images/itemsheaderdoublenormalmiddle.webp');
    --ih-bg-r: url('/images/itemsheaderdoublenormalright.webp');
  }

  .items-header.magic {
    --ih-bg-l: url('/images/itemsheadermagicleft.webp');
    --ih-bg-m: url('/images/itemsheadermagicmiddle.webp');
    --ih-bg-r: url('/images/itemsheadermagicright.webp');
  }
  .items-header.magic.double {
    --ih-bg-l: url('/images/itemsheaderdoublemagicleft.webp');
    --ih-bg-m: url('/images/itemsheaderdoublemagicmiddle.webp');
    --ih-bg-r: url('/images/itemsheaderdoublemagicright.webp');
  }

  .items-header.rare {
    --ih-bg-l: url('/images/itemsheaderraresinglelineleft.webp');
    --ih-bg-m: url('/images/itemsheaderraresinglelinemiddle.webp');
    --ih-bg-r: url('/images/itemsheaderraresinglelineright.webp');
  }
  .items-header.rare.double {
    --ih-bg-l: url('/images/itemsheaderrareleft.webp');
    --ih-bg-m: url('/images/itemsheaderraremiddle.webp');
    --ih-bg-r: url('/images/itemsheaderrareright.webp');
  }

  .items-header.unique {
    --ih-bg-l: url('/images/itemsheaderuniquesinglelineleft.webp');
    --ih-bg-m: url('/images/itemsheaderuniquesinglelinemiddle.webp');
    --ih-bg-r: url('/images/itemsheaderuniquesinglelineright.webp');
  }
  .items-header.unique.double {
    --ih-bg-l: url('/images/itemsheaderuniqueleft.webp');
    --ih-bg-m: url('/images/itemsheaderuniquemiddle.webp');
    --ih-bg-r: url('/images/itemsheaderuniqueright.webp');
  }

  .items-header.currency {
    --ih-bg-l: url('/images/itemsheadercurrencyleft.webp');
    --ih-bg-m: url('/images/itemsheadercurrencymiddle.webp');
    --ih-bg-r: url('/images/itemsheadercurrencyright.webp');
  }
  .items-header.currency.double {
    --ih-bg-l: url('/images/itemsheaderdoublecurrencyleft.webp');
    --ih-bg-m: url('/images/itemsheaderdoublecurrencymiddle.webp');
    --ih-bg-r: url('/images/itemsheaderdoublecurrencyright.webp');
  }

  .items-header.gem {
    --ih-bg-l: url('/images/itemsheadergemleft.webp');
    --ih-bg-m: url('/images/itemsheadergemmiddle.webp');
    --ih-bg-r: url('/images/itemsheadergemright.webp');
  }
  .items-header.gem.double {
    --ih-bg-l: url('/images/itemsheaderdoublegemleft.webp');
    --ih-bg-m: url('/images/itemsheaderdoublegemmiddle.webp');
    --ih-bg-r: url('/images/itemsheaderdoublegemright.webp');
  }

  .items-header.quest {
    --ih-bg-l: url('/images/itemsheaderquestleft.webp');
    --ih-bg-m: url('/images/itemsheaderquestmiddle.webp');
    --ih-bg-r: url('/images/itemsheaderquestright.webp');
  }
  .items-header.quest.double {
    --ih-bg-l: url('/images/itemsheaderdoublequestleft.webp');
    --ih-bg-m: url('/images/itemsheaderdoublequestmiddle.webp');
    --ih-bg-r: url('/images/itemsheaderdoublequestright.webp');
  }

  .items-header {
    position: relative;
    box-sizing: border-box;
    text-align: center;
    line-height: 1;
    height: var(--ih-h);

    background-image: var(--ih-bg-l), var(--ih-bg-r), var(--ih-bg-m), var(--ih-bg-m) ;
    background-repeat: no-repeat, no-repeat, repeat-x , repeat-x;
    background-size: auto 100%, auto 100%, auto 100%, auto 100%;
    background-position: left center, right center, 50% 50%, calc(50% - var(--ih-w) / 2) 50%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
