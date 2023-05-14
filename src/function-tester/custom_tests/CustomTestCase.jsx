import { TestStatusIndicator } from '../common/TestStatusIndicator.jsx';
import { Button, ButtonGroup, TableCell, TableRow } from '@mui/material';
import { Delete, Edit, PlayArrow } from '@mui/icons-material';

/**
 * Component displaying a custom test case.
 * @param testCase {{id: number, name: string, testFn: Function}}
 * @param status {boolean}
 * @param onRun {!Function}
 * @param onEdit {!Function}
 * @param onDelete {!Function}
 * @return {JSX.Element}
 * @constructor
 */
export function CustomTestCase({ testCase, status, onRun, onEdit, onDelete }) {
    return (
        <TableRow>
            <TableCell>{testCase.id}</TableCell>
            <TableCell>{testCase.name}</TableCell>
            <TableCell>
                <ButtonGroup>
                    <Button startIcon={<PlayArrow/>} onClick={() => onRun(testCase)}>Run</Button>
                    <Button startIcon={<Edit/>} onClick={() => onEdit(testCase)}>EDIT</Button>
                    <Button startIcon={<Delete/>} onClick={() => onDelete(testCase)}>DELETE</Button>
                </ButtonGroup>
            </TableCell>
            <TableCell><TestStatusIndicator result={status}/></TableCell>
        </TableRow>
    );
}
