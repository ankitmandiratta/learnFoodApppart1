import { View, Text,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'
const IconButton = ({conatinerStyle,icon,iconStyle,onPress}) => {
  return ( 
    <TouchableOpacity style={{...conatinerStyle}}
    onPress={onPress}
    >
        <Image source={icon} style={{width:30,height:30,tintColor:COLORS.white,...iconStyle}}>

        </Image>

    </TouchableOpacity>
  )
}

export default IconButton