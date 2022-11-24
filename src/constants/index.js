export const entries = []

export class Entry {
  constructor(id, name, pointsEarned, pointsPossible, percent, category) {
    this.id = id
    this.name = name
    this.pointsEarned = pointsEarned
    this.pointsPossible = pointsPossible
    this.percent = percent
    this.category = category
  }
}

class Category {
  constructor(name, weight) {
    this.name = name
    this.weight = weight
  }
}
