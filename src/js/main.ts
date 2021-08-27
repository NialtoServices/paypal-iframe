import 'promise-polyfill'
import './lib/layout_engine'
import { loadPayPal } from './lib/helpers'

declare global {
  interface Window {
    loadPayPal: Function
  }
}

window.loadPayPal = loadPayPal 
