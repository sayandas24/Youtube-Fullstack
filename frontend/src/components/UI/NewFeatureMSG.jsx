import React, { useContext, useState } from 'react'
import './NewFeatureMSG.css' // Import the CSS file for animation 
import { FeatureSoonContext } from '../../contexts/featureSoonContext/UseFeatureSoon';

function NewFeatureMSG() {
     const { featureSoonShow, featureMSG } = useContext(FeatureSoonContext) 
    return (
        <div>
        {featureSoonShow && <div className="new-feature-msg">{featureMSG}</div>}
    </div>
  )
}

export default NewFeatureMSG
