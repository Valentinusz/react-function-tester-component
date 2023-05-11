import { Box, Button, Checkbox, FormLabel, Input } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { MdDelete } from 'react-icons/md';

function makeInput(structureFragment, stateFragment, onInput, field, value, parentName, onArrayAdd, onArrayRemove) {
    const inputName = parentName + '.' + field;
    if (typeof value === 'object') {
        if (Array.isArray(value)) {
            const arrayInputs = [];
            for (const index in stateFragment[field]) {
                arrayInputs.push(
                    <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                        <CustomTestInputGroup key={index}
                                              structureFragment={structureFragment[field][0]}
                                              stateFragment={stateFragment[field][index]} onInput={onInput}
                                              parentName={inputName + '.' + index}
                                              onArrayAdd={onArrayAdd}
                                              onArrayRemove={onArrayRemove}
                        />
                        <Button style={{ backgroundColor: 'darkred' }}
                                onClick={() => onArrayRemove(parentName + '.' + field, index)}><MdDelete /></Button>
                    </li>
                );
            }
            return (
                <Fragment key={field}>
                    <ol style={{ listStyle: 'none' }}>
                        {arrayInputs}
                    </ol>
                    <Button onClick={() => onArrayAdd(parentName + '.' + field)}>Add</Button>
                </Fragment>);
        } else {
            return (
                <CustomTestInputGroup key={field}
                                      structureFragment={structureFragment[field]}
                                      stateFragment={stateFragment[field]} onInput={onInput} parentName={inputName}
                                      onArrayAdd={onArrayAdd}
                                      onArrayRemove={onArrayRemove}
                />
            );
        }
    } else if (typeof value === 'boolean') {
        return (
            <Checkbox key={field} name={inputName} onInput={onInput} checked={stateFragment[field]}>{field}</Checkbox>
        );
    } else if (structureFragment[field] === 'number' || structureFragment[field] === 'string') {
        return (
            <FormLabel key={field}>{field}: {structureFragment[field]}
                <Input variant="flushed" name={inputName} onInput={onInput} value={stateFragment[field]} />
            </FormLabel>
        );
    }
}

export function CustomTestInputGroup({
                                         structureFragment,
                                         stateFragment,
                                         onInput,
                                         parentName,
                                         onArrayAdd,
                                         onArrayRemove
                                     }) {
    const inputs = [];

    for (const [field, value] of Object.entries(stateFragment)) {
        inputs.push(makeInput(structureFragment, stateFragment, onInput, field, value, parentName, onArrayAdd, onArrayRemove));
    }
    return <Box style={{ marginLeft: '1rem' }}>{inputs}</Box>;
}

CustomTestInputGroup.propTypes = {
    structureFragment: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    stateFragment: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onInput: PropTypes.func,
    parentName: PropTypes.string,
    onArrayAdd: PropTypes.func,
    onArrayRemove: PropTypes.func
};