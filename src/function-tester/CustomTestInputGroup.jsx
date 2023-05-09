import { Box, Button, Checkbox, FormLabel, Input } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { MdAddCircle } from 'react-icons/all.js';

export function CustomTestInputGroup({ structureFragment, stateFragment, onInput, parentName }) {
    const handleInput = (event) => {
        console.log(parentName);
        onInput({ [parentName]: { ...stateFragment, [event.target.name]: event.target.value } });
    };

    const makeInput = (label) => {
        return (
            <>
                <FormLabel>{label}</FormLabel>
                <Input type='text' name={label} onInput={handleInput} value={stateFragment[label]}></Input>
            </>
        );
    };

    const makeCheckBox = (label) => {
        return (
            <>
                <Checkbox>{label}</Checkbox>
            </>
        );
    };

    function resolveInputType(key, value, structureFrag, stateFrag) {
        if (Array.isArray(value)) {
            const inputArray = [];
            for (const index in stateFrag[key]) {
                inputArray.push(resolveInputType(index, value[index], structureFrag[key], stateFrag[key]));
            }
            return (
                <Box>
                    {inputArray}
                    <Button><MdAddCircle></MdAddCircle></Button>
                </Box>

            );
        } else if (value === 'number' || !isNaN(value)) {
            return makeInput(key);
        } else if (value === 'boolean' || typeof value === 'boolean') {
            return makeCheckBox(key);
        } else if (value === 'string') {
            return makeInput(key);
        } else if (typeof value === 'object') {
            return (
                <Box>
                    <h1>{key}: Object</h1>
                    <CustomTestInputGroup structureFragment={value} onInput={handleInput} parentName={key}
                                           stateFragment={stateFrag[key]}/>
                </Box>
            );
        }
        return null;
    }

    function makeContent() {
        const content = [];

        for (const [key, value] of Object.entries(structureFragment)) {
            content.push(resolveInputType(key, value, structureFragment, stateFragment));
        }
        return content;
    }


    return (
        <Box>
            {makeContent()}
        </Box>
    );
}

CustomTestInputGroup.propTypes = {
    structureFragment: PropTypes.object,
    stateFragment: PropTypes.object,
    onInput: PropTypes.func,
    parentName: PropTypes.string
};