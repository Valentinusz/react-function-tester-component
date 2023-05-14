import { Typography } from '@mui/material';

/**
 * Component displaying a JS function.
 * @param fn {!Function} function to display.
 * @return {JSX.Element}
 * @constructor
 */
export function Function({ fn }) {
    return (
        <Typography>
            <code>
                {fn.toString()}
            </code>
        </Typography>

    );
}
