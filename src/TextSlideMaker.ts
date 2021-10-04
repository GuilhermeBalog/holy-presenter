import { SlideMaker } from "./SlideMaker"

export class TextSlideMaker implements SlideMaker {
  private readonly WIDTH = 50
  private readonly HEIGHT = 10
  private readonly TOP_LEFT_CORNER_CHAR = "┌"
  private readonly TOP_RIGHT_CORNER_CHAR = "┐"
  private readonly BOTTOM_LEFT_CORNER_CHAR = "└"
  private readonly BOTTOM_RIGHT_CORNER_CHAR = "┘"
  private readonly HORIZONTAL_CHAR = "─"
  private readonly VERTICAL_CHAR = "│"
  private readonly BLANK_CHAR = " "

  private slides: string[]
  private currentSlide: number

  constructor() {
    this.slides = []
    this.currentSlide = -1
  }

  public writeText(text: string){
    this.slides[this.currentSlide] = text
  }


  public getSlideWidth() {
    return this.WIDTH
  }

  public getSlideHeight() {
    return this.HEIGHT
  }

  public getTextWidth(text: string) {
    const maxLineLength = text
      .split('\n')
      .reduce((maxLength, sentence) => Math.max(maxLength, sentence.length), 0)

    return Math.min(maxLineLength, this.WIDTH)
  }

  public getTextHeigh(text: string) {
    return text
      .split('\n')
      .reduce((total, sentence) => {
        return total +  Math.ceil(sentence.length / this.WIDTH)
      }, 0)
  }

  public newSlide() {
    this.slides.push("")
    this.currentSlide = this.slides.length - 1
  }

  public makeSlide(content: string) {
    let slide = ''
    slide += this.createTopLine()
    slide += this.createContentLines(content)
    slide += this.createBottomLine()

    return slide
  }

  private createContentLines(content: string) {
    let slideLines = ''
    let lineCount = 0
    const contentLines = content.split('\n')

    contentLines.forEach(line => {
      if(lineCount >= this.HEIGHT) return;

      const totalLines = Math.ceil(line.length / this.WIDTH)

      for (let index = 0; index < totalLines; index++) {
        if(lineCount >= this.HEIGHT) break;
        const start = index * this.WIDTH
        slideLines += this.createTextLine(line.slice(start, start + this.WIDTH))
        lineCount++
      }
    })

    if(lineCount < this.HEIGHT) {
      slideLines += this.createBlankLine().repeat(this.HEIGHT - lineCount)
    }

    return slideLines
  }

  private createTopLine() {
    let topLine = ''
    topLine += this.TOP_LEFT_CORNER_CHAR
    topLine += this.HORIZONTAL_CHAR.repeat(this.WIDTH)
    topLine += this.TOP_RIGHT_CORNER_CHAR
    topLine += '\n'

    return topLine
  }

  private createBottomLine() {
    let bottomLine = ''
    bottomLine += this.BOTTOM_LEFT_CORNER_CHAR
    bottomLine += this.HORIZONTAL_CHAR.repeat(this.WIDTH)
    bottomLine += this.BOTTOM_RIGHT_CORNER_CHAR
    bottomLine += '\n'

    return bottomLine
  }

  private createBlankLine() {
    return this.VERTICAL_CHAR + this.BLANK_CHAR.repeat(this.WIDTH) + this.VERTICAL_CHAR + '\n'
  }

  private createTextLine(text: string) {
    return this.VERTICAL_CHAR + text.trim().padEnd(this.WIDTH, this.BLANK_CHAR) + /*this.BLANK_CHAR.repeat(this.WIDTH) +*/ this.VERTICAL_CHAR + '\n'
  }


}
