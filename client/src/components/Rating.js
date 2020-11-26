import React from 'react'
import PropTypes from 'prop-types'


const Rating = ({value,text}) => {
    return (
        <div className="rating">
            <span>
                <i className={value >= 1 ? "star fas fa-star" : value >= 0.5 ? "star fas fa-star-half-alt" : "far fa-star"}></i>
            </span>
            <span>
                <i className={value >= 2 ? "star fas fa-star" : value >= 1.5 ? "star fas fa-star-half-alt" : "far fa-star"}></i>
            </span>
            <span>
                <i className={value >= 3 ? "star fas fa-star" : value >= 2.5 ? "star fas fa-star-half-alt" : "far fa-star"}></i>
            </span>
            <span>
                <i className={value >= 4 ? "star fas fa-star" : value >= 3.5 ? "star fas fa-star-half-alt" : "far fa-star"}></i>
            </span>
            <span>
                <i className={value >= 5 ? "star fas fa-star" : value >= 4.5 ? "star fas fa-star-half-alt" : "far fa-star"}></i>
            </span>

            <span>{text && " "+text}</span>
        </div>
    )
}

Rating.defaultProps = {
    value: 5
}

Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
}



export default Rating
