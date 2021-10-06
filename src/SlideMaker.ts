export abstract class SlideMaker {
  abstract writeText(text: string): void

  abstract getSlideHeight(): number

  abstract getTextHeigh(text: string): number

  public doesTextFit(text: string) {
    return this.getTextHeigh(text) <= this.getSlideHeight()
  }
}
