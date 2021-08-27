import { loadScript } from '@paypal/paypal-js'
import { PayPalButtonsComponentOptions } from '@paypal/paypal-js/types/components/buttons'
import { PayPalScriptOptions } from '@paypal/paypal-js/types/script-options'

export async function loadPayPal(scriptOptions: PayPalScriptOptions, buttonOptions: PayPalButtonsComponentOptions) {
  if (window.paypal) throw new Error('The PayPal SDK has already been loaded.')

  const paypal = await loadScript(scriptOptions)
  paypal.Buttons(buttonOptions).render('#container')
}
