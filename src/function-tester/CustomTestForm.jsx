import { Button, FormLabel, Input } from '@chakra-ui/react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { CustomTestInputGroup } from './CustomTestInputGroup.jsx';

/**
 * Creates a default object with empty content based on the input parameters structure.
 * @param inputStructure structure of the form to be created.
 * @return {{}}
 */
function createDefaultInputState(inputStructure) {
    const newObj = {};
    for (let field in inputStructure) {
        if (typeof inputStructure[field] === 'object') {
            // field is array or object
            if (Array.isArray(inputStructure[field])) {
                // the first element in the input structure contains the type of elements the array should have
                newObj[field] = [createDefaultInputState(inputStructure[field][0])];
            } else {
                newObj[field] = createDefaultInputState(inputStructure[field]);
            }
        } else {
            //field is primitive
            newObj[field] = '';
        }
    }
    return newObj;
}

/**
 * Resolves a property of the input object.
 * @param qualifiedName qualified name of the input field to resolve the property from.
 */
function resolveProperty(qualifiedName) {

}

/**
 * Component
 *
 * @param onSubmit
 * @param input
 * @param state
 * @return {JSX.Element}
 * @constructor
 */
export function CustomTestForm({ onSubmit, input, state }) {
    const [data, setData] = useState({ name: '', input: state ?? createDefaultInputState(input) });
    console.log(data);

    const onInput = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const submit = (event) => {
        event.preventDefault();
        onSubmit(data); //TODO validation
    };

    return (
        <form onSubmit={submit}>
            <FormLabel>Test case name</FormLabel>
            <Input variant='flushed' onInput={onInput} name='name' value={data['name']}></Input>
            <FormLabel>Input</FormLabel>
            <CustomTestInputGroup structureFragment={input} parentName='input' stateFragment={data['input']}></CustomTestInputGroup>
            <Button type='submit'>Create new test case</Button>
        </form>
    );
}

CustomTestForm.propTypes = {
    onSubmit: PropTypes.func,
    input: PropTypes.object,
    state: PropTypes.object
};