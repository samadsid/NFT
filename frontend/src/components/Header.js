import React from 'react'

const Header = ({address}) => {
    return (
        <div>
            <p>Your Ethereum adddress is <b>{address}</b></p>
        </div>
    )
}

export default Header
