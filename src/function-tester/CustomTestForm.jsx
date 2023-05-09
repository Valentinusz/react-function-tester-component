import { Box, Button, FormLabel, Input } from '@chakra-ui/react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { CustomTestInputGroup } from './CustomTestInputGroup.jsx';

function createDefaultInputState(obj) {
    const newObj = {};
    for (let key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            if (Array.isArray(obj[key])) {
                newObj[key] = [createDefaultInputState(obj[key][0])];
            } else {
                newObj[key] = createDefaultInputState(obj[key]);
            }
        } else {
            newObj[key] = '';
        }
    }
    return newObj;
}

export function CustomTestForm({ onSubmit, input, state }) {
    const [data, setData] = useState({ name: '', input: state ?? createDefaultInputState(input) });

    const onInput = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const updateInput = (newData) => {
        setData({ ...data, ...newData });
    };

    const submit = (event) => {
        event.preventDefault();
        //TODO validation
        onSubmit(data);
    };

    return (
        <Box>
            <form onSubmit={submit}>
                <FormLabel>Test case name</FormLabel>
                <Input variant='flushed' onInput={onInput} name='name' value={data['name']}></Input>
                <FormLabel>Input</FormLabel>
                <CustomTestInputGroup structureFragment={input} onInput={updateInput} parentName='input' stateFragment={data['input']}></CustomTestInputGroup>
                <Button type='submit'>Create new test case</Button>
            </form>
        </Box>
    );
}

CustomTestForm.propTypes = {
    onSubmit: PropTypes.func,
    input: PropTypes.object,
    state: PropTypes.object
};