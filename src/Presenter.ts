import { SlideMaker } from "./SlideMaker"

export class Presenter {
  private slideMaker: SlideMaker
  private readonly VERSE_SEPARATOR = '\n\n'

  constructor(slideMaker: SlideMaker) {
    this.slideMaker = slideMaker
  }

  public writeLyrics(lyrics: string) {
    const verses = this.splitLyricInVerses(lyrics)
    let versesToBeWritten: string[] = []

    for(let i = 0; i < verses.length; i++) {
      const concat = [...versesToBeWritten, verses[i]]

      if(this.slideMaker.doesTextFit(concat.join(this.VERSE_SEPARATOR))){
        versesToBeWritten.push(verses[i])
      } else {
        this.slideMaker.writeText(versesToBeWritten.join(this.VERSE_SEPARATOR))
        versesToBeWritten = [verses[i]]
      }
    }

    this.slideMaker.writeText(versesToBeWritten.join(this.VERSE_SEPARATOR))
  }

  private splitLyricInVerses(lyrics: string) {
    return lyrics.split(this.VERSE_SEPARATOR)
  }

}
