import { Button, Td, Tr } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { MdPlayArrow } from 'react-icons/md';
import { TestStatusIndicator } from './TestStatusIndicator.jsx';

export function TestCase({ testCase, status, onRun, index }) {
    return (
        <Tr>
            <Td>{testCase.name}</Td>
            <Td>{testCase.points}</Td>
            <Td>
                <Button variant='ghost' style={{ fontSize: '2rem', color: 'green' }}
                    onClick={() => onRun(index)}
                ><MdPlayArrow/></Button></Td>
            <Td><TestStatusIndicator result={status}/></Td>
        </Tr>
    );
}

TestCase.propTypes = {
    testCase: PropTypes.shape({
        name: PropTypes.string,
        testFn: PropTypes.func,
        points: PropTypes.number
    }),
    status: PropTypes.bool,
    onRun: PropTypes.func,
    index: PropTypes.number
};
