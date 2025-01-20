<script lang="ts">
  interface Props {
    isDouble?: boolean
    variant?: 'white' | 'rare' | 'unique' | 'magic' | 'currency' | 'gem' | 'quest'
  }

  const { isDouble, variant = 'white' }: Props = $props()
</script>

<div class="host {variant}" class:double={isDouble}>
  <div class="background"></div>
  <div class="content">Hello World</div>
</div>

<!-- svelte-ignore css_unused_selector -->
<style>
  .host {
    --ih-h: 2rem;
    --ih-w: 1.5rem;
    --ih-bg-l: url('/images/itemsheaderwhiteleft.webp');
    --ih-bg-m: url('/images/itemsheaderwhitemiddle.webp');
    --ih-bg-r: url('/images/itemsheaderwhiteright.webp');
  }
  .host.double {
    --ih-h: 3rem;
    --ih-w: 2.5rem;
  }

  .host.white,
  .host.normal {
    --ih-bg-l: url('/images/itemsheaderwhiteleft.webp');
    --ih-bg-m: url('/images/itemsheaderwhitemiddle.webp');
    --ih-bg-r: url('/images/itemsheaderwhiteright.webp');
  }
  .host.white.double,
  .host.normal.double {
    --ih-bg-l: url('/images/itemsheaderdoublenormalleft.webp');
    --ih-bg-m: url('/images/itemsheaderdoublenormalmiddle.webp');
    --ih-bg-r: url('/images/itemsheaderdoublenormalright.webp');
  }

  .host.magic {
    --ih-bg-l: url('/images/itemsheadermagicleft.webp');
    --ih-bg-m: url('/images/itemsheadermagicmiddle.webp');
    --ih-bg-r: url('/images/itemsheadermagicright.webp');
  }
  .host.magic.double {
    --ih-bg-l: url('/images/itemsheaderdoublemagicleft.webp');
    --ih-bg-m: url('/images/itemsheaderdoublemagicmiddle.webp');
    --ih-bg-r: url('/images/itemsheaderdoublemagicright.webp');
  }

  .host.rare {
    --ih-bg-l: url('/images/itemsheaderraresinglelineleft.webp');
    --ih-bg-m: url('/images/itemsheaderraresinglelinemiddle.webp');
    --ih-bg-r: url('/images/itemsheaderraresinglelineright.webp');
  }
  .host.rare.double {
    --ih-bg-l: url('/images/itemsheaderrareleft.webp');
    --ih-bg-m: url('/images/itemsheaderraremiddle.webp');
    --ih-bg-r: url('/images/itemsheaderrareright.webp');
  }

  .host.unique {
    --ih-bg-l: url('/images/itemsheaderuniquesinglelineleft.webp');
    --ih-bg-m: url('/images/itemsheaderuniquesinglelinemiddle.webp');
    --ih-bg-r: url('/images/itemsheaderuniquesinglelineright.webp');
  }
  .host.unique.double {
    --ih-bg-l: url('/images/itemsheaderuniqueleft.webp');
    --ih-bg-m: url('/images/itemsheaderuniquemiddle.webp');
    --ih-bg-r: url('/images/itemsheaderuniqueright.webp');
  }

  .host.currency {
    --ih-bg-l: url('/images/itemsheadercurrencyleft.webp');
    --ih-bg-m: url('/images/itemsheadercurrencymiddle.webp');
    --ih-bg-r: url('/images/itemsheadercurrencyright.webp');
  }
  .host.currency.double {
    --ih-bg-l: url('/images/itemsheaderdoublecurrencyleft.webp');
    --ih-bg-m: url('/images/itemsheaderdoublecurrencymiddle.webp');
    --ih-bg-r: url('/images/itemsheaderdoublecurrencyright.webp');
  }

  .host.gem {
    --ih-bg-l: url('/images/itemsheadergemleft.webp');
    --ih-bg-m: url('/images/itemsheadergemmiddle.webp');
    --ih-bg-r: url('/images/itemsheadergemright.webp');
  }
  .host.gem.double {
    --ih-bg-l: url('/images/itemsheaderdoublegemleft.webp');
    --ih-bg-m: url('/images/itemsheaderdoublegemmiddle.webp');
    --ih-bg-r: url('/images/itemsheaderdoublegemright.webp');
  }

  .host.quest {
    --ih-bg-l: url('/images/itemsheaderquestleft.webp');
    --ih-bg-m: url('/images/itemsheaderquestmiddle.webp');
    --ih-bg-r: url('/images/itemsheaderquestright.webp');
  }
  .host.quest.double {
    --ih-bg-l: url('/images/itemsheaderdoublequestleft.webp');
    --ih-bg-m: url('/images/itemsheaderdoublequestmiddle.webp');
    --ih-bg-r: url('/images/itemsheaderdoublequestright.webp');
  }

  .host {
    position: relative;
    box-sizing: border-box;
    text-align: center;
    line-height: 1;
    height: var(--ih-h);

    background-image: var(--ih-bg-m);
    background-repeat: repeat-x;
    background-size: auto 100%;
    background-position: calc(50% - var(--ih-w) / 2) 50%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-image: var(--ih-bg-m);
    background-repeat: repeat-x;
    background-size: auto 100%;
    background-position: 50% 50%;
    z-index: 1;
    user-select: none;
  }
  .background::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1;
    background-image: var(--ih-bg-l);
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position: left;
    width: var(--ih-w);
    mask-image: linear-gradient(to right, rgba(0, 0, 0, 1) 90%, transparent 95%);
  }
  .background::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-image: var(--ih-bg-r);
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position: right;
    width: var(--ih-w);
    mask-image: linear-gradient(to left, rgba(0, 0, 0, 1) 90%, transparent 95%);
  }

  .content {
    position: relative;
    z-index: 2;
  }
</style>
