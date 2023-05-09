import PropTypes from 'prop-types';
import { Box, Button, Table, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { useState } from 'react';
import { MdPlayArrow } from 'react-icons/md';
import { CustomTestForm } from './CustomTestForm';

export default function CustomTests({ fn, input }) {
    const [tests, setTests] = useState([]);

    const addTestCase = (data) => {
        console.log(data);
    };

    return (
        <Box>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Actions</Th>
                        <Th>Result</Th>
                    </Tr>
                </Thead>
                <Tbody>
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Td></Td>
                        <Td><Button variant='outline'>Run All<MdPlayArrow
                            style={{ color: 'green', fontSize: '2rem' }}/></Button></Td>
                        <Td></Td>
                    </Tr>
                </Tfoot>
            </Table>
            <CustomTestForm input={input} onSubmit={addTestCase}/>
        </Box>

    );
}

CustomTests.propTypes = {
    tests: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        testFn: PropTypes.func,
        points: PropTypes.number
    })),
    fn: PropTypes.func,
    input: PropTypes.object
};