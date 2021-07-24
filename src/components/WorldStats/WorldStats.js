import React from 'react'

import './WorldStats.css'

const WorldStats = props => {

    return(
    <div className="worldStats-box">
        <h1 className="totalNumbers">{props.total}</h1>
        <props className="about">{props.about}</props>
    </div>

    )
    
}

export default WorldStats;