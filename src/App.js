import './App.css'
import SingleCourseSummary from './views/SingleCourseSummary'
import CourseTitle from './components/CourseTitle'
import { NextUIProvider } from '@nextui-org/react'

function App() {
  return (
    <>
      <NextUIProvider>
        <SingleCourseSummary />
      </NextUIProvider>
    </>
  )
}

export default App
