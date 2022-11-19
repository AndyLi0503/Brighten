import { useState, useEffect, useRef } from 'react'

function Entry({
  entryProp,
  handleDelete,
  handleEdit,
  handleEnd,
  entriesProp,
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [isPredicting, setIsPredicting] = useState(false)
  const [pointsEarnedState, setPEState] = useState()
  const [pointsPossibleState, setPPState] = useState()
  const entryNameRef = useRef()
  const entryPERef = useRef()
  const entryPPRef = useRef()
  const entryTargetRef = useRef()
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
      isEditing
    ) {
      entryNameRef.current.value = entryProp.name
      entryPERef.current.value = entryProp.pointsEarned
      entryPPRef.current.value = entryProp.pointsPossible
    }
  }, [entryNameRef, entryPERef, entryPPRef, entryProp, isEditing])

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
      parseInt(entryPPRef.current.value)
    )
  }

  const handleOnTargetChange = () => {
    let totalEarned = 0
    let totalPossible = 0
    for (const entry of entriesProp) {
      totalEarned += entry.pointsEarned
      totalPossible += entry.pointsPossible
    }

    if (entryTargetRef.current.value === '') return
    totalEarned -= parseInt(entryProp.pointsEarned)
    let totalNeeded =
      totalPossible * (parseInt(entryTargetRef.current.value) / 100)

    setPEState(totalNeeded - totalEarned)
  }

  const handleOnClickEnd = () => {
    setIsPredicting(false)
    handleEnd(
      entryProp.id,
      parseInt(pointsEarnedState),
      parseInt(pointsPossibleState)
    )
  }

  if (isEditing && !isPredicting) {
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
        <td className="font-mono">{pointsEarnedState}</td>
        <td className="font-mono">{pointsPossibleState}</td>
        <td className="font-mono">
          {(pointsEarnedState / pointsPossibleState) * 100}%
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
        <td>{entryProp.pointsEarned}</td>
        <td>{entryProp.pointsPossible}</td>
        <td>{entryProp.percent}</td>
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
