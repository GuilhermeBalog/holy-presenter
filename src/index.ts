// import { Prayer } from "./Prayer"
import { PptxGenSlideMaker } from "./lib/PptxGenSlideMaker.js"
// import { Presenter } from "./Presenter.js"

// import preyerFile from './resources/eucharistic-prayers/viii.json'
// import { lyrics } from './resources/lyrics.json'

const powerpoint = new PptxGenSlideMaker()
// const presenter = new Presenter(powerpoint)
// const prayer = new Prayer(presenter)

powerpoint.makeFirstSlide()

// presenter.writeLyrics(lyrics)
// prayer.writeEucharisticPrayer(preyerFile)

powerpoint.showSlides()
