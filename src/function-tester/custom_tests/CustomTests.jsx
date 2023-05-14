import { useState } from 'react';
import { CustomTestForm } from './CustomTestForm.jsx';
import { CustomTestCase } from './CustomTestCase.jsx';
import { Button, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, Typography } from '@mui/material';
import { Add, PlayArrow } from '@mui/icons-material';

/**
 * Component that displays a custom test case.
 * @param fn {!Function} function tested.
 * @param input {!Object} Input object.
 * @param output {!any} Output.
 * @return {JSX.Element}
 * @constructor
 */
export default function CustomTests({ fn, input, output }) {
    const [tests, setTests] = useState([]); // list of tests displayed in the component
    const [selectedTest, setSelectedTest] = useState(null); // reference of the currently selected test
    const [isOpen, setOpen] = useState(false); // status of the modal container of the form

    // create a new test or save changes made to an existing one
    const handleSave = (test) => {
        test.testFn = (fn) => JSON.stringify(fn(test.input)) === JSON.stringify(test.output);
        if (test.id) {
            setTests(tests.map(t => t.id === test.id ? test : t));
        } else {
            test.id = Math.random();
            setTests([...tests, test]);
        }
    };

    // handle edit button click
    const handleEdit = (test) => {
        setSelectedTest(test);
        setOpen(true);
    };

    const handleDelete = (test) => setTests((tests.filter(t => t.id !== test.id)));

    const handleRun = (test) => setTests(tests.map(t => t.id === test.id ? { ...test, result: test.testFn(fn) } : t));

    const handleRunAll = () => setTests(tests.map(test => ({ ...test, result: test.testFn(fn) })));

    return (
        <>
            <Typography variant='h2' mt={4}>
                <span style={{ marginRight: '1rem' }}>Custom cases</span>
                <Button startIcon={<Add fontSize='large'/>} variant='contained'
                        onClick={() => {
                            setSelectedTest(null);
                            setOpen(true);
                        }}
                >New test case</Button>
            </Typography>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Actions</TableCell>
                        <TableCell>Result</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tests.map((test, index) => (
                        <CustomTestCase key={index} testCase={test} status={test.result}
                                        onRun={handleRun} onEdit={handleEdit} onDelete={handleDelete}
                        />
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                            <Button variant='contained'
                                    onClick={() => handleRunAll()} startIcon={<PlayArrow fontSize='large'/>}
                            >Run All</Button>
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <CustomTestForm key={selectedTest?.id ? selectedTest.id : Math.random()}
                            input={input} output={output} testCase={selectedTest}
                            onSubmit={handleSave} isOpen={isOpen} onClose={() => setOpen(false)}
            />
        </>
    );
}
