import { Button, Checkbox, FormLabel, Input } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Fragment } from 'react';

function makeInput(structureFragment, stateFragment, field, value) {
    if (typeof value === 'object') {
        if (Array.isArray(value)) {
            const arrayInputs = [];
            for (const index in stateFragment[field]) {
                arrayInputs.push(
                    <li key={index}>
                        <CustomTestInputGroup key={index} structureFragment={structureFragment[field][index]}
                                              stateFragment={stateFragment[field][index]}
                        >

                        </CustomTestInputGroup>
                        <Button key={index + "a"}>delete</Button>
                    </li>
                );
            }
            return (
                <Fragment key={field}>
                    <ol>
                        {arrayInputs}
                    </ol>
                    <Button>Add</Button>
                </Fragment>);
        } else {
            return (
                <CustomTestInputGroup key={field} structureFragment={structureFragment[field]}
                                      stateFragment={stateFragment[field]}/>
            );
        }
    } else if (value === 'boolean') {
        return (
            <Checkbox key={field}>{field}</Checkbox>
        );
    } else if (value === 'number') {
        return (
            <FormLabel key={field}>{field}
                <Input variant='flushed'/>
            </FormLabel>
        );
    } else if (value === 'string') {
        return (
            <FormLabel key={field}>{field}
                <Input variant='flushed'/>
            </FormLabel>
        );
    } else {
        throw new Error('Invalid type in input structure.');
    }
}

export function CustomTestInputGroup({ structureFragment, stateFragment, onInput, parentName }) {
    // console.log(stateFragment);
    // console.log(structureFragment);

    const inputs = [];
    for (const [field, value] of Object.entries(structureFragment)) {
        inputs.push(makeInput(structureFragment, stateFragment, field, value));
    }
    return inputs;
}

CustomTestInputGroup.propTypes = {
    structureFragment: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    stateFragment: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onInput: PropTypes.func,
    parentName: PropTypes.string
};