export interface SlideMaker {
  writeText(text: string): void
  getSlideWidth(): number
  getSlideHeight(): number

  getTextWidth(text: string): number
  getTextHeigh(text: string): number

  newSlide(): void
}
