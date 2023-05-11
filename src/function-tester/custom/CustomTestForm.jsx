import { Button, FormLabel, Input } from '@chakra-ui/react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { CustomTestInputGroup } from './CustomTestInputGroup.jsx';
import { createDefaultObject } from '../utils/createDefaultObject';


export function CustomTestForm({ onSubmit, input, state }) {
    const [data, setData] = useState({ name: '', input: state ?? createDefaultObject(input) });

    const onInput = (event) => {
        const newData = { ...data };

        const qualifiedName = event.target.name;
        const fieldNames = qualifiedName.split('.');

        if (fieldNames.length === 1) {
            newData[event.target.name] = event.target.value;
        } else {
            const propertyToUpdate = fieldNames.pop();

            let propertyToChange;
            for (const fieldName of fieldNames) {
                propertyToChange = propertyToChange ? propertyToChange[fieldName] : newData[fieldName];
            }

            propertyToChange[propertyToUpdate] = event.target.value;
        }
        setData(newData);
    };

    const onAddToArray = (qualifiedArrayName) => {
        const newData = window.structuredClone(data);

        const fieldNames = qualifiedArrayName.split('.');

        let array;
        let arrayItemStructure;
        for (const fieldName of fieldNames) {
            array = array ? array[fieldName] : newData[fieldName];
            if (fieldName !== 'input') {
                arrayItemStructure = arrayItemStructure ? arrayItemStructure[fieldName] : input[fieldName];
            }
        }

        console.log(input);
        array.push(createDefaultObject(arrayItemStructure ? arrayItemStructure[0] : input[0]));
        setData(newData);
    };

    const onRemoveFromArray = (qualifiedArrayName, indexToRemove) => {
        const newData = { ...data };

        const fieldNames = qualifiedArrayName.split('.');
        const arrayName = fieldNames.pop();

        let arrayParent;
        for (const fieldName of fieldNames) {
            arrayParent = arrayParent ? arrayParent[fieldName] : newData[fieldName];
        }
        console.log(arrayParent[arrayName]);

        arrayParent[arrayName] = arrayParent[arrayName].filter((item, index) => index !==  Number.parseInt(indexToRemove, 10));

        setData(newData);
    };

    const submit = (event) => {
        event.preventDefault();
        onSubmit(data); //TODO validation
    };

    return (
        <form onSubmit={submit}>
            <FormLabel>Test case name</FormLabel>
            <Input variant="flushed" onInput={onInput} name="name" value={data['name']}></Input>
            <FormLabel>Input</FormLabel>
            <CustomTestInputGroup parentName="input"
                                  structureFragment={input}
                                  stateFragment={data['input']} onInput={onInput} onArrayAdd={onAddToArray}
                                  onArrayRemove={onRemoveFromArray}
            />
            <Button type="submit">Create new test case</Button>
        </form>
    );
}

CustomTestForm.propTypes = {
    onSubmit: PropTypes.func,
    input: PropTypes.object,
    state: PropTypes.object
};