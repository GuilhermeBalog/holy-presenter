import { PptxGenSlideMaker } from "./PptxGenSlideMaker"
import { Presenter } from "./Presenter"

import lyricsFile from './lyrics.json'

const powerpoint = new PptxGenSlideMaker()
const presenter = new Presenter(powerpoint)

presenter.writeLyrics(lyricsFile.lyrics)
powerpoint.showSlides()
