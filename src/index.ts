
import { readFile } from "fs/promises"
import { join } from "path"
import { TextSlideMaker } from "./TextSlideMaker"

const VERSE_SEPARATOR = "\n\n"

async function readLyrics() {
  const powerpoint = new TextSlideMaker()
  const lyricsPath = join(__dirname, "lyrics.example")
  const lyricsBuffer = await readFile(lyricsPath)
  const lyrics = lyricsBuffer.toString("utf-8")

  const verses = lyrics.split(VERSE_SEPARATOR)

  verses.forEach(verse => console.log(powerpoint.makeSlide(verse)))
}

readLyrics()
