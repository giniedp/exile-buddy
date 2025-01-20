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
    --ih-bg-l: url('/images/itemsheaderwhiteleft.png');
    --ih-bg-m: url('/images/itemsheaderwhitemiddle.png');
    --ih-bg-r: url('/images/itemsheaderwhiteright.png');
  }
  .host.double {
    --ih-h: 3rem;
    --ih-w: 2.5rem;
  }

  .host.white,
  .host.normal {
    --ih-bg-l: url('/images/itemsheaderwhiteleft.png');
    --ih-bg-m: url('/images/itemsheaderwhitemiddle.png');
    --ih-bg-r: url('/images/itemsheaderwhiteright.png');
  }
  .host.white.double,
  .host.normal.double {
    --ih-bg-l: url('/images/itemsheaderdoublenormalleft.png');
    --ih-bg-m: url('/images/itemsheaderdoublenormalmiddle.png');
    --ih-bg-r: url('/images/itemsheaderdoublenormalright.png');
  }

  .host.magic {
    --ih-bg-l: url('/images/itemsheadermagicleft.png');
    --ih-bg-m: url('/images/itemsheadermagicmiddle.png');
    --ih-bg-r: url('/images/itemsheadermagicright.png');
  }
  .host.magic.double {
    --ih-bg-l: url('/images/itemsheaderdoublemagicleft.png');
    --ih-bg-m: url('/images/itemsheaderdoublemagicmiddle.png');
    --ih-bg-r: url('/images/itemsheaderdoublemagicright.png');
  }

  .host.rare {
    --ih-bg-l: url('/images/itemsheaderraresinglelineleft.png');
    --ih-bg-m: url('/images/itemsheaderraresinglelinemiddle.png');
    --ih-bg-r: url('/images/itemsheaderraresinglelineright.png');
  }
  .host.rare.double {
    --ih-bg-l: url('/images/itemsheaderrareleft.png');
    --ih-bg-m: url('/images/itemsheaderraremiddle.png');
    --ih-bg-r: url('/images/itemsheaderrareright.png');
  }

  .host.unique {
    --ih-bg-l: url('/images/itemsheaderuniquesinglelineleft.png');
    --ih-bg-m: url('/images/itemsheaderuniquesinglelinemiddle.png');
    --ih-bg-r: url('/images/itemsheaderuniquesinglelineright.png');
  }
  .host.unique.double {
    --ih-bg-l: url('/images/itemsheaderuniqueleft.png');
    --ih-bg-m: url('/images/itemsheaderuniquemiddle.png');
    --ih-bg-r: url('/images/itemsheaderuniqueright.png');
  }

  .host.currency {
    --ih-bg-l: url('/images/itemsheadercurrencyleft.png');
    --ih-bg-m: url('/images/itemsheadercurrencymiddle.png');
    --ih-bg-r: url('/images/itemsheadercurrencyright.png');
  }
  .host.currency.double {
    --ih-bg-l: url('/images/itemsheaderdoublecurrencyleft.png');
    --ih-bg-m: url('/images/itemsheaderdoublecurrencymiddle.png');
    --ih-bg-r: url('/images/itemsheaderdoublecurrencyright.png');
  }

  .host.gem {
    --ih-bg-l: url('/images/itemsheadergemleft.png');
    --ih-bg-m: url('/images/itemsheadergemmiddle.png');
    --ih-bg-r: url('/images/itemsheadergemright.png');
  }
  .host.gem.double {
    --ih-bg-l: url('/images/itemsheaderdoublegemleft.png');
    --ih-bg-m: url('/images/itemsheaderdoublegemmiddle.png');
    --ih-bg-r: url('/images/itemsheaderdoublegemright.png');
  }

  .host.quest {
    --ih-bg-l: url('/images/itemsheaderquestleft.png');
    --ih-bg-m: url('/images/itemsheaderquestmiddle.png');
    --ih-bg-r: url('/images/itemsheaderquestright.png');
  }
  .host.quest.double {
    --ih-bg-l: url('/images/itemsheaderdoublequestleft.png');
    --ih-bg-m: url('/images/itemsheaderdoublequestmiddle.png');
    --ih-bg-r: url('/images/itemsheaderdoublequestright.png');
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
