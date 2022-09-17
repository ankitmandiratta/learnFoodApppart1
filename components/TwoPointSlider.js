import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { COLORS, FONTS, SIZES } from '../constants'


const TwoPointSlider = ({values,min,max,prefix,postfix,onValuesChange}) => {
  return (
<MultiSlider 

values={values}

sliderLength={SIZES.width-(SIZES.padding*2)-20}
min={min}
max={max}
enableLabel={true}
step={1}
markerOffsetY={20}
selectedStyle={{
backgroundColor:COLORS.primary,  //slide 
}}

trackStyle={{
  height:10,
  borderRadius:10,
  color:COLORS.lightGray2
}}
minMarkerOverlapDistance={50}
customMarker={(e)=>{
  return(
    <View style={{height:60,alignItems:'center',justifyContent:'center'}}>
<View style={{
  height:30,   //slider height and width
   width:30,
  borderRadius:15,  //slider radius
  borderWidth:1,
  borderColor:COLORS.white, //slider 
  backgroundColor:COLORS.red,  //slider
  ...styles.shadow
  
}}>

</View>
<Text style={{marginTop:10,color:COLORS.darkGray,...FONTS.body3}}>{e.currentValue}{postfix}</Text>
    </View>
  )
}}
/>

    )
}

const styles=StyleSheet.create({
  shadow:{
    shadowColor:'#000000',
    shadowOffset:{
      width:0,
      height:3
    },
    shadowRadius:1,
    shadowOpacity:0.1
  }
})

export default TwoPointSlider

