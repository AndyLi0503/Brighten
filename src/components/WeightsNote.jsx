import React from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react'

function WeightsNote() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <div>
      <Button onPress={onOpen} className="max-w-fit">
        Open Modal
      </Button>
      <Modal isOpen={isOpen} placement="top" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Tips
              </ModalHeader>
              <ModalBody>
                <p className="font-mono">
                  1. No category weight is considered by default
                </p>
                <p className="font-mono">
                  2. Put in 0 if not considered in grading
                </p>
                <p className="font-mono">
                  3. Don't include percentage sign inside input box
                </p>
                <p className="font-mono">
                  (Example: put in "25" if a category is considered 25% of total
                  grade)
                </p>
                <p className="font-mono">
                  4. You shouldn't add an entry with an undefined category
                  weight
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  OK
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <br></br>
    </div>
  )
}

export default WeightsNote
