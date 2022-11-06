import { entries } from '../constants'
import { useState, useEffect, useRef } from 'react'

function Entry({ entryProp, handleDelete, handleEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const entryNameRef = useRef()
  const entryPERef = useRef()
  const entryPPRef = useRef()
  const handleOnClickX = () => {
    handleDelete(entryProp.id)
  }

  const handleOnClickEdit = () => {
    setIsEditing(true)
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

  const handleOnClickSave = () => {
    setIsEditing(false)
    handleEdit(
      entryProp.id,
      entryNameRef.current.value,
      parseInt(entryPERef.current.value),
      parseInt(entryPPRef.current.value)
    )
  }

  if (isEditing) {
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
        <td>
          <button onClick={handleOnClickX} class="bg-red-400 hover:bg-red-700">
            {' '}
            X{' '}
          </button>
        </td>
        <td>
          <button
            onClick={handleOnClickSave}
            class="bg-amber-400 hover:bg-amber-600"
          >
            {' '}
            Save{' '}
          </button>
        </td>
      </tr>
    )
  } else {
    return (
      <tr>
        <td>{entryProp.name}</td>
        <td>{entryProp.pointsEarned}</td>
        <td>{entryProp.pointsPossible}</td>
        <td>{entryProp.percent}</td>
        <td>
          <button onClick={handleOnClickX} class="bg-red-400 hover:bg-red-700">
            X
          </button>
        </td>
        <td>
          <button
            onClick={handleOnClickEdit}
            class="bg-amber-400 hover:bg-amber-600"
          >
            Edit
          </button>
        </td>
      </tr>
    )
  }
}

export default Entry
