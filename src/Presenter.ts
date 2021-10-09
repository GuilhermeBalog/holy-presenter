import { SlideMaker } from "./SlideMaker"

export class Presenter {
  private slideMaker: SlideMaker
  private readonly VERSE_SEPARATOR = '\n\n'
  private readonly SENTENCE_SEPARATOR = '\n'
  private readonly WORD_SEPARATOR = ' '

  constructor(slideMaker: SlideMaker) {
    this.slideMaker = slideMaker
  }

  public writeLyrics(lyrics: string) {
    let verses = this.splitLyricInVerses(lyrics)
    let versesToBeWritten: string[] = []

    let i = 0
    while(i < verses.length) {
      const concat = [...versesToBeWritten, verses[i]]

      if(this.slideMaker.doesTextFit(concat.join(this.VERSE_SEPARATOR))) {
        versesToBeWritten.push(verses[i])
        i++
        continue
      }

      if(versesToBeWritten.length == 0) {
        verses = verses.flatMap((verse, j) => {
          return i == j ? this.splitVerseInHalf(verses[i]) : verse
        })

        continue
      }

      this.slideMaker.writeText(versesToBeWritten.join(this.VERSE_SEPARATOR))
      versesToBeWritten = []
    }

    this.slideMaker.writeText(versesToBeWritten.join(this.VERSE_SEPARATOR))
  }

  private splitLyricInVerses(lyrics: string) {
    return lyrics
      .split(this.VERSE_SEPARATOR)
      .map(verse => verse.trim())
      .filter(verse => verse.length > 0)
  }

  private splitVerseInHalf(verse: string) {
    if(verse.includes(this.SENTENCE_SEPARATOR)){
      return this.splitInHalf(verse, this.SENTENCE_SEPARATOR)
    } else {
      return this.splitInHalf(verse, this.WORD_SEPARATOR)
    }
  }

  private splitInHalf(text: string, separator: string) {
    const parts = text.split(separator)
    const middle = Math.round(parts.length / 2)

    const head = parts.slice(0, middle).join(separator)
    const tail = parts.slice(middle, parts.length).join(separator)

    return [ head, tail ]
  }
}
