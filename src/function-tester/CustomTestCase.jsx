import { Button, ButtonGroup, Td, Tr } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { MdDelete, MdEdit, MdPlayArrow } from 'react-icons/md';
import { TestStatusIndicator } from './TestStatusIndicator.jsx';

export function CustomTestCase({ testCase, status, onRun, index }) {
    return (
        <Tr>
            <Td>{testCase.name}</Td>
            <Td>
                <ButtonGroup>
                    <Button variant='ghost' style={{ fontSize: '2rem', color: 'green' }} onClick={() => onRun(index)}><MdPlayArrow/></Button>
                    <Button variant='ghost' style={{ fontSize: '2rem', color: 'goldenrod' }}><MdEdit/></Button>
                    <Button variant='ghost' style={{ fontSize: '2rem', color: 'red' }}><MdDelete/></Button>
                </ButtonGroup>
            </Td>
            <Td><TestStatusIndicator result={status}/></Td>
        </Tr>
    );
}

CustomTestCase.propTypes = {
    testCase: PropTypes.shape({
        name: PropTypes.string,
        testFn: PropTypes.func,
        points: PropTypes.number
    }),
    status: PropTypes.bool,
    onRun: PropTypes.func,
    index: PropTypes.number
};
