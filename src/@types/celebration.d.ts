interface Celebration {
  title: string
  subtitle: string
  songs: CelebrationSong[]
  readings: CelebrationReading[]
  eucharisticPrayer: EucharisticPrayer
}

interface CelebrationSong {
  label: string
  lyrics: string
}

interface CelebrationReading {
  label: string
  title: string
}

interface EucharisticPrayer {
  title: string
  verses: EucharisticPrayerVerse[]
}

interface EucharisticPrayerVerse {
  father: string
  assembly?: string
}
