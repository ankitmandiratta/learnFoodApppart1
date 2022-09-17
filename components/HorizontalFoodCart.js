import { View, Text,TouchableOpacity,Image, Touchable } from 'react-native'
import React from 'react'
import {COLORS,FONTS,SIZES,icons} from "../constants"
const HorizontalFoodCart = ({containerStyle,imageStyle,item,onPress}) => {
  return (
    <View>
<TouchableOpacity style={{flexDirection:'row',borderRadius:SIZES.radius,backgroundColor:COLORS.lightGray2,...containerStyle}}

>
{/* Image */}
<Image source={item.image}  style={imageStyle}/>

{/* Info  */}
<View style={{flex:1}}>
    {/* Name,description ,Price */}
    <Text style={{...FONTS.h3,fontSize:17}}>{item.name}</Text>
    <Text style={{color:COLORS.darkGray2,...FONTS.body4}}>{item.description}</Text>
    <Text style={{...FONTS.h2,marginTop:SIZES.base}}>{item.price}</Text>
</View>

{/* Caleories */}
<View style={{flexDirection:'row',position:'absolute',top:5,right:SIZES.radius}}>

<Image  style={{width:30,height:30 }}/>
<Text style={{color:COLORS.darkGray2,...FONTS.body5}}>{item.calories} Calories</Text>

</View>

</TouchableOpacity>
    </View>
  )}

export default HorizontalFoodCart