import { View, Text,TouchableOpacity,Image,  } from 'react-native'
import React from 'react'
import {COLORS,FONTS,SIZES,icons} from "../constants"

const VerticalFoodCart = ({containerStyle,item,onPress }) => {
  return (
<TouchableOpacity style={{
    
    padding:SIZES.radius,
    borderRadius:SIZES.radius,
    alignItems:'center',
    width:200,  
    backgroundColor:COLORS.lightGray2,
    ...containerStyle
    }}
    
    onPress={()=>console.log('Hello')}
    > 
    <View style={{flexDirection:'row',flex:1}}>
        <Image source={icons.calories} style={{height:30,width:30}} />
        <Text style={{...FONTS.body5,color:COLORS.darkGray2}}>{item.calories}Calories</Text>
        <Image source={icons.love} style={{height:20,width:20,tintColor:item.isFavourite? COLORS.primary:COLORS.gray,justifyContent:'flex-end',marginLeft:20}} />
    </View>
    <View style={{height:150,width:150,alignItems:'center',justifyContent:'center'}}>
        <Image source={item.image} style={{height:"100%",width:"100%"}} />
    </View>
    <View style={{marginTop:-20,alignItems:'center'}}>
    <Text style={{...FONTS.h3,alignContent:'center',justifyContent:'center',alignItems:'center'}}>{item.name}</Text>
    <Text style={{...FONTS.body5,justifyContent:'center',color:COLORS.darkGray2,}}>{item.description}</Text>
    <Text style={{...FONTS.h2,justifyContent:'center'}}>${item.price}</Text>
    </View>

</TouchableOpacity>
  )
}

export default VerticalFoodCart