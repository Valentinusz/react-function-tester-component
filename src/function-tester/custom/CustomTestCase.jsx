import { ButtonGroup, IconButton, Td, Tr } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { MdDelete, MdEdit, MdPlayArrow } from 'react-icons/md';
import { TestStatusIndicator } from '../TestStatusIndicator.jsx';

export function CustomTestCase({ testCase, status, onRun, onEdit, onDelete }) {
    return (
        <Tr>
            <Td>{testCase.id}</Td>
            <Td>{testCase.name}</Td>
            <Td>
                <ButtonGroup>
                    <IconButton icon={<MdPlayArrow />} variant="outline" style={{ fontSize: '2rem', color: 'green' }}
                                onClick={() => onRun(testCase)} aria-label="Run test case" title="Run test case"
                    />
                    <IconButton icon={<MdEdit />} variant="outline" style={{ fontSize: '2rem', color: 'goldenrod' }}
                                onClick={() => onEdit(testCase)} aria-label="Edit test case" title="Edit test case"
                    />
                    <IconButton icon={<MdDelete />} variant="outline" style={{ fontSize: '2rem', color: 'red' }}
                                onClick={() => onDelete(testCase)} aria-label="Delete test case" title="Delete test case"
                    />
                </ButtonGroup>
            </Td>
            <Td><TestStatusIndicator result={status} /></Td>
        </Tr>
    );
}

CustomTestCase.propTypes = {
    testCase: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        testFn: PropTypes.func
    }),
    status: PropTypes.bool,
    onRun: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func
};
