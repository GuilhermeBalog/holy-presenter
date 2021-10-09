import PptxGen from "pptxgenjs";

import { SlideMaker } from "./SlideMaker";

export class PptxGenSlideMaker extends SlideMaker {
  private readonly FONT_SIZE = 50

  private presentation: PptxGen
  private width: number
  private height: number

  constructor() {
    super()
    this.presentation = new PptxGen();

    const presentationLayout = this.presentation.presLayout as unknown as PptxGen.PresLayout
    const { width, height } = this.normalizeDimensions(presentationLayout)
    this.width = width
    this.height = height
  }

  private normalizeDimensions(layout: PptxGen.PresLayout) {
    const inchesToPointsRatio = 72
    const factor = layout.width / 10

    return {
      width: normalizeValue(layout.width),
      height: normalizeValue(layout.height)
    }

    function normalizeValue(value: number) {
      return (value / factor) * inchesToPointsRatio
    }
  }

  writeText(text: string) {
    const slide = this.presentation.addSlide()

    slide.addText(text, {
      x: "5%",
      y: "5%",
      w: "90%",
      h: "90%",
      color: "000000",
      lang: "pt-BR",
      fontFace: "Arial",
      fontSize: this.FONT_SIZE,
    })
  }

  getSlideHeight() {
    return this.height;
  }

  getTextHeigh(text: string) {
    const numberOfLines = text
      .split('\n')
      .reduce((total, sentence) => {
        return total + Math.ceil(sentence.length * this.FONT_SIZE / this.width)
      }, 0)

    return numberOfLines * this.FONT_SIZE;
  }

  showSlides() {
    console.log("saving...")
    this.presentation.writeFile().then(fileName => {
      console.log(fileName, "saved")
    })
  }
}
