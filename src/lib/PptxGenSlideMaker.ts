import PptxGen from "pptxgenjs";

import { SlideMaker } from "./SlideMaker";

export class PptxGenSlideMaker extends SlideMaker {
  private readonly FONT_SIZE = 96
  private readonly SENTENCE_SEPARATOR = '\n'

  private presentation: PptxGen
  private width: number
  private height: number

  constructor() {
    super()
    this.presentation = new PptxGen();

    const presentationLayout = this.presentation.presLayout
    const { width, height } = this.normalizeDimensions(presentationLayout)
    this.width = width
    this.height = height
  }

  public add(text: string) {
    // const id = 'tabLargeCellText'
    // const table = document.createElement('table');
    // table.setAttribute('id', id)
    // table.style.fontSize = `${this.FONT_SIZE}px`
    // table.innerHTML = `<tr><td>${text}</td></tr>`;
    // document.body.append(table);
    // this.presentation.tableToSlides(id)
    // this.presentation.tableToSlides(id, { autoPage: true, fontSize: this.FONT_SIZE, verbose: false })
    // document.body.removeChild(table)
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
    const excerpts: PptxGen.TextProps[] = text.split(/{|}/).map((excerpt, i) => ({
      text: excerpt,
      options: {
        bold: i % 2 != 0
      }
    }))

    slide.addText(excerpts, {
      x: "2.5%",
      y: "2.5%",
      w: "95%",
      h: "95%",
      color: "333333",
      lang: "pt-BR",
      fontFace: "Arial",
      fontSize: this.FONT_SIZE,
      autoFit: true,
    })
  }

  addBlankSlide() {
    this.presentation.addSlide()
  }

  makeFirstSlide() {
    // const title = 'Missa do 23º Domingo do Tempo Comum';
    // const backgroundColor = 'FFFFFF';
    // const textColor = "000000";
    // const imagePath = path.join(__dirname, 'resources/images/matriz.jpg');

    // this.presentation
    //   .addSlide()
    //   .addImage({
    //     path: imagePath,
    //     x: 0,
    //     y: 0,
    //     w: '100%',
    //     h: '100%'
    //   })
    //   .addText(title, {
    //     x: 0,
    //     y: 0,
    //     margin: [10, 10, 1, 1],
    //     align: 'center',
    //     bold: true,
    //     fit: 'shrink',
    //     w: '100%',
    //     h: 1,
    //     color: textColor,
    //     lang: "pt-BR",
    //     fontFace: "Arial",
    //     fontSize: 50,
    //     fill: {
    //       color: backgroundColor,
    //     }
    //   })
  }

  getSlideHeight() {
    return this.height;
  }

  getTextHeigh(text: string) {
    const lines = text.split(this.SENTENCE_SEPARATOR);

    const numberOfLines = lines
      .reduce((total, sentence) => {
        const heightInLines = Math.ceil(sentence.length * this.FONT_SIZE / this.width);

        return total + heightInLines
      }, 0);

    return numberOfLines * this.FONT_SIZE;
  }

  showSlides() {
    const d = new Date();
    const [year, month, day, hour, minutes] = [
      d.getFullYear(),
      (d.getMonth() + 1).toString().padStart(2, '0'),
      d.getDate().toString().padStart(2, '0'),
      d.getHours().toString().padStart(2, '0'),
      d.getMinutes().toString().padStart(2, '0'),
    ];

    const fileName = `presentation-${year}${month}${day}-${hour}${minutes}`;

    this.presentation.writeFile({ fileName })
      .then(fileName => {
        console.log(fileName, "saved")
      })
  }
}
