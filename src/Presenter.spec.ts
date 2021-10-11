import { Presenter } from "./Presenter"
import { TextSlideMaker } from "./TextSlideMaker"

test('Given a lyrics with one verse that fits in one slide it should make a single slide', () => {
  const width = 25
  const height = 10

  const textSlideMaker = new TextSlideMaker(width, height)
  const presenter = new Presenter(textSlideMaker)

  const lyrics = "This is a sample lyrics\nThat fits in one slide\nSample lyrics are great\nAnd are also mine"

  presenter.writeLyrics(lyrics)

  expect(presenter.getSlideCount()).toBe(1)
})

test('Given a lyrics with two verses that fit both in one slide it should make a single slide', () => {
  const width = 25
  const height = 10

  const textSlideMaker = new TextSlideMaker(width, height)
  const presenter = new Presenter(textSlideMaker)

  const lyrics = "This is a sample lyrics\nThat fits in one slide\nSample lyrics are great\nAnd are also mine"
            + "\n\nThis is a sample lyrics\nThat fits in one slide\nSample lyrics are great\nAnd are also mine"

  presenter.writeLyrics(lyrics)

  expect(presenter.getSlideCount()).toBe(1)
})

test('Given a lyrics with two verses that each one fit in one slide it should make two slides', () => {
  const width = 25
  const height = 5

  const textSlideMaker = new TextSlideMaker(width, height)
  const presenter = new Presenter(textSlideMaker)

  const lyrics = "This is a sample lyrics\nThat fits in one slide\nSample lyrics are great\nAnd are also mine"
            + "\n\nThis is a sample lyrics\nThat fits in one slide\nSample lyrics are great\nAnd are also mine"

  presenter.writeLyrics(lyrics)

  expect(presenter.getSlideCount()).toBe(2)
})

test('Given a lyrics with one verse that does not fit in one slide it should make two slides', () => {
  const width = 25
  const height = 5

  const textSlideMaker = new TextSlideMaker(width, height)
  const presenter = new Presenter(textSlideMaker)

  const lyrics = "This is a sample lyrics\nThat fits in one slide\nSample lyrics are great\nAnd are also mine\nLet's make a good verse\nIt's about time!"

  presenter.writeLyrics(lyrics)

  expect(presenter.getSlideCount()).toBe(2)
})

test('Given a lyrics with one sentence that does not fit in one slide it should make two slides', () => {
  const width = 10
  const height = 5

  const textSlideMaker = new TextSlideMaker(width, height)
  const presenter = new Presenter(textSlideMaker)

  const lyrics = "This is a sample lyrics with a very long sentence so it does not need to make sense!"

  presenter.writeLyrics(lyrics)

  expect(presenter.getSlideCount()).toBe(2)
})
