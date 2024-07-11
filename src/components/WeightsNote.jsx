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
      <Button onPress={onOpen} color="primary" variant="ghost">
        Usage
      </Button>
      <Modal isOpen={isOpen} placement="top" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Tips
              </ModalHeader>
              <ModalBody>
                <p>
                  1. No category weight is considered by default
                </p>
                <p>
                  2. Put in 0 if not considered in grading
                </p>
                <p>
                  3. Don't include percentage sign inside input box
                </p>
                <p>
                  (Example: put in "25" if a category is considered 25% of total
                  grade)
                </p>
                <p>
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
