import { useState, useEffect, useRef } from 'react'
import { Select, SelectItem } from '@nextui-org/react'

function Entry({
  entryProp,
  handleDelete,
  handleEdit,
  handleEnd,
  entriesProp,
  weightsProp,
  weightsContainProp,
  assignmentWeightProp,
  quizWeightProp,
  examWeightProp,
  projectWeightProp,
  participationWeightProp,
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [isPredicting, setIsPredicting] = useState(false)
  const [pointsEarnedState, setPEState] = useState()
  const [pointsPossibleState, setPPState] = useState()
  const [actualPE, setActualPE] = useState()
  const entryNameRef = useRef()
  const entryPERef = useRef()
  const entryPPRef = useRef()
  const entryTargetRef = useRef()
  const entryCategoryRef = useRef()
  const handleOnClickX = () => {
    handleDelete(entryProp.id)
  }

  const handleOnClickEdit = () => {
    setIsEditing(true)
  }

  const handleOnClickPredict = () => {
    setIsPredicting(true)
  }

  useEffect(() => {
    if (
      entryNameRef.current !== undefined &&
      entryPERef.current !== undefined &&
      entryPPRef.current !== undefined &&
      entryCategoryRef.current !== undefined &&
      isEditing
    ) {
      entryNameRef.current.value = entryProp.name
      entryPERef.current.value = entryProp.pointsEarned
      entryPPRef.current.value = entryProp.pointsPossible
      entryCategoryRef.current.value = entryProp.category
    }
  }, [
    entryNameRef,
    entryPERef,
    entryPPRef,
    entryCategoryRef,
    entryProp,
    isEditing,
  ])

  useEffect(() => {
    if (isPredicting && entryTargetRef.current) {
      setPEState(entryProp.pointsEarned)
      setPPState(entryProp.pointsPossible)
    }
  }, [entryProp, entryTargetRef, isPredicting])

  const handleOnClickSave = () => {
    setIsEditing(false)
    handleEdit(
      entryProp.id,
      entryNameRef.current.value,
      parseInt(entryPERef.current.value),
      parseInt(entryPPRef.current.value),
      entryCategoryRef.current.value
    )
  }

  const handleOnTargetChange = () => {
    if (entryTargetRef.current.value === '') return

    let totalEarned = 0
    let totalPossible = 0

    const thisCategory = entryProp.category

    let assignmentPP = 0
    let quizPP = 0
    let examPP = 0
    let projectPP = 0
    let participationPP = 0

    let _gradePercent = 0
    if (weightsContainProp[0]) {
      for (const entry of entriesProp) {
        if (entry.category === 'Assignment') {
          totalEarned += entry.pointsEarned
          totalPossible += entry.pointsPossible
        }
      }

      assignmentPP = totalPossible
      if (thisCategory === 'Assignment') {
        totalEarned -= entryProp.pointsEarned
      }
      let categoryPercent = totalEarned / totalPossible

      if (weightsProp[0] === 0) {
        _gradePercent += categoryPercent * assignmentWeightProp
      } else {
        _gradePercent += categoryPercent * weightsProp[0]
      }
      totalEarned = 0
      totalPossible = 0
    }

    if (weightsContainProp[1]) {
      for (const entry of entriesProp) {
        if (entry.category === 'Quiz') {
          totalEarned += entry.pointsEarned
          totalPossible += entry.pointsPossible
        }
      }

      quizPP = totalPossible

      if (thisCategory === 'Quiz') {
        totalEarned -= entryProp.pointsEarned
      }
      let categoryPercent = totalEarned / totalPossible

      if (weightsProp[1] === 0) {
        _gradePercent += categoryPercent * quizWeightProp
      } else {
        _gradePercent += categoryPercent * weightsProp[1]
      }
      totalEarned = 0
      totalPossible = 0
    }
    if (weightsContainProp[2]) {
      for (const entry of entriesProp) {
        if (entry.category === 'Exam') {
          totalEarned += entry.pointsEarned
          totalPossible += entry.pointsPossible
        }
      }

      examPP = totalPossible

      if (thisCategory === 'Exam') {
        totalEarned -= entryProp.pointsEarned
      }
      let categoryPercent = totalEarned / totalPossible

      if (weightsProp[2] === 0) {
        _gradePercent += categoryPercent * examWeightProp
      } else {
        _gradePercent += categoryPercent * weightsProp[2]
      }
      totalEarned = 0
      totalPossible = 0
    }
    if (weightsContainProp[3]) {
      for (const entry of entriesProp) {
        if (entry.category === 'Project') {
          totalEarned += entry.pointsEarned
          totalPossible += entry.pointsPossible
        }
      }

      projectPP = totalPossible
      if (thisCategory === 'Project') {
        totalEarned -= entryProp.pointsEarned
      }
      let categoryPercent = totalEarned / totalPossible

      if (weightsProp[3] === 0) {
        _gradePercent += categoryPercent * projectWeightProp
      } else {
        _gradePercent += categoryPercent * weightsProp[3]
      }

      totalEarned = 0
      totalPossible = 0
    }
    if (weightsContainProp[4]) {
      for (const entry of entriesProp) {
        if (entry.category === 'Participation') {
          totalEarned += entry.pointsEarned
          totalPossible += entry.pointsPossible
        }
      }

      participationPP = totalPossible
      if (thisCategory === 'Participation') {
        totalEarned -= entryProp.pointsEarned
      }
      let categoryPercent = totalEarned / totalPossible

      if (weightsProp[4] === 0) {
        _gradePercent += categoryPercent * participationWeightProp
      } else {
        _gradePercent += categoryPercent * weightsProp[4]
      }
      totalEarned = 0
      totalPossible = 0
    }

    let percentNeeded =
      Number(entryTargetRef.current.value) / 100 - _gradePercent

    // let actualPE
    if (thisCategory === 'Assignment') {
      if (weightsProp[0] === 0) {
        setActualPE((percentNeeded / assignmentWeightProp) * assignmentPP)
        setPEState(
          (
            Math.round(
              (percentNeeded / assignmentWeightProp) * assignmentPP * 100
            ) / 100
          ).toFixed(2)
        )
      } else {
        setActualPE((percentNeeded / weightsProp[0]) * assignmentPP)
        setPEState(
          (
            Math.round((percentNeeded / weightsProp[0]) * examPP * 100) / 100
          ).toFixed(2)
        )
      }
    }
    if (thisCategory === 'Quiz') {
      if (weightsProp[1] === 0) {
        setActualPE((percentNeeded / quizWeightProp) * quizPP)
        setPEState(
          (
            Math.round((percentNeeded / quizWeightProp) * quizPP * 100) / 100
          ).toFixed(2)
        )
      } else {
        setActualPE((percentNeeded / weightsProp[1]) * quizPP)
        setPEState(
          (
            Math.round((percentNeeded / weightsProp[1]) * quizPP * 100) / 100
          ).toFixed(2)
        )
      }
    }
    if (thisCategory === 'Exam') {
      if (weightsProp[2] === 0) {
        setActualPE((percentNeeded / examWeightProp) * examPP)
        setPEState(
          (
            Math.round((percentNeeded / examWeightProp) * examPP * 100) / 100
          ).toFixed(2)
        )
      } else {
        setActualPE((percentNeeded / weightsProp[2]) * examPP)
        setPEState(
          (
            Math.round((percentNeeded / weightsProp[2]) * examPP * 100) / 100
          ).toFixed(2)
        )
      }
    }
    if (thisCategory === 'Project') {
      if (weightsProp[3] === 0) {
        setActualPE((percentNeeded / projectWeightProp) * projectPP)
        setPEState(
          (
            Math.round((percentNeeded / projectWeightProp) * projectPP * 100) /
            100
          ).toFixed(2)
        )
      } else {
        setActualPE((percentNeeded / weightsProp[3]) * projectPP)
        setPEState(
          (
            Math.round((percentNeeded / weightsProp[3]) * projectPP * 100) / 100
          ).toFixed(2)
        )
      }
    }
    if (thisCategory === 'Participation') {
      if (weightsProp[4] === 0) {
        setActualPE((percentNeeded / examWeightProp) * participationPP)
        setPEState(
          (
            Math.round(
              (percentNeeded / examWeightProp) * participationPP * 100
            ) / 100
          ).toFixed(2)
        )
      } else {
        setActualPE((percentNeeded / weightsProp[4]) * participationPP)
        setPEState(
          (
            Math.round(
              (percentNeeded / weightsProp[4]) * participationPP * 100
            ) / 100
          ).toFixed(2)
        )
      }
    }
  }

  const handleOnClickEnd = () => {
    handleEnd(entryProp.id, Number(actualPE), parseInt(pointsPossibleState))
    setIsPredicting(false)
  }

  if (isEditing && !isPredicting) {
    const categories = [
      'Assignment',
      'Quiz',
      'Exam',
      'Project',
      'Participation',
    ]
    return (
      <tr>
        <td>
          <input ref={entryNameRef} type="text" />
        </td>
        <td>
          <input ref={entryPERef} type="number" />
        </td>
        <td>
          <input ref={entryPPRef} type="number" />
        </td>
        <td></td>
        <td>
          <input ref={entryCategoryRef} type="text" />
          {/* <Select
            label="Category"
            // value={selectedCategory}
            // onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </Select> */}
        </td>
        <td>
          <button
            onClick={handleOnClickX}
            className="bg-red-400 hover:bg-red-700"
          >
            {' '}
            X{' '}
          </button>
        </td>
        <td>
          <button
            onClick={handleOnClickSave}
            className="bg-amber-400 hover:bg-amber-600 rounded-full"
          >
            {' '}
            Save{' '}
          </button>
        </td>
      </tr>
    )
  } else if (isPredicting && !isEditing) {
    return (
      <tr>
        <td className="font-mono">{entryProp.name}</td>
        <td className="font-mono">
          {(Math.round(pointsEarnedState * 100) / 100).toFixed(2)}
        </td>
        <td className="font-mono">{pointsPossibleState}</td>
        <td className="font-mono">
          {(
            Math.round((pointsEarnedState / pointsPossibleState) * 100 * 100) /
            100
          ).toFixed(2)}
          %
        </td>
        <td className="font-mono">{entryProp.category}</td>
        <td>
          <button
            onClick={handleOnClickX}
            className="bg-red-400 hover:bg-red-700"
          >
            {' '}
            X{' '}
          </button>
        </td>
        <td></td>
        <td>
          <button
            onClick={handleOnClickEnd}
            className="bg-yellow-200 hover:bg-yellow-400 rounded-full"
          >
            {' '}
            End{' '}
          </button>
        </td>
        <td className="font-mono">Target Total Percentage:</td>
        <td>
          <input
            onChange={handleOnTargetChange}
            ref={entryTargetRef}
            type="number"
          />
        </td>
        <td className="font-mono">%</td>
      </tr>
    )
  } else {
    return (
      <tr className="font-mono">
        <td>{entryProp.name}</td>
        <td>{(Math.round(entryProp.pointsEarned * 100) / 100).toFixed(2)}</td>
        <td>{entryProp.pointsPossible}</td>
        <td>{entryProp.percent}</td>
        <td>{entryProp.category}</td>
        <td>
          <button
            onClick={handleOnClickX}
            className="bg-red-400 hover:bg-red-700"
          >
            X
          </button>
        </td>
        <td>
          <button
            onClick={handleOnClickEdit}
            className="bg-amber-400 hover:bg-amber-600 rounded-full"
          >
            Edit
          </button>
        </td>
        <td>
          <button
            onClick={handleOnClickPredict}
            className="bg-yellow-200 hover:bg-yellow-400 rounded-full"
          >
            Predict
          </button>
        </td>
      </tr>
    )
  }
}

export default Entry
