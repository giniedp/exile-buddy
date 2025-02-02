<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'

  const { Story } = defineMeta({
    title: 'Layout',
    tags: ['autodocs'],
    argTypes: {},
    args: {
      content: ``,
    },
  })
</script>

<Story name="header and footer">
  <div class="relative h-96 w-96">
    <div class="app-page bg-base-300">
      <div class="app-header bg-base-100 p-4">Header is at the top</div>

      <div class="app-footer bg-base-100 p-4">Footer is at the bottom</div>
    </div>
  </div>
</Story>

<Story name="header, footer and content">
  <div class="relative h-96 w-96">
    <div class="app-page bg-base-300">
      <div class="app-header bg-base-100 p-4">Header is at the top</div>
      <div class="app-content bg-primary p-4">Content is stretched between header and footer</div>
      <div class="app-footer bg-base-100 p-4">Footer is at the bottom</div>
    </div>
  </div>
</Story>

<Story name="clipped content">
  <div class="relative h-96 w-96">
    <div class="app-page bg-base-300">
      <div class="app-header bg-base-100 p-4">Header is at the top</div>
      <div class="app-content bg-primary p-4">
        Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine.
        You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water.
        We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are
        connected, you and I. We're on the same curve, just on opposite ends. Your bones don't break, mine do. That's
        clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also
        clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We
        get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same
        curve, just on opposite ends.
      </div>
      <div class="app-footer bg-base-100 p-4">Footer is at the bottom</div>
    </div>
  </div>
</Story>

<Story name="scrolling content">
  <div class="relative h-96 w-96">
    <div class="app-page bg-base-300">
      <div class="app-header bg-base-100 p-4">Header is at the top</div>
      <div class="app-content overflow-y-auto bg-primary p-4">
        Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine.
        You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water.
        We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are
        connected, you and I. We're on the same curve, just on opposite ends. Your bones don't break, mine do. That's
        clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also
        clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We
        get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same
        curve, just on opposite ends.
      </div>
      <div class="app-footer bg-base-100 p-4">Footer is at the bottom</div>
    </div>
  </div>
</Story>

<Story name="sidebar">
  <div class="relative h-96 w-96">
    <div class="app-page bg-base-300">
      <div class="app-header bg-base-100 p-4">Header is at the top</div>
      <div class="app-content flex flex-row bg-primary">
        <div class="bg-base-200 flex-none p-4">Sidebar</div>
      </div>
      <div class="app-footer bg-base-100 p-4">Footer is at the bottom</div>
    </div>
  </div>
</Story>

<Story name="sidebar with main content">
  <div class="relative h-96 w-96">
    <div class="app-page bg-base-300">
      <div class="app-header bg-base-100 p-4">Header is at the top</div>
      <div class="app-content flex flex-row bg-primary">
        <div class="bg-base-200 flex-none p-4">Sidebar</div>
        <div class="app-content p-4">Main Content</div>
      </div>
      <div class="app-footer bg-base-100 p-4">Footer is at the bottom</div>
    </div>
  </div>
</Story>

<Story name="Nested page">
  <div class="relative h-96 w-96">
    <div class="app-page bg-base-300">
      <div class="app-header bg-base-100 p-4">Header is at the top</div>
      <div class="app-content flex flex-row bg-primary">
        <div class="bg-base-200 flex-none p-4">Sidebar</div>
        <div class="app-content p-4">
          <div class="app-page bg-base-300">
            <div class="app-header bg-base-100 p-4">Header is at the top</div>
            <div class="app-footer bg-base-100 p-4">Footer is at the bottom</div>
          </div>
        </div>
      </div>
      <div class="app-footer bg-base-100 p-4">Footer is at the bottom</div>
    </div>
  </div>
</Story>
