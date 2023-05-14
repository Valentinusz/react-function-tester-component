import { TestStatusIndicator } from '../common/TestStatusIndicator.jsx';
import { Button, TableCell, TableRow } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';

/**
 * Component that displays a predefined_tests component.
 * @param testCase {{name: string, testFn: Function, points: number}} testCase to display.
 * @param status {boolean} status of the testCase.
 * @param onRun {Function} function to call when the run button is clicked.
 * @param index {number}
 * @return {JSX.Element}
 * @constructor
 */
export function PredefinedTestCase({ testCase, status, onRun, index }) {
    return (
        <TableRow>
            <TableCell>{testCase.name}</TableCell>
            <TableCell>{testCase.points}</TableCell>
            <TableCell>
                <Button variant='outlined' startIcon={<PlayArrow/>} onClick={() => onRun(index)}>RUN</Button>
            </TableCell>
            <TableCell><TestStatusIndicator result={status}/></TableCell>
        </TableRow>
    );
}
