import React from 'react'
import { Image } from 'react-native'
var { Line, Svg, G, Circle } = require('react-native-svg');
import { pathPoint, pathPoints, mapsData } from './../maps'
import { connect } from 'react-redux'

const DrawLines = (props) => {
  if(props.pathOriginToDestinationCurrentMap){
    const keys: Array<string> = props.pathOriginToDestinationCurrentMap.keys;
    return(
        <G>
        {keys.map((key,index) =>{
                const originCordenates = props.getPointCordenates(key,props.pathPoints) 
                const destinationCordenates = props.getPointCordenates(keys[index+1],props.pathPoints) 
            if(index < keys.length -1){
                
                return(
                    <G key={index}>
                        <Circle
                        cx={originCordenates.x}
                        cy={originCordenates.y}
                        r="5"
                        fill="pink"/>
                        <Line
                            key={index}
                            x1={originCordenates.x}
                            y1={originCordenates.y}
                            x2={destinationCordenates.x}
                            y2={destinationCordenates.y}
                            stroke="red"
                            strokeWidth="2"/>
                    </G>
                )
            } else {
                return(
                    <G key={index} >
                        <Circle
                            cx={originCordenates.x}
                            cy={originCordenates.y}
                            r="5"
                            fill="pink"/>
                    </G>
                )
            }

        })}
        </G>
    )
  } else {
      return( <G></G>)
  }

}

interface Appprops {
    getPointCordenates: Function
    pathPoints: pathPoints,
    pathOriginToDestinationCurrentMap: Array<string>
    currentMapData: mapsData
}

class drawPath extends React.Component<Appprops,{}> {
    constructor(props, context) {
        super(props, context);
    }

    render(): JSX.Element {  
               return(      
            <Svg 
                height={this.props.currentMapData.width}
                width={this.props.currentMapData.width}>
                    <DrawLines
                        pathOriginToDestinationCurrentMap={this.props.pathOriginToDestinationCurrentMap}
                        pathPoints={this.props.pathPoints}
                        getPointCordenates={this.props.getPointCordenates} 
                    />
            </Svg>
        )
    }
}

export default drawPath
