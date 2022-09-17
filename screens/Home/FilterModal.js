import { View, Text,Animated,Image,ScrollView,TouchableOpacity,Modal,TouchableWithoutFeedback } from 'react-native'
import React,{useState} from 'react'
import { COLORS,SIZES,icons,dummyData,FONTS, constants } from '../../constants'; 
import { TwoPointSlider,IconButton,TextButton } from '../../components';

const Section =({containerStyle,title,children})=>{
return(
    <View style={{marginTop:SIZES.padding,...containerStyle}}>
<Text style={{...FONTS.h3}}>{title}</Text>
{children}

    </View>
)

}

const FilterModal = ({isVisible,onClose}) =>{
  const [showFilterModal,setShowFilterModal] = useState(isVisible)
  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current 
  const [deliveryTime,setDeliveryTime]= useState("")
  const [tags,setTags] = useState("")  



  React.useEffect(()=>{
    if(showFilterModal){
       Animated.timing(modalAnimatedValue,{toValue:1,duration:500,useNativeDriver:false}).start()
    }

    else{
        Animated.timing(modalAnimatedValue,{toValue:0,duration:500,useNativeDriver:false}).start(()=>onClose())

    }
},[showFilterModal])

const modalY = modalAnimatedValue.interpolate({
    inputRange:[0,1],
    outputRange:[SIZES.height,SIZES.height-680]
})

 
const renderDistance=()=>{
    return(
        <Section
        title="Distance">
        <View style={{alignItems:'center'}}>
        <TwoPointSlider 
        values={[3,10]} 
        min={1} 
        max={20} 
        postfix='km' 
        onValueChange={(values)=>console.log(values)}/>
        
        </View>
        
        </Section>
    )}

const renderDeliveryTime=()=>{
    return (

        <Section title="DeliveryTime" 
        containerStyle={{
                marginTop:40,

        }}>
            <View style={{flexDirection:'row',flexWrap:'wrap',marginTop:SIZES.radius}}>
                {constants.delivery_time.map((item,index)=>{
                    return(
                        <TextButton 
                        key={`delivery_time-${index}`} 
                        label={item.label}
                        labelStyle={{
                            color:item.id==deliveryTime?COLORS.white:COLORS.gray,...FONTS.h3 
                        }}
                        buttonContainerStyle={{
                            width:"30%",
                            height:50,
                            margin:5,
                            alignItems:'center',
                            borderRadius:SIZES.base,
                            backgroundColor:item.id==deliveryTime?COLORS.primary:COLORS.lightGray2
                        }} 
                        onPress={()=>setDeliveryTime(item.id)}
                        />
                    )}
                )}
                

            </View>
            </Section>
    )
}

const renderPricingRange =()=>{
    return(
        <Section  title="Pricing Range">
<View style={{alignItems:'center'}}>

    <TwoPointSlider 
    values={[10,50]}
    min ={10}
    max={50}
    postfix={"$"}
    onValueChange={(values)=>console.log(values)} 
    />
</View>

        </Section>
    )
}

return (
<Modal animationType='fade' transparent={true} visible={isVisible}>

<View style={{flex:1,backgroundColor:COLORS.transparentBlack7 }}>
<TouchableWithoutFeedback onPress={()=>setShowFilterModal(!isVisible)}>
<View style={{position:'absolute',top:0,left:0,right:0,bottom:0}}>
<Animated.View 
style={{position:'absolute',
left:0,
width:"100%",
height:"100%",
padding:SIZES.padding,
borderTopRightRadius:SIZES.padding,
borderTopLeftRadius:SIZES.padding,
backgroundColor:COLORS.white,
top:modalY
}}>


{/* Header Section */}
<View style={{flexDirection:'row',alignItems:'center'}}> 
<Text style={{...FONTS.h2,flex:1}}> Filter Your Search</Text>
{/* <Image source ={icons.cross} style={{tintColor:COLORS.gray,height:30,width:30,alignItems:'flex-end'}}/> */}

<IconButton containerStyle={{borderWidth:2,borderRadius:10,borderColor:COLORS.gray2}}
icon={icons.cross}
iconStyle={{tintColor:COLORS.gray2}}
onPress={()=>setShowFilterModal(false)}
 />

</View>
<ScrollView showsVerticalScrollIndicator={false}
contentContainerStyle={{paddingBottom:250}}
>
    {/* Distance */}
    {renderDistance()}


{/* Delivery Time  */}

{renderDeliveryTime()}
{/* Pricing Range */}

{renderPricingRange()}


</ScrollView>

</Animated.View>

</View>

</TouchableWithoutFeedback>



</View>
</Modal>
  )
}

export default FilterModal