import Entry from '../components/Entry'
import { entries } from '../constants'
import Table from '../components/Table'
import CourseTitle from '../components/CourseTitle'
//import { useState } from 'react'

function SingleCourseSummary() {
  console.log(entries)
  //const [entries, setEntries] = useState([])
  return (
    <div>
      <CourseTitle />

      <Table />
    </div>
  )
}

export default SingleCourseSummary
