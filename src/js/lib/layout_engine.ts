export class LayoutEngine {
  public static shared = new LayoutEngine()

  private overlayClassName = 'body--overlay'
  private mutationObserver?: MutationObserver

  // MARK: - Object Lifecycle

  private constructor() {
    if (!window.frameElement) console.warn('[LayoutEngine] `window.frameElement` is not available.')

    window.addEventListener('resize', () => this.update())
    window.addEventListener('DOMContentLoaded', () => {
      this.mutationObserver = new MutationObserver(() => this.update())
      this.mutationObserver.observe(document.body, { attributes: true, childList: true, subtree: true })
      this.update()
    })
  }

  // MARK: - Getters

  private get isOverlayClassEnabled() {
    return document.body.classList.contains(this.overlayClassName)
  }

  private get overlayElement() {
    return document.body.querySelector('[id^="paypal-overlay-"]')
  }

  // MARK: - Layout

  private update() {
    if (this.isOverlayClassEnabled && !this.overlayElement) {
      document.body.classList.remove(this.overlayClassName)
    } else if (!this.isOverlayClassEnabled && this.overlayElement) {
      document.body.classList.add(this.overlayClassName)
    }

    const frameElement = window.frameElement as HTMLElement
    if (frameElement) {
      frameElement.style.width = '100%'
      frameElement.style.height = this.isOverlayClassEnabled ? '100%' : `${document.body.offsetHeight}px`
      frameElement.style.position = this.isOverlayClassEnabled ? 'fixed' : ''
      frameElement.style.top = this.isOverlayClassEnabled ? '0' : ''
      frameElement.style.left = this.isOverlayClassEnabled ? '0' : ''
      frameElement.style.right = this.isOverlayClassEnabled ? '0' : ''
      frameElement.style.bottom = this.isOverlayClassEnabled ? '0' : ''
      frameElement.style.zIndex = this.isOverlayClassEnabled ? '2147483647' : ''
    }
  }
}
