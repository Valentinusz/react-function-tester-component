import { PredefinedTestCase } from './PredefinedTestCase.jsx';
import { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, Typography } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';

/**
 * Table component displaying data about predefined test cases.
 * @param tests {[{name: string, testFn: Function, points: number}]} tests displayed by the component.
 * @param fn {!Function} function being tested.
 * @return {JSX.Element}
 * @constructor
 */
export default function PredefinedTests({ tests, fn }) {
    const [status, setStatus] = useState(tests.map(({ name }) => ({ name, result: undefined })));

    const updateStatus = (testCaseIndex) => {
        const newStatus = [...status];
        newStatus[testCaseIndex].result = tests[testCaseIndex].testFn(fn);
        setStatus(newStatus);
    };

    const handleRunAll = () => {
        for (const index in tests) {
            updateStatus(index);
        }
    };

    const passed = tests.filter((test, index) => status[index].result);

    /** @type {number} */
    const points = passed.reduce((acc, curr) => acc + curr.points, 0);

    return (
        <>
            <Typography variant='h2' mt={4}>Predefined cases</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell isNumeric>Points</TableCell>
                        <TableCell>Run</TableCell>
                        <TableCell>Result</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tests.map((testCase, index) => (
                        <PredefinedTestCase key={index} index={index} testCase={testCase} onRun={updateStatus}
                                            status={status[index].result}></PredefinedTestCase>))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>{points}</TableCell>
                        <TableCell>
                            <Button variant='contained'
                                    onClick={handleRunAll} startIcon={<PlayArrow fontSize='large'/>}
                            >Run All</Button>
                        </TableCell>
                        <TableCell>{passed.length} / {tests.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </>
    );
}
