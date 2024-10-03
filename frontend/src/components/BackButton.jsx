import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import PropTypes from 'prop-types';

const BackButton = ({ destination = '/'}) => {

    return ( 
        <div >
            <Link to={destination} className="icon icon__back">
                <BsArrowLeft />
            </Link>
        </div>
    );
}

BackButton.propTypes = {
    destination: PropTypes.string
}


export default BackButton;

