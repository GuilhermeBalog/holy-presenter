export abstract class SlideMaker {
  abstract writeText(text: string): void

  abstract addBlankSlide(): void

  abstract getSlideHeight(): number

  abstract getTextHeigh(text: string): number

  public doesTextFit(text: string) {
    const textHeight = this.getTextHeigh(text);
    const slideHeight = this.getSlideHeight();

    return textHeight <= slideHeight
  }
}
