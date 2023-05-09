import { MdOutlineCancel, MdOutlineCheckCircleOutline, MdOutlineCircle } from 'react-icons/md';
import PropTypes from 'prop-types';

export function TestStatusIndicator({ result }) {
    const style = { fontSize: '2rem', color: 'gray' };

    if (result === false) {
        style.color = 'red';
        return (
            <MdOutlineCancel style={style}/>
        );
    } else if (result === true) {
        style.color = 'green';
        return (
            <MdOutlineCheckCircleOutline style={style}/>
        );
    }

    return (
        <MdOutlineCircle style={style}/>
    );
}

TestStatusIndicator.propTypes = {
    result: PropTypes.bool
};