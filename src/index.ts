import { Prayer } from "./Prayer"
import { PptxGenSlideMaker } from "./PptxGenSlideMaker"
import { Presenter } from "./Presenter"

import preyerFile from './resources/eucharistic-prayers/viii.json'

const powerpoint = new PptxGenSlideMaker()
const presenter = new Presenter(powerpoint)
const prayer = new Prayer(presenter)

powerpoint.makeFirstSlide()

prayer.writeEucharisticPrayer(preyerFile)

powerpoint.showSlides()
