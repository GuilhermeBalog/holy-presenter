import { SlideMaker } from "./SlideMaker"

export class Presenter {
  private readonly VERSE_SEPARATOR = '\n\n'
  private readonly SENTENCE_SEPARATOR = '\n'
  private readonly WORD_SEPARATOR = ' '
  private readonly LETTER_SEPARATOR = ''

  private slideMaker: SlideMaker
  private slideCount: number

  constructor(slideMaker: SlideMaker) {
    this.slideMaker = slideMaker
    this.slideCount = 0
  }

  public getSlideCount() {
    return this.slideCount
  }

  public writeLyrics(lyrics: string) {
    let verses = this.splitLyricInVerses(lyrics)
    let versesToBeWritten: string[] = []

    let i = 0
    while(i < verses.length) {
      const previousVersesWithCurrentVerses = [...versesToBeWritten, verses[i]]
      const candidateTextToBeWritten = previousVersesWithCurrentVerses.join(this.VERSE_SEPARATOR)

      if(this.slideMaker.doesTextFit(candidateTextToBeWritten)) {
        versesToBeWritten.push(verses[i])
        i++
        continue
      }

      if(versesToBeWritten.length == 0) {
        verses = this.splitVerseAtPosition(verses, i)
        continue
      }

      this.slideMaker.writeText(versesToBeWritten.join(this.VERSE_SEPARATOR))
      this.slideCount++
      versesToBeWritten = []
    }

    if(versesToBeWritten.length > 0) {
      this.slideMaker.writeText(versesToBeWritten.join(this.VERSE_SEPARATOR))
      this.slideCount++
    }
  }

  private splitVerseAtPosition(verses: string[], i: number) {
    return verses.flatMap((verse, j) => {
      return i == j ? this.splitVerseInHalf(verses[i]) : verse
    })
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
    } else if(verse.includes(this.WORD_SEPARATOR)) {
      return this.splitInHalf(verse, this.WORD_SEPARATOR)
    } else {
      return this.splitInHalf(verse, this.LETTER_SEPARATOR)
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
