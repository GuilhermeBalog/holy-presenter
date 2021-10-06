
import { readFile } from "fs/promises"
import { join } from "path"
import { Presenter } from "./Presenter"
import { TextSlideMaker } from "./TextSlideMaker"

const powerpoint = new TextSlideMaker(70, 6)
const presenter = new Presenter(powerpoint)

async function readLyrics() {
  const lyricsPath = join(__dirname, "lyrics.example")
  const lyricsBuffer = await readFile(lyricsPath)
  const lyrics = lyricsBuffer.toString("utf-8")

  presenter.writeLyrics(lyrics)
  powerpoint.showSlides()
}

readLyrics()
