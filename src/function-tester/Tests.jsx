import PropTypes from 'prop-types';
import { Button, Table, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { TestCase } from './TestCase.jsx';
import { useState } from 'react';
import { MdPlayArrow } from 'react-icons/md';

export default function Tests({ tests, fn }) {
    const [status, setStatus] = useState(tests.map(({ name }) => ({ name, result: undefined })));

    const updateStatus = (testCaseIndex) => {
        const newStatus = [...status];
        newStatus[testCaseIndex]['result'] = tests[testCaseIndex].testFn(fn);
        setStatus(newStatus);
    };

    const runAll = () => {
        for (const index in tests) {
            updateStatus(index);
        }
    };

    const passed = tests.filter((test, index) => status[index]['result']);
    const points = passed.reduce((acc, curr) => acc + curr.points, 0);

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Name</Th>
                    <Th isNumeric>Points</Th>
                    <Th>Run</Th>
                    <Th>Result</Th>
                </Tr>
            </Thead>
            <Tbody>
                {tests.map((testCase, index) => (
                    <TestCase key={index} index={index} testCase={testCase} onRun={updateStatus}
                              status={status[index].result}></TestCase>
                ))}
            </Tbody>
            <Tfoot>
                <Tr>
                    <Td></Td>
                    <Td>{points}</Td>
                    <Td><Button variant='outline' onClick={runAll}>Run All<MdPlayArrow
                        style={{ color: 'green', fontSize: '2rem' }}/></Button></Td>
                    <Td>{passed.length} / {tests.length}</Td>
                </Tr>
            </Tfoot>
        </Table>
    );
}

Tests.propTypes = {
    tests: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        testFn: PropTypes.func,
        points: PropTypes.number
    })),
    fn: PropTypes.func
};