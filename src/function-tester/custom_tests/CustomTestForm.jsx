import { useState } from 'react';
import { CustomTestField } from './CustomTestField.jsx';
import { createDefaultInputState, createDefaultOutputState } from './createDefaultInputState.js';
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';

/**
 * Form for creating a custom test case.
 * @param onSubmit {!Function}
 * @param input {!Object}
 * @param output {!any}
 * @param testCase {Object} testCase to edit.
 * @param isOpen {!boolean} is the form dialog open.
 * @param onClose {!Function} function to run upon closing the dialog.
 * @return {JSX.Element}
 * @constructor
 */
export function CustomTestForm({ onSubmit, input, output, testCase, isOpen, onClose }) {
    const edit = testCase != null;

    const [formState, setFormState] = useState({
        name: edit ? testCase.name : '',
        input: edit ? testCase.input : createDefaultInputState(input),
        output: edit ? testCase.output : createDefaultOutputState(output)
    });

    const submit = (event) => {
        event.preventDefault();
        onSubmit({ id: testCase?.id, name: formState.name, input: formState.input, output: formState.output });
        onClose();
    };

    return (
        <Dialog onClose={onClose} open={isOpen} fullWidth={true} maxWidth='lg'>
            <DialogTitle>{edit ? 'Edit test case' : 'New test case'}</DialogTitle>
            <DialogContent>
                <form onSubmit={submit}>
                    <Box sx={{ p: 2 }}>
                        <TextField name='name' value={formState.name} label='Name'
                                   onInput={event => setFormState({ ...formState, name: event.target.value })}/>
                    </Box>

                    <Box sx={{ p: 2 }}>
                        <Typography variant='h5'>Input</Typography>
                        <CustomTestField name='input' structureFragment={input} stateFragment={formState.input}
                                         handleInput={lowerData => setFormState({ ...formState, input: lowerData })}
                        />
                    </Box>

                    <Box sx={{ p: 2 }}>
                        <Typography variant='h5'>Output</Typography>
                        <CustomTestField name='output' structureFragment={output} stateFragment={formState.output}
                                         handleInput={lowerData => setFormState({ ...formState, output: lowerData })}
                        />
                    </Box>


                    <Button type='submit'
                            variant='contained'>{edit ? 'Save test case' : 'Create new test case'}</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
