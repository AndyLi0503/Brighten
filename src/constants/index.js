export const entries = []
// const entry1 = {name: "Midterm 1", pointsEarned}

export class Entry {
  constructor(name, pointsEarned, pointsPossible, percent) {
    this.name = name
    this.pointsEarned = pointsEarned
    this.pointsPossible = pointsPossible
    this.percent = percent
  }
}

entries.push(new Entry('Midterm 1', 76, 100, 0.76))
entries.push(new Entry('Midterm 2', 94, 100, 0.94))
entries.push(new Entry('Midterm 3', 80, 100, 0.8))
entries.push(new Entry('Final', 190, 200, 0.95))

class Category {
  constructor(name, weight) {
    this.name = name
    this.weight = weight
  }
}
