import React,{useState,useEffect,useRef} from 'react';
import {View,Text,Image,FlatList,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import Animated,{useAnimatedStyle,useSharedValue,withTiming} from 'react-native-reanimated';
import {connect} from 'react-redux'
import {setSelectedTab} from '../store/tab/tabActions'
import {Home,CartTab,Notification,Favourite,Search} from '../screens'
import{COLORS,FONTS,SIZES,icons,constants,dummyData} from '../constants'
import Header from '../components/Header'; 
import LinearGradient from "react-native-linear-gradient"
import { SearchBar } from 'react-native-screens';



const TabButton =({label,icon,isFocused,onPress})=>{
return(
<TouchableWithoutFeedback onPress={onPress}>
<Animated.View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
    <Animated.View style={{flexDirection:'row',width:'80%',height:50,alignItems:'center',justifyContent:'center',borderRadius:25}}>
<Image source={icon} style={{width:20,height:20,tintColor:COLORS.gray }}/>
{  isFocused && 
<Text numberOfLines={1} style={{marginLeft:SIZES.base,color:COLORS.gray,...FONTS.h3}}>{label}</Text>
}

    </Animated.View>
</Animated.View>
</TouchableWithoutFeedback>
)}
const MainLayout = ({drawerAnimationStyle,navigation ,selectedTab,setSelectedTab}) => {
    useEffect (()=>{
    setSelectedTab(constants.screens.home)
    console.log( "Home "+ selectedTab + "selected Tab")
},[])

const FlatListRef = useRef()

//Re anomate shared Value

const homeTabFlex= useSharedValue(1)
const homeTabColor= useSharedValue(COLORS.white)

const searchTabFlex= useSharedValue(1)
const searchTabColor= useSharedValue(COLORS.white)

const cartTabFlex= useSharedValue(1)
const cartTabColor= useSharedValue(COLORS.white)

const favoriteTabFlex= useSharedValue(1)
const favoriteTabColor= useSharedValue(COLORS.white)

const notificationTabFlex= useSharedValue(1)
const notificationTabColor= useSharedValue(COLORS.white)


const homeFlexStyle = useAnimatedStyle(()=>{
    return{
        flex:homeTabFlex.value
}
})


const homeColorStyle = useAnimatedStyle(()=>{
    return{
        backgroundColor:homeTabColor.value
}
})



return (
        <Animated.View style={{flex:1,backgroundColor:COLORS.white,...drawerAnimationStyle}}>

{/* Header   */}
<Header style={{height:50,paddingHorizontal:SIZES.padding,marginTop:40,alignItems:'center'}} 
title={"Home"}
leftComponent={
    <TouchableOpacity style={{width:40,height:40,alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:COLORS.gray2,borderRadius:SIZES.radius}} onPress={()=>navigation.openDrawer() }>
        <Image source={icons.menu}  />

    </TouchableOpacity>
}

rightComponent={
    <TouchableOpacity style={{alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:COLORS.gray2}} onPress={()=>navigation.openDrawer() }>
        <Image source={dummyData?.myProfile?.profile_image}  style={{width:40,height:40,borderRadius:SIZES.radius}} />
    </TouchableOpacity>
}
/>

{/* Content */}
        <View style={{flex:1}}>

            <FlatList 
            ref={FlatListRef}
            horizontal
            scrollEnabled={false}
            pagingEnabled
            snapToAlignment='center'
            snapToInterval={SIZES.width}
            showsHorizontalScrollIndicator={false}
            data={constants.bottom_tabs}
            keyExtractor={item=>`${item.id}`}
            renderItem={({item,index})=>{
                return(
                    <View style={{height:SIZES.height,width:SIZES.width}}>
                        {item.label==constants.screens.home && <Home />}
                        {item.label==constants.screens.search && <Search />}
                        {item.label==constants.screens.cart && <CartTab />}
                        {item.label==constants.screens.favourite && <Favourite />}
                        {item.label==constants.screens.notification && <Notification />}

                        

                        </View>
                )
            }}
            />

            </View>

{/* Footer */}


<View style={{height:100,justifyContent:'flex-end'}}>
{/* Shadow */}

<LinearGradient start={{x:0,y:0}} end={{ x:0,y:4}} colors={[COLORS.transparent,COLORS.lightGray1]} 
style={{position:'absolute',top:-20,left:0,right:0,height:100,borderTopLeftRadius:15,borderTopRightRadius:15}}
/>
<View style={{flex:1,flexDirection:'row',paddingHorizontal:SIZES.radius,paddingBottom:10,borderTopLeftRadius:20,borderTopRightRadius:20,backgroundColor:COLORS.white}}>

<TabButton label={constants.screens.home} icon={icons.home} isFocused={selectedTab==constants.screens.home} onPress={()=>{setSelectedTab(constants.screens.home)}} />
<TabButton label={constants.screens.search} icon={icons.search} isFocused={selectedTab==constants.screens.search} onPress={()=>{setSelectedTab(constants.screens.search)}} />
<TabButton label={constants.screens.cart} icon={icons.cart} isFocused={selectedTab==constants.screens.cart} onPress={()=>{setSelectedTab(constants.screens.cart)}} />
<TabButton label={constants.screens.favourite} icon={icons.favourite} isFocused={selectedTab==constants.screens.favourite} onPress={()=>{setSelectedTab(constants.screens.favourite)}} />
<TabButton label={constants.screens.notification} icon={icons.notification} isFocused={selectedTab==constants.screens.notification} onPress={()=>{setSelectedTab(constants.screens.notification)}} />
</View>
</View>

        </Animated.View>
    )}

function mapStateToProps(state){
    return{
        selectedTab :state.tabReducer.selectedTab
    }
}
function mapDispatchToProps(dispatch){
       return{
        setSelectedTab:(selectedTab)=>{return dispatch(setSelectedTab(selectedTab))    }
        }
     }

export default connect(mapStateToProps,mapDispatchToProps)(MainLayout)