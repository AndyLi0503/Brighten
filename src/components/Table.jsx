import React from 'react'
import EntryComponent from '../components/Entry'
import './Table.css'
import { useEffect, useState, useRef } from 'react'
import { Entry } from '../constants/index'
import { v4 as uuidv4 } from 'uuid'

export default function Table({ tableProp }) {
  const [gradePercent, setGradePercent] = useState(0)
  const [entries, setEntries] = useState([])
  const [gradeLetter, setGradeLetter] = useState('F')
  const [entriesInit, setEntriesInit] = useState([])
  const entryNameRef = useRef()
  const entryPERef = useRef()
  const entryPPRef = useRef()
  useEffect(function () {
    calculationTotal()
    const e1 = new Entry(uuidv4(), 'Midterm 1', 76, 100, '76.00%')
    const e2 = new Entry(uuidv4(), 'Midterm 2', 94, 100, '94.00%')
    const e3 = new Entry(uuidv4(), 'Midterm 3', 80, 100, '80.00%')
    const e4 = new Entry(uuidv4(), 'Final', 190, 200, '95.00%')

    const arr = []
    arr.push(e1)
    arr.push(e2)
    arr.push(e3)
    arr.push(e4)
    setEntries(arr)
    setEntriesInit(arr)
  }, [])

  useEffect(() => {
    calculationTotal()
  }, [entries])

  function handleAddEntry(e) {
    const name = entryNameRef.current.value
    const pe = entryPERef.current.value
    const pp = entryPPRef.current.value
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
        },
      ]
    })

    entryNameRef.current.value = null
    entryPERef.current.value = null
    entryPPRef.current.value = null
  }

  function calculationTotal() {
    let totalEarned = 0
    let totalPossible = 0
    for (const entry of entries) {
      totalEarned += entry.pointsEarned
      totalPossible += entry.pointsPossible
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

  const handleEdit = (id, newName, newPE, newPP) => {
    const newEntries = [...entries]
    const index = entries.findIndex((entry) => entry.id === id)
    const ne = new Entry(
      id,
      newName,
      newPE,
      newPP,
      (Math.round((newPE / newPP) * 100 * 100) / 100).toFixed(2) + '%'
    )
    newEntries[index] = ne
    setEntries(newEntries)
  }

  const handlePredict = (id, newPE, newPP, target) => {
    const newEntries = [...entries]
    const index = entries.findIndex((entry) => entry.id === id)
    const name = entries[index].name
    const ne = new Entry(
      id,
      name,
      newPE,
      newPP,
      (Math.round((newPE / newPP) * 100 * 100) / 100).toFixed(2) + '%'
    )
    newEntries[index] = ne
    setEntries(newEntries)
  }

  const handleRevertInit = (e) => {
    setEntries(entriesInit)
  }

  return (
    <>
      <p className="font-mono">
        Overall Grade Percent:{' '}
        {(Math.round(gradePercent * 100 * 100) / 100).toFixed(2)}%
      </p>
      <p className="font-mono">Overall Grade Letter: {gradeLetter} </p>
      <br></br>

      <div>
        <table className="table-auto border-separate border-spacing-5 border border-slate-400">
          <thead className="text-center">
            <tr>
              <th className="table-header">Name</th>
              <th className="table-header">Points Earned</th>
              <th className="table-header">Points Possible</th>
              <th className="table-header">Percent</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {entries.map((entryObject) => (
              <EntryComponent
                entryProp={entryObject}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handlePredict={handlePredict}
                key={entryObject.id}
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
