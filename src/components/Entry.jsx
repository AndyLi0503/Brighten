import { entries } from '../constants'
import { useState, useEffect, useRef } from 'react'

function Entry({ entryProp, handleDelete, handleEdit, handlePredict }) {
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
    if (
      entryNameRef.current !== undefined &&
      entryPERef.current !== undefined &&
      entryPPRef.current !== undefined &&
      isPredicting
    ) {
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

  const handleOnClickEnd = () => {
    setIsPredicting(false)
    handlePredict(
      entryProp.id,
      parseInt(entryPERef.current.value),
      parseInt(entryPPRef.current.value),
      parseInt(entryTargetRef.current.value)
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
            className="bg-amber-400 hover:bg-amber-600"
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
        <td>{entryProp.name}</td>
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
            className="bg-yellow-200 hover:bg-yellow-400"
          >
            {' '}
            End{' '}
          </button>
        </td>
        <td>Desired:</td>
        <td>
          <input ref={entryTargetRef} type="number" />
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
            className="bg-amber-400 hover:bg-amber-600"
          >
            Edit
          </button>
        </td>
        <td>
          <button
            onClick={handleOnClickPredict}
            className="bg-yellow-200 hover:bg-yellow-400"
          >
            Predict
          </button>
        </td>
      </tr>
    )
  }
}

export default Entry
