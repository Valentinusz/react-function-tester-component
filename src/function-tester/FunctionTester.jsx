import { Function } from './Function.jsx';
import PredefinedTests from './predefined_tests/PredefinedTests.jsx';
import CustomTests from './custom_tests/CustomTests.jsx';
import { Container, Typography } from '@mui/material';

/**
 * Component for testing the result of JS functions.
 * @param fn {!Function} function to test.
 * @param input {!Object} object representing the parameter list of the function.
 * @param output {any} output of the function.
 * @param tests {[{name: string, testFn: Function, points: number}]} array containing the predefined_tests test cases.
 * @param onFinish {!Function} function to run on pressing the "OK" button.
 * @return {JSX.Element}
 * @constructor
 */
export function FunctionTester({ fn, input, output, tests, onFinish }) {
    console.log(fn);
    console.log(input);
    console.log(output);
    console.log(tests);

    return (
        <Container>
            <Typography variant="h1" mb={4}>FunctionTester</Typography>
            <Function fn={fn}></Function>
            <PredefinedTests tests={tests} fn={fn}></PredefinedTests>
            <CustomTests fn={fn} input={input} output={output}></CustomTests>
        </Container>
    );
}

