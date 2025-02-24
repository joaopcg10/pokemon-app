import PropTypes from "prop-types";
import { FaArrowLeft } from "react-icons/fa";

/**
 * BackButton Component
 * 
 * A button that triggers a navigation action when clicked.
 * Typically used to return to the previous page.
 * 
 * @param {Function} onClick - Function to be executed when the button is clicked.
 */
const BackButton = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="fixed top-6 left-6 text-white px-4 py-2"
      >
        <FaArrowLeft size={20} />
      </button>    
    );
};

BackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default BackButton;