import {
    Box, Checkbox, FormLabel, IconButton, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput,
    NumberInputField,
    NumberInputStepper
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { MdAddCircle, MdDelete } from 'react-icons/md';
import { createDefaultOutPutState } from '../utils/createDefaultInputState.js';

export function CustomTestField({ structureFragment, stateFragment, handleInput, name }) {
    if (typeof stateFragment === 'object') {
        if (Array.isArray(stateFragment)) {
            const arrayInputs = [];
            for (let index = 0; index < stateFragment.length; index++) {
                arrayInputs.push(<li key={index} style={{ marginLeft: '2rem' }}>
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <CustomTestField key={index} structureFragment={structureFragment[0]}
                                         stateFragment={stateFragment[index]}
                                         handleInput={(next) => {
                                             const newArray = [...stateFragment];
                                             newArray[index] = next;
                                             handleInput(newArray);
                                         }}
                                         name={index.toString()}
                        />
                        <IconButton icon={<MdDelete size="md" />}
                                    onClick={() => handleInput(stateFragment.filter((_, idx) => idx !== index))}
                                    aria-label="Delete array item"
                                    title="Delete array item"
                        />
                    </Box>
                </li>);
            }
            return (<Box>
                <Box>
                    {name}
                    <IconButton icon={<MdAddCircle size="md" />} variant="ghost"
                                onClick={() => handleInput([...stateFragment, createDefaultOutPutState(structureFragment[0])])}
                                aria-label="New Array item"
                    />
                </Box>

                <ol style={{ listStyle: 'none' }}>
                    {arrayInputs}
                </ol>

            </Box>);
        } else {
            const inputs = [];
            for (const field in stateFragment) {
                inputs.push(<CustomTestField key={field}
                                             structureFragment={structureFragment[field]}
                                             stateFragment={stateFragment[field]}
                                             handleInput={(next) => handleInput({ ...stateFragment, [field]: next })}
                                             name={field}
                />);
            }
            return (<FormLabel>{name}
                <Box style={{ marginLeft: '2rem' }}>{inputs}</Box>
            </FormLabel>);
        }
    } else if (typeof stateFragment === 'boolean') {
        return (
            <Checkbox name={name} checked={stateFragment}>{name}
                      onInput={event => handleInput(event.target.value)}
            </Checkbox>
        );
    } else if (structureFragment === 'string') {
        return (<FormLabel>
            {name} : {structureFragment}
            <Input name={name}
                   value={stateFragment} onInput={(event) => handleInput(event.target.value)}
            />
        </FormLabel>);
    } else if (structureFragment === 'number') {
        return (<FormLabel>
            {name} : {structureFragment}
            <NumberInput value={stateFragment} data-type="number" name={name}
                         onInput={(event) => {
                             const intValue = Number.parseInt(event.target.value);
                             handleInput(intValue ? intValue : 0);
                         }}>
                <NumberInputField/>
            </NumberInput>
        </FormLabel>);
    }
}

CustomTestField.propTypes = {
    structureFragment: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string, PropTypes.bool, PropTypes.number]),
    stateFragment: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string, PropTypes.bool, PropTypes.number]),
    handleInput: PropTypes.func,
    name: PropTypes.string
};