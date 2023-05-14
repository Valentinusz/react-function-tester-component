import { CancelOutlined, CheckCircleOutline, CircleOutlined } from '@mui/icons-material';

/**
 * Component indicating the result of a test.
 * @param result {boolean} result to indicate.
 * @return {JSX.Element}
 * @constructor
 */
export function TestStatusIndicator({ result }) {
    if (result === false) {
        return (
            <CancelOutlined color='warning' fontSize='large'/>
        );
    } else if (result === true) {
        return (
            <CheckCircleOutline color='success' fontSize='large'/>
        );
    }

    return (
        <CircleOutlined color='primary' fontSize='large'/>
    );
}
