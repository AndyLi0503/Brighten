import { entries } from './Table'
import { useState, useEffect, useRef } from 'react'

function Entry({
  entryProp,
  handleDelete,
  handleEdit,
  // handlePredict,
  handleEnd,
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [isPredicting, setIsPredicting] = useState(false)
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
    if (isPredicting) {
      entryPERef.current.value = entryProp.pointsEarned
      entryPPRef.current.value = entryProp.pointsPossible
    }
  }, [entryNameRef, entryPERef, entryPPRef, entryProp, isPredicting])

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
    for (const entry of entries) {
      totalEarned += entry.pointsEarned
      totalPossible += entry.pointsPossible
      console.log(entry.pointsEarned)
    }

    totalEarned -= entryPERef.current.value
    let totalNeeded =
      totalPossible * (parseInt(entryTargetRef.current.value) / 100)
    entryPERef.current.value = totalNeeded

    // handlePredict(
    //   entryProp.id,
    //   parseInt(entryPERef.current.value),
    //   parseInt(entryPPRef.current.value),
    //   parseInt(entryTargetRef.current.value)
    // )
  }

  const handleOnClickEnd = () => {
    setIsPredicting(false)
    handleEnd(
      entryProp.id,
      parseInt(entryPERef.current.value),
      parseInt(entryPPRef.current.value)
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
        <td>Desired:</td>
        <td>
          <input
            onChange={handleOnTargetChange}
            ref={entryTargetRef}
            type="number"
          />
        </td>
        <td>%</td>
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
