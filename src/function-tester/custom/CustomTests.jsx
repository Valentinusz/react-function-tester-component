import PropTypes from 'prop-types';
import {
    Box, Button, Heading, IconButton, Table, Tbody, Td, Tfoot, Th, Thead, Tr, useDisclosure
} from '@chakra-ui/react';

import { useState } from 'react';
import { MdAddCircle, MdPlayArrow } from 'react-icons/md';
import { CustomTestForm } from './CustomTestForm.jsx';
import { CustomTestCase } from './CustomTestCase.jsx';

export default function CustomTests({ fn, input, output, handleOK }) {
    const [tests, setTests] = useState([]); // list of tests displayed in the component
    const [selectedTest, setSelectedTest] = useState(null); // reference of the currently selected test
    const { isOpen, onOpen, onClose } = useDisclosure(); // status of the modal container of the form

    // create a new test or save changes made to an existing one
    const handleSave = (test) => {
        test.testFn = (fn) => JSON.stringify(fn(test.input)) === JSON.stringify(test.output);
        if (test.id) {
            setTests(tests.map(t => t.id === test.id ? test : t));
        } else {
            test.id = Math.random();
            console.log(test);
            setTests([...tests, test]);
        }
    };

    // handle edit button click
    const handleEdit = (test) => {
        setSelectedTest(test);
        console.log(selectedTest);
        onOpen();
    };

    // handle delete button click
    const handleDelete = (test) => {
        setTests((tests.filter(t => t.id !== test.id)));
    };

    const handleRun = (test) => {
        test.result = test.testFn(fn);
        setTests(tests.map(t => t.id === test.id ? test : t));
    };

    const handleRunAll = () => {
        setTests(tests.map(test => ({ ...test, result: test.testFn(fn) })));
    };

    return (
        <Box>
            <Heading>Custom cases
                <IconButton variant="ghost" icon={<MdAddCircle size="sm" />}
                            onClick={() => {
                                setSelectedTest(null);
                                onOpen();
                            }}
                            aria-label="New test case" title="New test case"
                />
            </Heading>
            <Table>
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Name</Th>
                        <Th>Actions</Th>
                        <Th>Result</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {tests.map((test, index) => (
                        <CustomTestCase key={index} testCase={test} status={test.result}
                                        onRun={handleRun} onEdit={handleEdit} onDelete={handleDelete}
                        />
                    ))}
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Td></Td>
                        <Td></Td>
                        <Td>
                            <Button variant="outline" onClick={() => handleRunAll()}>Run All<MdPlayArrow
                                style={{ color: 'green', fontSize: '2rem' }} /></Button>
                        </Td>
                        <Td></Td>
                    </Tr>
                </Tfoot>
            </Table>
            <CustomTestForm key={selectedTest?.id ? selectedTest.id : Math.random()}
                            input={input} output={output} testCase={selectedTest}
                            onSubmit={handleSave} isOpen={isOpen} onClose={onClose}
            />
        </Box>
    );
}

CustomTests.propTypes = {
    fn: PropTypes.func, tests: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string, testFn: PropTypes.func
    })), input: PropTypes.object, output: PropTypes.any
};