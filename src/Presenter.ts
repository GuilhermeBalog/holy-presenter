import { SlideMaker } from "./SlideMaker"

export class Presenter {
  private slideMaker: SlideMaker
  private readonly VERSE_SEPARATOR = '\n\n'
  private readonly SENTENCE_SEPARATOR = '\n'

  constructor(slideMaker: SlideMaker) {
    this.slideMaker = slideMaker
  }

  public writeLyrics(lyrics: string) {
    let verses = this.splitLyricInVerses(lyrics)
    let versesToBeWritten: string[] = []

    let i = 0
    while(i < verses.length) {
      const concat = [...versesToBeWritten, verses[i]]

      if(this.slideMaker.doesTextFit(concat.join(this.VERSE_SEPARATOR))){
        versesToBeWritten.push(verses[i])
        i++
      } else {
        if(versesToBeWritten.length == 0) {
          verses = verses.flatMap((verse, j) => {
            return i == j ? this.splitVerseInHalf(verses[i]) : verse
          })

          continue
        }

        this.slideMaker.writeText(versesToBeWritten.join(this.VERSE_SEPARATOR))
        versesToBeWritten = []
      }
    }

    this.slideMaker.writeText(versesToBeWritten.join(this.VERSE_SEPARATOR))
  }

  private splitLyricInVerses(lyrics: string) {
    return lyrics.split(this.VERSE_SEPARATOR)
  }

  private splitVerseInHalf(verse: string) {
    const sentences = verse.split(this.SENTENCE_SEPARATOR)
    const middle = Math.round(sentences.length / 2)

    const head = sentences.slice(0, middle).join(this.SENTENCE_SEPARATOR)
    const tail = sentences.slice(middle, sentences.length).join(this.SENTENCE_SEPARATOR)

    return [ head, tail ]
  }
}
