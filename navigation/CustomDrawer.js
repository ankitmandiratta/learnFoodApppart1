import React,{useState} from 'react'
import { Text,View,Image,TouchableOpacity } from 'react-native'
import {createDrawerNavigator,DrawerContentScrollView} from '@react-navigation/drawer'
import {MainLayout} from '../screens'
import {COLORS,FONTS,SIZES,constants,icons,dummyData} from "../constants"
import Animated from 'react-native-reanimated'
import {connect} from 'react-redux'
import {setSelectedTab} from  "../store/tab/tabActions"
const Drawer = createDrawerNavigator()

const CustomDrawerItem=({label,icon,onPress,isFocused})=>{
return(
    <TouchableOpacity style={{flexDirection:'row',height:40,marginBottom:SIZES.base,alignItems:'center',paddingLeft:SIZES.radius,borderRadius:SIZES.base,backgroundColor:isFocused?COLORS.blue:null}}
    onPress={onPress}
    >
        <Image source={icon} style={{width:20,height:20,tintColor:COLORS.white,marginRight:SIZES.body4}} /> 
        <Text style={{...FONTS.h3,color:COLORS.white,marginLeft:15}}> {label}</Text>

    </TouchableOpacity>
)}

const CustomDrawerContent =({navigation,selectedTab,setSelectedTab})=>{
return(
<DrawerContentScrollView scrollEnabled={true} contentContainerStyle={{flex:1}}>
    <View style={{flex:1,paddingHorizontal:SIZES.radius}}>

<View style={{alignItems:'flex-start',justifyContent:'center'}}>
<TouchableOpacity onPress={()=>navigation.closeDrawer()}>
        <Image source={icons.cross} style={{height:35,width:35,tintColor:COLORS.white}} />

</TouchableOpacity>
</View>
{/* Profile */}
<View style={{marginLeft:SIZES.radius}}>
    <Text style={{color:COLORS.white,...FONTS.h3}}>{dummyData.myProfile.name}</Text>
<Text style={{color:COLORS.white,...FONTS.body4}}>View your Profile</Text>
</View>
<View style={{flex:1,marginTop:SIZES.padding}}>
<CustomDrawerItem label={constants.screens.home} icon={icons.home} isFocused={selectedTab==constants.screens.home} onPress={()=>{navigation.navigate("MainLayout")}} />
<CustomDrawerItem label={constants.screens.my_wallet} icon={icons.wallet} />
<CustomDrawerItem label={constants.screens.notification} icon={icons.notification} />
<CustomDrawerItem label={constants.screens.favourite} icon={icons.favourite} />
<View style={{height:1,marginLeft:SIZES.radius,marginVertical:SIZES.radius,backgroundColor:COLORS.lightGray1}}></View>

<CustomDrawerItem label={"Track Your Order"} icon={icons.location} />
<CustomDrawerItem label="Coupons" icon={icons.coupon} />
<CustomDrawerItem label={"Setting"} icon={icons.setting} />
<CustomDrawerItem label={"Invite a Friend"} icon={icons.profile} />
<CustomDrawerItem label={"Help Center"} icon={icons.help} />
<View style={{marginBottom:SIZES.padding}}></View>
<CustomDrawerItem label={"Log Out"} icon={icons.logout} />
</View>
{/* DrawerItems */}
    </View>
</DrawerContentScrollView>
)}

const CustomDrawer = ({selectedTab,setSelectedTab}) => {
const [progress,setProgress] = useState(new Animated.Value(0))

const scale=Animated.interpolate(progress,{
    inputRange:[0,1],
    outputRange:[1,0.8]
})

const borderRadius= Animated.interpolate(progress,{
    inputRange:[0,1],
    outputRange:[0,26]
})

const animatedStyle ={borderRadius,transform:[{scale}]}
    return (
    <View style={{flex:1,backgroundColor:COLORS.primary}}>
<Drawer.Navigator drawerType="slide" overlayColor="transparent" drawerStyle={{flex:1,width:'65%',paddingRight:20,backgroundColor:'transparent'}}
sceneContainerStyle={{backgroundColor:"transparent"}}
initialRouteName="MainLayout"
drawerContent={props=>{
   setTimeout(()=>{
    setProgress(props.progress)
   },0)
    setProgress(props.progress)

    return (
        <CustomDrawerContent 
        navigation ={props.navigation}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}

        />
    )
}}
>

<Drawer.Screen name="MainLayout">
    {props=><MainLayout  {...props}  drawerAnimationStyle ={animatedStyle}/>}     
    </Drawer.Screen>
</Drawer.Navigator>

    </View>
  )
}



function mapStateToProps(state){
    return{
        selelectedTab :state.tabReducer.selelectedTab
    }
}


function mapDispatchToProps(dispatch){
    return{
        setSelectedTab:(selelectedTab)=>{
            return 
                dispatch(setSelectedTab(selelectedTab))
            }
        }
     }

export default connect(mapStateToProps,mapDispatchToProps)(CustomDrawer)