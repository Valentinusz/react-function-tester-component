import { createDefaultOutputState } from './createDefaultInputState.js';
import { Box, Button, Checkbox, Container, TextField, Typography } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

/**
 * From component.
 *
 * @param structureFragment {any}
 * @param stateFragment {any}
 * @param handleInput {Function}
 * @param name {string}
 * @return {JSX.Element}
 * @constructor
 */
export function CustomTestField({ structureFragment, stateFragment, handleInput, name }) {
    if (typeof stateFragment === 'object') {
        if (Array.isArray(stateFragment)) {
            const arrayInputs = [];
            for (let index = 0; index < stateFragment.length; index++) {
                arrayInputs.push(
                    <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                        <CustomTestField key={index} name={index.toString()}
                                         structureFragment={structureFragment[0]} stateFragment={stateFragment[index]}
                                         handleInput={(next) => {
                                             const newArray = [...stateFragment];
                                             newArray[index] = next;
                                             handleInput(newArray);
                                         }}
                        />
                        <Button startIcon={<Delete/>}
                                color='warning'
                                onClick={() => handleInput(stateFragment.filter((_, idx) => idx !== index))}
                                aria-label='Delete array item'
                                title='Delete array item'
                        >Delete</Button>
                    </li>
                );
            }
            return (
                <Container sx={{ p: 2 }}>
                    <Typography variant='h6'>
                        <span style={{ marginRight: '0.5rem' }}>{name}</span>
                        <Button startIcon={<Add/>}
                                onClick={() => handleInput([...stateFragment, createDefaultOutputState(structureFragment[0])])}
                                aria-label='New Array item'
                                variant='contained'
                        >New array item</Button>
                    </Typography>

                    <ol style={{ listStyle: 'none' }}>
                        {arrayInputs}
                    </ol>

                </Container>);
        } else {
            const inputs = [];
            for (const field in stateFragment) {
                inputs.push(
                    <CustomTestField key={field} name={field}
                                     structureFragment={structureFragment[field]} stateFragment={stateFragment[field]}
                                     handleInput={(next) => handleInput({ ...stateFragment, [field]: next })}
                    />
                );
            }
            return (
                <>
                    <Typography variant='h6'>{name}</Typography>
                    <Box sx={{ p: 1 }}>
                        {inputs}
                    </Box>
                </>
            );
        }
    } else if (typeof stateFragment === 'boolean') {
        return (
            <Checkbox name={name} checked={stateFragment}>{name}
                onInput={event => handleInput(event.target.value)}
            </Checkbox>
        );
    } else if (structureFragment === 'string') {
        return (
            <TextField name={name} label={name + ': ' + structureFragment}
                       value={stateFragment} onInput={(event) => handleInput(event.target.value)}
            />
        );
    } else if (structureFragment === 'number') {
        return (
            <TextField type='number' label={name + ': ' + structureFragment} value={stateFragment} data-type='number'
                       name={name}
                       onInput={(event) => {
                           const intValue = Number.parseInt(event.target.value);
                           handleInput(intValue ? intValue : 0);
                       }}>
            </TextField>
        );
    }
}
