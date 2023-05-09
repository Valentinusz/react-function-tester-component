import PropTypes from 'prop-types';
import { Code } from '@chakra-ui/react';

export function Function({ fn }) {
    return (
        <Code>
            {fn.toString()}
        </Code>
    );
}

Function.propTypes = {
    fn: PropTypes.func
};