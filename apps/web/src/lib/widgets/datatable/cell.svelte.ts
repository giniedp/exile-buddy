import type { ICellRendererComp, ICellRendererParams } from 'ag-grid-community'
import { mount, unmount, type Component, type ComponentProps } from 'svelte'

export type ParamToProp<TData, TValue, C extends Component> = (
  params: ICellRendererParams<TData, TValue>,
) => ComponentProps<C>
export default function svelteCell<TData, TValue, C extends Component>(
  component: C,
  paramToProp: ParamToProp<TData, TValue, C>,
) {
  class SvelteCell implements ICellRendererComp<TData> {
    el: HTMLElement
    ref: any
    props: any = $state({})

    init(params: ICellRendererParams<TData, TValue>) {
      this.props = paramToProp(params)
      this.el = document.createElement('span')
      this.ref = mount(component, {
        target: this.getGui(),
        props: this.props,
      })
    }

    getGui() {
      return this.el
    }

    refresh(params: ICellRendererParams<TData, TValue>): boolean {
      if (!this.props) {
        return false
      }
      try {
        Object.assign(this.props, paramToProp(params))
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    }

    destroy(): void {
      if (this.ref) {
        unmount(this.ref)
      }
      this.ref = null
      this.el = null
    }
  }
  return SvelteCell
}
