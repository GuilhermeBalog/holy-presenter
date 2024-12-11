import { SlideMaker } from "./SlideMaker.js"

export class TextSlideMaker extends SlideMaker {
  private readonly TOP_LEFT_CORNER_CHAR = "┌"
  private readonly TOP_RIGHT_CORNER_CHAR = "┐"
  private readonly BOTTOM_LEFT_CORNER_CHAR = "└"
  private readonly BOTTOM_RIGHT_CORNER_CHAR = "┘"
  private readonly HORIZONTAL_CHAR = "─"
  private readonly VERTICAL_CHAR = "│"
  private readonly BLANK_CHAR = " "

  private readonly SENTENCE_SEPARATOR = '\n'

  private width: number
  private height: number
  private slides: string[]

  constructor(width: number, height: number) {
    super()
    this.width = width
    this.height = height
    this.slides = []
  }

  public writeText(text: string){
    this.slides.push(text)
  }

  public addBlankSlide(): void {
    this.slides.push('')
  }

  public getSlideHeight() {
    return this.height
  }

  public getTextHeigh(text: string) {
    return text
      .split(this.SENTENCE_SEPARATOR)
      .reduce((total, sentence) => {
        return total +  Math.ceil(sentence.length / this.width)
      }, 0)
  }

  public showSlides() {
    this.slides.forEach((slide, slideId) => {
      console.log(` Slide #${slideId}`)
      console.log(this.makeSlide(slide))
    })
  }

  private makeSlide(content: string) {
    let slide = ''

    slide += this.createTopLine()
    slide += this.createContentLines(content)
    slide += this.createBottomLine()

    return slide
  }

  private createContentLines(content: string) {
    let slideLines = ''
    let lineCount = 0
    const contentLines = content.split(this.SENTENCE_SEPARATOR)

    contentLines.forEach(line => {
      if(lineCount >= this.height) return;

      const totalLines = Math.ceil(line.length / this.width)

      for (let index = 0; index < totalLines; index++) {
        if(lineCount >= this.height) break;
        const start = index * this.width
        slideLines += this.createTextLine(line.slice(start, start + this.width))
        lineCount++
      }
    })

    if(lineCount < this.height) {
      slideLines += this.createBlankLine().repeat(this.height - lineCount)
    }

    return slideLines
  }

  private createTopLine() {
    let topLine = ''

    topLine += this.TOP_LEFT_CORNER_CHAR
    topLine += this.HORIZONTAL_CHAR.repeat(this.width)
    topLine += this.TOP_RIGHT_CORNER_CHAR
    topLine += this.SENTENCE_SEPARATOR

    return topLine
  }

  private createBottomLine() {
    let bottomLine = ''

    bottomLine += this.BOTTOM_LEFT_CORNER_CHAR
    bottomLine += this.HORIZONTAL_CHAR.repeat(this.width)
    bottomLine += this.BOTTOM_RIGHT_CORNER_CHAR
    bottomLine += this.SENTENCE_SEPARATOR

    return bottomLine
  }

  private createBlankLine() {
    let blankLine = ''

    blankLine += this.VERTICAL_CHAR
    blankLine += this.BLANK_CHAR.repeat(this.width)
    blankLine += this.VERTICAL_CHAR
    blankLine += this.SENTENCE_SEPARATOR

    return blankLine
  }

  private createTextLine(text: string) {
    let textLine = ''

    textLine += this.VERTICAL_CHAR
    textLine += text.trim().padEnd(this.width, this.BLANK_CHAR)
    textLine += this.VERTICAL_CHAR
    textLine += this.SENTENCE_SEPARATOR

    return textLine
  }

}
