import { Function } from './Function.jsx';
import PropTypes from 'prop-types';
import Tests from './Tests.jsx';
import { Box, Button, Heading } from '@chakra-ui/react';
import CustomTests from './custom/CustomTests.jsx';

export function FunctionTester({ fn, input, output, tests, onFinish }) {
    console.log(fn);
    console.log(input);
    console.log(output);
    console.log(tests);

    return (
        <Box>
            <Heading>FunctionTester</Heading>
            <Function fn={fn}></Function>
            <Heading>Predefined cases</Heading>
            <Tests tests={tests} fn={fn}></Tests>
            <CustomTests fn={fn} input={input} output={output}></CustomTests>
        </Box>
    );
}

FunctionTester.propTypes = {
    fn: PropTypes.func,
    input: PropTypes.object,
    output: PropTypes.any,
    tests: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        testFn: PropTypes.func,
        points: PropTypes.number
    })),
    onFinish: PropTypes.func
};
