import { Presenter } from "./Presenter";

export class Prayer {
  private presenter: Presenter

  constructor(presenter: Presenter) {
    this.presenter = presenter
  }

  public writeEucharisticPrayer(eucharisticPrayer: EucharisticPrayer) {
    const verses = this.transformEucharisticPrayerIntoVerses(eucharisticPrayer)
    verses.forEach(verse => this.presenter.writeLyrics(verse))
  }

  private transformEucharisticPrayerIntoVerses(eucharisticPrayer: EucharisticPrayer) {
    return eucharisticPrayer.verses.map((verse, index) => {
      let v = ''
      if(index == 0) {
        v += `{${eucharisticPrayer.title.toLocaleUpperCase()}}\n\n`
      }

      v += verse.father

      if(verse.assembly) {
        v += `\n\n{${verse.assembly}}`
      }

      return v
    })
  }
}
