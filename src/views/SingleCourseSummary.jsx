import Entry from '../components/Entry'
import { entries } from '../constants'
import Table from '../components/Table'
import CourseTitle from '../components/CourseTitle'

function SingleCourseSummary() {
  console.log(entries)

  return (
    <div>
      <CourseTitle />
      <Table />
    </div>
  )
}

export default SingleCourseSummary
