import React from 'react'
import EntryComponent from '../components/Entry'
import './Table.css'
import { useEffect, useState, useRef } from 'react'
import { Entry } from '../constants/index'
import { v4 as uuidv4 } from 'uuid'
import WeightsNote from '../components/WeightsNote'
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react'

export default function Table({ tableProp }) {
  const [gradePercent, setGradePercent] = useState(0)
  const [entries, setEntries] = useState([])
  const [gradeLetter, setGradeLetter] = useState('F')
  const [entriesInit, setEntriesInit] = useState([])
  const [weights, setWeights] = useState([0, 0, 0, 0, 0])
  const [weightsContain, setWeightsContain] = useState([
    false,
    false,
    false,
    false,
    false,
  ])
  const [assignmentWeight, setAsssignmentWeight] = useState()
  const [quizWeight, setQuizWeight] = useState()
  const [examWeight, setExamWeight] = useState()
  const [projectWeight, setProjectWeight] = useState()
  const [participationWeight, setParticipationWeight] = useState()
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
    const e1 = new Entry(
      uuidv4(),
      'Assignment 1',
      85,
      100,
      '85.00%',
      'Assignment'
    )
    const e2 = new Entry(uuidv4(), 'Quiz 1', 8, 10, '80.00%', 'Quiz')
    const e3 = new Entry(
      uuidv4(),
      'Assignment 2',
      90,
      100,
      '90.00%',
      'Assignment'
    )
    const e4 = new Entry(uuidv4(), 'Quiz 2', 10, 10, '100.00%', 'Quiz')
    const e5 = new Entry(uuidv4(), 'Project 1', 85, 100, '85.00%', 'Project')
    const e6 = new Entry(uuidv4(), 'Midterm', 55, 100, '55.00%', 'Exam')
    const e7 = new Entry(uuidv4(), 'Project 2', 190, 200, '95.00%', 'Project')
    const e8 = new Entry(uuidv4(), 'Final', 285, 300, '95.00%', 'Exam')

    const arr = []
    arr.push(e1)
    arr.push(e2)
    arr.push(e3)
    arr.push(e4)
    arr.push(e5)
    arr.push(e6)
    arr.push(e7)
    arr.push(e8)
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

    let isCategoryWeightDefined = false
    if (category === 'Assignment' && weights[0] !== undefined) {
      isCategoryWeightDefined = true
    }
    if (category === 'Quiz' && weights[1] !== undefined) {
      isCategoryWeightDefined = true
    }
    if (category === 'Exam' && weights[2] !== undefined) {
      isCategoryWeightDefined = true
    }
    if (category === 'Project' && weights[3] !== undefined) {
      isCategoryWeightDefined = true
    }
    if (category === 'Participation' && weights[4] !== undefined) {
      isCategoryWeightDefined = true
    }

    if (name === '' || pe === '' || pp === '' || !isCategoryWeightDefined)
      return
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
    let _gradePercent = 0

    let assignmentContain = false
    let quizContain = false
    let examContain = false
    let projectContain = false
    let participationContain = false
    for (const entry of entries) {
      if (entry.category === 'Assignment') {
        assignmentContain = true
      } else if (entry.category === 'Quiz') {
        quizContain = true
      } else if (entry.category === 'Exam') {
        examContain = true
      } else if (entry.category === 'Project') {
        projectContain = true
      } else if (entry.category === 'Participation') {
        participationContain = true
      }
    }

    setWeightsContain([
      assignmentContain,
      quizContain,
      examContain,
      projectContain,
      participationContain,
    ])

    const assignmentZero = parseInt(assignmentWeightRef.current.value) === 0
    const quizZero = parseInt(quizWeightRef.current.value) === 0
    const examZero = parseInt(examWeightRef.current.value) === 0
    const projectZero = parseInt(projectWeightRef.current.value) === 0
    const participationZero =
      parseInt(participationWeightRef.current.value) === 0

    let assignmentWeight = 0
    let quizWeight = 0
    let examWeight = 0
    let projectWeight = 0
    let participationWeight = 0
    if (
      assignmentZero &&
      quizZero &&
      examZero &&
      projectZero &&
      participationZero
    ) {
      let count = 0

      if (assignmentContain) {
        count += 1
      }
      if (quizContain) {
        count += 1
      }
      if (examContain) {
        count += 1
      }
      if (projectContain) {
        count += 1
      }
      if (participationContain) {
        count += 1
      }

      if (assignmentContain) {
        assignmentWeight = 1 / count
        setAsssignmentWeight(assignmentWeight)
      }
      if (quizContain) {
        quizWeight = 1 / count
        setQuizWeight(quizWeight)
      }
      if (examContain) {
        examWeight = 1 / count
        setExamWeight(examWeight)
      }
      if (projectContain) {
        projectWeight = 1 / count
        setProjectWeight(projectWeight)
      }
      if (participationContain) {
        participationWeight = 1 / count
        setParticipationWeight(participationWeight)
      }
    }

    if (assignmentContain) {
      for (const entry of entries) {
        if (entry.category === 'Assignment') {
          totalEarned += entry.pointsEarned
          totalPossible += entry.pointsPossible
        }
      }
      const categoryPercent = totalEarned / totalPossible

      if (weights[0] === 0) {
        _gradePercent += categoryPercent * assignmentWeight
      } else {
        _gradePercent += categoryPercent * weights[0]
      }
      totalEarned = 0
      totalPossible = 0
    }

    if (quizContain) {
      for (const entry of entries) {
        if (entry.category === 'Quiz') {
          totalEarned += entry.pointsEarned
          totalPossible += entry.pointsPossible
        }
      }
      const categoryPercent = totalEarned / totalPossible
      if (weights[1] === 0) {
        _gradePercent += categoryPercent * quizWeight
      } else {
        _gradePercent += categoryPercent * weights[1]
      }
      totalEarned = 0
      totalPossible = 0
    }

    if (examContain) {
      for (const entry of entries) {
        if (entry.category === 'Exam') {
          totalEarned += entry.pointsEarned
          totalPossible += entry.pointsPossible
        }
      }
      const categoryPercent = totalEarned / totalPossible
      if (weights[2] === 0) {
        _gradePercent += categoryPercent * examWeight
      } else {
        _gradePercent += categoryPercent * weights[2]
      }

      totalEarned = 0
      totalPossible = 0
    }

    if (projectContain) {
      for (const entry of entries) {
        if (entry.category === 'Project') {
          totalEarned += entry.pointsEarned
          totalPossible += entry.pointsPossible
        }
      }
      const categoryPercent = totalEarned / totalPossible
      if (weights[3] === 0) {
        _gradePercent += categoryPercent * projectWeight
      } else {
        _gradePercent += categoryPercent * weights[3]
      }

      totalEarned = 0
      totalPossible = 0
    }
    if (participationContain) {
      for (const entry of entries) {
        if (entry.category === 'Participation') {
          totalEarned += entry.pointsEarned
          totalPossible += entry.pointsPossible
        }
      }
      const categoryPercent = totalEarned / totalPossible
      if (weights[4] === 0) {
        _gradePercent += categoryPercent * participationWeight
      } else {
        _gradePercent += categoryPercent * weights[4]
      }
      totalEarned = 0
      totalPossible = 0
    }

    // console.log(_gradePercent)
    setGradePercent(_gradePercent)

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
  }

  const handleDelete = (id) => {
    const matched = entries.filter((entry) => entry.id !== id)
    setEntries(matched)
  }

  const handleEdit = (id, newName, newPE, newPP, newCategory) => {
    if (newName === '' || newPE === '' || newPP === '') return
    if (
      newCategory !== 'Assignment' &&
      newCategory !== 'Quiz' &&
      newCategory !== 'Exam' &&
      newCategory !== 'Project' &&
      newCategory !== 'Participation'
    )
      return
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

    const isAssignmentZero = parseInt(assignmentWeightRef.current.value) === 0
    const isQuizZero = parseInt(quizWeightRef.current.value) === 0
    const isExamZero = parseInt(examWeightRef.current.value) === 0
    const isProjectZero = parseInt(projectWeightRef.current.value) === 0
    const isParticipationZero =
      parseInt(participationWeightRef.current.value) === 0
    const total =
      parseInt(assignmentWeightRef.current.value) +
      parseInt(quizWeightRef.current.value) +
      parseInt(examWeightRef.current.value) +
      parseInt(projectWeightRef.current.value) +
      parseInt(participationWeightRef.current.value)

    if (!isAssignmentZero) {
      assignmentWeight = parseInt(assignmentWeightRef.current.value) / 100
    }
    if (!isQuizZero) {
      quizWeight = parseInt(quizWeightRef.current.value) / 100
    }
    if (!isExamZero) {
      examWeight = parseInt(examWeightRef.current.value) / 100
    }
    if (!isProjectZero) {
      projectWeight = parseInt(projectWeightRef.current.value) / 100
    }
    if (!isParticipationZero) {
      participationWeight = parseInt(participationWeightRef.current.value) / 100
    }

    if (
      !isAssignmentZero ||
      !isQuizZero ||
      !isExamZero ||
      !isProjectZero ||
      !isParticipationZero
    ) {
      setWeights([
        assignmentWeight,
        quizWeight,
        examWeight,
        projectWeight,
        participationWeight,
      ])
    }
  }
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

  const handleUpdateAndClose = () => {
    handleUpdateWeight()
    onClose()
  }

  return (
    <>
      <p className="font-mono">
        Overall Grade Percent:{' '}
        {(Math.round(gradePercent * 100 * 100) / 100).toFixed(2)}%
      </p>
      <p className="font-mono">Overall Grade Letter: {gradeLetter} </p>
      <br></br>

      <p className="font-mono">Input category weight for the course:</p>
      <div>
        <table className="table-auto border-separate border-spacing-5 border">
          <thead className="text-center">
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
      {/* <Button
        onClick={handleUpdateWeight}
        className="bg-orange-300 hover:bg-orange-400 rounded-full"
      >
        Update
      </Button> */}

      <Button onPress={onOpen} className="max-w-fit">
        Input Weights
      </Button>
      <Modal isOpen={isOpen} placement="top" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Input Weights
              </ModalHeader>
              <ModalBody>
                <div>
                  <table className="table-auto border-separate border-spacing-5 border">
                    <thead className="text-center">
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
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>Cancel</Button>
                <Button
                  onClick={handleUpdateAndClose}
                  color="primary"
                >
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
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
                weightsProp={weights}
                weightsContainProp={weightsContain}
                assignmentWeightProp={assignmentWeight}
                quizWeightProp={quizWeight}
                examWeightProp={examWeight}
                projectWeightProp={projectWeight}
                participationWeightProp={participationWeight}
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
      <p className="font-mono">Category of added entry:</p>
      <input ref={entryCategoryRef} type="text" autoComplete="off" />

      <br></br>
      <br></br>

      <button
        onClick={handleAddEntry}
        className="bg-orange-300 hover:bg-orange-400 rounded-full"
      >
        Add Entry
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
