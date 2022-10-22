import { entries } from '../constants'

function Entry({ entryProp }) {
  return (
    <tr>
      <td>{entryProp.name}</td>
      <td>{entryProp.pointsEarned}</td>
      <td>{entryProp.pointsPossible}</td>
      <td>{entryProp.percent}</td>
    </tr>
  )
}

export default Entry
