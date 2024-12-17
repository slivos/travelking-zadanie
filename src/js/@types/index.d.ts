export {}

import {lazyLoading} from "../lazyload/lazyload-init"

declare global {
  interface Window {
    lazyloading?: typeof lazyLoading
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: Record<string, any>[]
  }
}
