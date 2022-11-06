export const entries = []
// const entry1 = {name: "Midterm 1", pointsEarned}

export class Entry {
  constructor(id, name, pointsEarned, pointsPossible, percent) {
    this.id = id
    this.name = name
    this.pointsEarned = pointsEarned
    this.pointsPossible = pointsPossible
    this.percent = percent
  }
}

class Category {
  constructor(name, weight) {
    this.name = name
    this.weight = weight
  }
}
