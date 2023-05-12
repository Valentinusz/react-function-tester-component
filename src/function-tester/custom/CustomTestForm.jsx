import {
    Button, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay
} from '@chakra-ui/react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { CustomTestField } from './CustomTestField.jsx';
import { createDefaultInputState, createDefaultOutPutState } from '../utils/createDefaultInputState';

export function CustomTestForm({ onSubmit, input, output, testCase, isOpen, onClose }) {
    const edit = testCase != null;

    const [formState, setFormState] = useState({
        name: edit ? testCase.name : '',
        input: edit ? testCase.input : createDefaultInputState(input),
        output: edit ? testCase.output : createDefaultOutPutState(output)
    });

    const submit = (event) => {
        event.preventDefault();
        onSubmit({ id: testCase?.id, name: formState.name, input: formState.input, output: formState.output });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size='4xl' closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{edit ? 'Edit test case' : 'New test case'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody as='form' onSubmit={submit}>
                    <FormLabel>Test case name</FormLabel>
                    <Input name='name' value={formState.name}
                           onInput={event => setFormState({ ...formState, name: event.target.value })} />
                    <FormLabel>
                        <Heading>Input</Heading>
                        <CustomTestField name='input' structureFragment={input} stateFragment={formState.input}
                                         handleInput={lowerData => setFormState({ ...formState, input: lowerData })}
                        />
                    </FormLabel>
                    <FormLabel>
                        <Heading>Output</Heading>
                        <CustomTestField name='output' structureFragment={output} stateFragment={formState.output}
                                         handleInput={lowerData => setFormState({ ...formState, output: lowerData })}
                        />
                    </FormLabel>
                    <Button type='submit'>{edit ? 'Save test case' : 'Create new test case'}</Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

CustomTestForm.propTypes = {
    onSubmit: PropTypes.func,
    input: PropTypes.object,
    output: PropTypes.any,
    testCase: PropTypes.object,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
};