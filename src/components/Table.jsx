import React from 'react'
import EntryComponent from '../components/Entry'
import './Table.css'
import { useEffect, useState, useRef } from 'react'
import { Entry } from '../constants/index'
import { v4 as uuidv4 } from 'uuid'
import WeightsNote from '../components/WeightsNote'

export default function Table({ tableProp }) {
  const [gradePercent, setGradePercent] = useState(0)
  const [entries, setEntries] = useState([])
  const [gradeLetter, setGradeLetter] = useState('F')
  const [entriesInit, setEntriesInit] = useState([])
  const [weights, setWeights] = useState([1, 1, 1, 1, 1])
  // const [weightsContain, setWeightsContain] = useState([
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  // ])
  const entryNameRef = useRef()
  const entryPERef = useRef()
  const entryPPRef = useRef()
  const entryCategoryRef = useRef()
  const assignmentWeightRef = useRef()
  const quizWeightRef = useRef()
  const examWeightRef = useRef()
  const projectWeightRef = useRef()
  const participationWeightRef = useRef()

  useEffect(function () {
    calculationTotal()
    const e1 = new Entry(uuidv4(), 'Midterm', 76, 100, '76.00%', 'Exam')
    const e2 = new Entry(uuidv4(), 'Project 1', 94, 100, '94.00%', 'Project')
    const e3 = new Entry(uuidv4(), 'Project 2', 80, 100, '80.00%', 'Project')
    const e4 = new Entry(uuidv4(), 'Final', 190, 200, '95.00%', 'Exam')

    const arr = []
    arr.push(e1)
    arr.push(e2)
    arr.push(e3)
    arr.push(e4)
    setEntries(arr)
    setEntriesInit(arr)

    assignmentWeightRef.current.value = 0
    quizWeightRef.current.value = 0
    examWeightRef.current.value = 0
    projectWeightRef.current.value = 0
    participationWeightRef.current.value = 0
  }, [])

  useEffect(() => {
    calculationTotal()
  }, [entries, weights])

  function handleAddEntry(e) {
    const name = entryNameRef.current.value
    const pe = entryPERef.current.value
    const pp = entryPPRef.current.value
    const category = entryCategoryRef.current.value
    const npe = parseInt(pe, 10)
    const npp = parseInt(pp, 10)
    if (name === '' || pe === '' || pp === '') return
    setEntries((prevEntries) => {
      return [
        ...prevEntries,

        {
          id: uuidv4(),
          name: name,
          pointsEarned: npe,
          pointsPossible: npp,
          percent: (Math.round((npe / npp) * 100 * 100) / 100).toFixed(2) + '%',
          category: category,
        },
      ]
    })

    entryNameRef.current.value = null
    entryPERef.current.value = null
    entryPPRef.current.value = null
    entryCategoryRef.current.value = null
  }

  function calculationTotal() {
    let totalEarned = 0
    let totalPossible = 0
    // for (const entry of entries) {
    //   if (entry.category === 'Exam') {
    //     weightsContain[0] = true
    //   } else if (entry.category === 'Quiz') {
    //     weightsContain[1] = true
    //   } else if (entry.category === 'Exam') {
    //     weightsContain[2] = true
    //   } else if (entry.category === 'Project') {
    //     weightsContain[3] = true
    //   } else if (entry.category === 'Participation') {
    //     weightsContain[4] = true
    //   }
    // }
    for (const entry of entries) {
      let multiplier = 1
      if (entry.category === 'Exam') {
        multiplier = weights[0]
      } else if (entry.category === 'Quiz') {
        multiplier = weights[1]
      } else if (entry.category === 'Exam') {
        multiplier = weights[2]
      } else if (entry.category === 'Project') {
        multiplier = weights[3]
      } else if (entry.category === 'Participation') {
        multiplier = weights[4]
      }

      totalEarned += entry.pointsEarned * multiplier
      totalPossible += entry.pointsPossible * multiplier
    }

    let _gradePercent = totalEarned / totalPossible
    if (_gradePercent < 0.6) setGradeLetter('F')
    if (_gradePercent >= 0.6) setGradeLetter('D')
    if (_gradePercent >= 0.67) setGradeLetter('D+')
    if (_gradePercent >= 0.7) setGradeLetter('C-')
    if (_gradePercent >= 0.73) setGradeLetter('C')
    if (_gradePercent >= 0.77) setGradeLetter('C+')
    if (_gradePercent >= 0.8) setGradeLetter('B-')
    if (_gradePercent >= 0.83) setGradeLetter('B')
    if (_gradePercent >= 0.87) setGradeLetter('B+')
    if (_gradePercent >= 0.9) setGradeLetter('A-')
    if (_gradePercent >= 0.93) setGradeLetter('A')
    if (_gradePercent >= 0.97) setGradeLetter('A+')
    setGradePercent(_gradePercent)
  }

  const handleDelete = (id) => {
    const matched = entries.filter((entry) => entry.id !== id)
    setEntries(matched)
  }

  const handleEdit = (id, newName, newPE, newPP, newCategory) => {
    if (newName === '' || newPE === '' || newPP === '') return
    const newEntries = [...entries]
    const index = entries.findIndex((entry) => entry.id === id)
    const ne = new Entry(
      id,
      newName,
      newPE,
      newPP,
      (Math.round((newPE / newPP) * 100 * 100) / 100).toFixed(2) + '%',
      newCategory
    )
    newEntries[index] = ne
    setEntries(newEntries)
  }

  const handleEnd = (id, newPE, newPP) => {
    const newEntries = [...entries]
    const index = entries.findIndex((entry) => entry.id === id)
    const name = entries[index].name
    const category = entries[index].category
    const ne = new Entry(
      id,
      name,
      newPE,
      newPP,
      (Math.round((newPE / newPP) * 100 * 100) / 100).toFixed(2) + '%',
      category
    )
    newEntries[index] = ne
    setEntries(newEntries)
  }

  const handleRevertInit = (e) => {
    setEntries(entriesInit)
  }

  const handleUpdateWeight = () => {
    let assignmentWeight
    let quizWeight
    let examWeight
    let projectWeight
    let participationWeight
    if (assignmentWeightRef.current.value !== 0) {
      assignmentWeight = parseInt(assignmentWeightRef.current.value) / 100
    }
    if (quizWeightRef.current.value !== 0) {
      quizWeight = parseInt(quizWeightRef.current.value) / 100
    }
    if (examWeightRef.current.value !== 0) {
      examWeight = parseInt(examWeightRef.current.value) / 100
    }
    if (projectWeightRef.current.value !== 0) {
      projectWeight = parseInt(projectWeightRef.current.value) / 100
    }
    if (participationWeightRef.current.value !== 0) {
      participationWeight = parseInt(participationWeightRef.current.value) / 100
    }
    setWeights([
      assignmentWeight,
      quizWeight,
      examWeight,
      projectWeight,
      participationWeight,
    ])
    assignmentWeightRef.current.value = 0
    quizWeightRef.current.value = 0
    examWeightRef.current.value = 0
    projectWeightRef.current.value = 0
    participationWeightRef.current.value = 0
  }

  return (
    <>
      <p className="font-mono">
        Overall Grade Percent:{' '}
        {(Math.round(gradePercent * 100 * 100) / 100).toFixed(2)}%
      </p>
      <p className="font-mono">Overall Grade Letter: {gradeLetter} </p>
      <br></br>

      <p className="font-mono">Please input category weight for the course:</p>
      <div>
        <table className="table-auto border-separate border-spacing-5 border">
          <thead classNName="text-center">
            <tr>
              <th className="table-header">Assignment</th>
              <th className="table-header">Quiz</th>
              <th className="table-header">Exam</th>
              <th className="table-header">Project</th>
              <th className="table-header">Participation</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td>
                <input ref={assignmentWeightRef} type="number" />
              </td>

              <td>
                <input ref={quizWeightRef} type="number" />
              </td>

              <td>
                <input ref={examWeightRef} type="number" />
              </td>

              <td>
                <input ref={projectWeightRef} type="number" />
              </td>

              <td>
                <input ref={participationWeightRef} type="number" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        onClick={handleUpdateWeight}
        className="bg-orange-300 hover:bg-orange-400 rounded-full"
      >
        Update
      </button>
      <WeightsNote />

      <div>
        <table className="table-auto border-separate border-spacing-5 border">
          <thead className="text-center">
            <tr>
              <th className="table-header">Name</th>
              <th className="table-header">Points Earned</th>
              <th className="table-header">Points Possible</th>
              <th className="table-header">Percent</th>
              <th className="table-header">Category</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {entries.map((entryObject) => (
              <EntryComponent
                entryProp={entryObject}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleEnd={handleEnd}
                key={entryObject.id}
                entriesProp={entries}
              />
            ))}
          </tbody>
        </table>
      </div>

      <br></br>

      <p className="font-mono">Name of added entry:</p>
      <input ref={entryNameRef} type="text" autoComplete="off" />
      <p className="font-mono">Points earned of entry:</p>
      <input ref={entryPERef} type="number" />
      <p className="font-mono">Points possible of entry:</p>
      <input ref={entryPPRef} type="number" />
      <p className="font-mono">Category of added entry::</p>
      <input ref={entryCategoryRef} type="text" autoComplete="off" />

      <br></br>
      <br></br>

      <button
        onClick={handleAddEntry}
        className="bg-orange-300 hover:bg-orange-400 rounded-full"
      >
        Add Assignment/Quiz/Exam{' '}
      </button>
      <br></br>
      <br></br>
      <button
        onClick={handleRevertInit}
        className="bg-orange-300 hover:bg-orange-400 rounded-full"
      >
        Revert to Initial Entries
      </button>
      <br></br>
      <br></br>
    </>
  )
}
