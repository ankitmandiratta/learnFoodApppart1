import React,{useState} from 'react';
import { useEffect } from 'react';
import {View,Text,TouchableOpacity,Image,TextInput,FlatList} from 'react-native';
import { COLORS,SIZES,icons,dummyData,FONTS } from '../../constants'; 
import { HorizontalFoodCart,VerticalFoodCart } from '../../components';
import FilterModal from './FilterModal';

const Section =({title,onPress,children})=>{
return (
    <View>
        {/* Header */}
<View style={{flexDirection:'row',marginHorizontal:SIZES.padding,marginTop:30,marginBottom:20}}>
<Text style={{flex:1,...FONTS.h3}}>{title}</Text>

<TouchableOpacity onPress={onPress} >
    <Text style={{color:COLORS.primary,...FONTS.body3}}>Show All</Text>

</TouchableOpacity>
</View>
{children}
        {/* container */}
    </View>
)
}

const Home = () => {
    const [selectedCategoryId,setSelectedCategoryId] = useState(1)
    const [selectedMenuType,setSelectedMenuType] = useState(1)
    const [menuList,setMenuList]=useState([])
    const [recommends,setRecommends]=useState([])    
    const [popular,setPopular]=useState([])  
    const [showFilterModal,setShowFilterModal]= useState(false)

const renderSeach=()=>{

useEffect(()=>{
    handleChangeCategory(selectedCategoryId,selectedMenuType)


},[])

 const  handleChangeCategory=(categoryId,MenuTypeId)=>{
    //Fine the menu base on menu ID
    
let selectedMenu =dummyData.menu.find(a=>a.id===MenuTypeId)
let selectRecommeds= dummyData.menu.find(a=>a.name=="Recommended")
//Retrieve Popular Menu
let selectedPopular= dummyData.menu.find(a=>a.name=="popular")

//set the recommended based on category Id
setPopular(selectRecommeds?.list.filter(a=>a.categories.includes(categoryId)))
setRecommends( selectRecommeds?.list.filter(a=>a.categories.includes(categoryId)))
//set the menu based on category Id

setMenuList(selectedMenu?.list.filter(a=>a.categories.includes(categoryId)) )
 
}


    return(
        <View style={{flexDirection:'row',height:40,alignItems:'center',marginHorizontal:SIZES.padding,marginVertical:SIZES.base,paddingHorizontal:SIZES.radius,borderRadius:SIZES.radius,backgroundColor:COLORS.lightGray2}}>

<Image source={icons.search} style={{height:20,width:20,tintColor:COLORS.black}} />
<TextInput style={{flex:1,marginLeft:SIZES.radius,...FONTS.body3}} placeholder="Search Food...." />
<TouchableOpacity onPress={()=>setShowFilterModal(true)}>
<Image source={icons.filter} style={{height:20,width:20,tintColor:COLORS.black}} />
</TouchableOpacity>
        </View>
    )
}


const renderMenuTypes =()=>{
    return(
<FlatList 
horizontal
data={dummyData.menu}
keyExtractor={(item)=>item.id}
showsHorizontalScrollIndicator={false}
contentContainerStyle={{
    marginBottom:20,marginTop:30
}}
renderItem={({item,index})=>(
<TouchableOpacity style={{marginLeft:SIZES.padding,marginRight:index==dummyData.menu.length-1?SIZES.padding:0}}
onPress={()=>{setSelectedMenuType(item.id),handleChangeCategory(selectedCategoryId,item.id)}}
>
<Text style={{color: selectedMenuType==item.id?COLORS.primary:COLORS.black,...FONTS.h3}}>{item.name}</Text>
</TouchableOpacity>


)
}
/>
    )}


const renderRecommendedSection =()=>{
    return(
<Section title="Recommended" onPress={()=>console.log("Show ALl recommended")}>
<FlatList 
data={recommends}
keyExtractor={(item)=>item.id}
horizontal
showsHorizontalScrollIndicator={false}
renderItem={({item,index})=>(
<HorizontalFoodCart 
containerStyle={{
    height:180,
    width:SIZES.width*0.85,
    marginLeft:index==0?SIZES.padding:18,
    marginRight:index==recommends.length-1?SIZES.padding:SIZES.radius,
    alignItems:'center'   
}}
imageStyle={{marginTop:35,height:150,width:150}}
item={item}
onPress={()=>{console.log("Horizontal Food Cart")}}
/>    
)
}

/>
</Section>

    )
}

const renderPopularSection=()=>{

    return(
        <Section  title="Popular Near You" onPress={()=>{console.log("Popular Section")}}>


<FlatList 

data={popular}
keyExtractor={item=>item.id}
horizontal
showsHorizontalScrollIndicator={false}
renderItem={({item,index})=>(
<VerticalFoodCart containerStyle={{
    marginLeft:index==0?SIZES.padding:18,
    marginRight:index== popular.length-1?SIZES.padding:0,
}}
item={item}

onPress={()=>{console.log('Vertical Food Cart')}}

/>

    )}

/>

    </Section>

        )



}

const renderFoodCategories =()=>{
  
    return(
        <FlatList 
        data ={dummyData.categories}
        horizontal
showsHorizontalScrollIndicator={false}
        renderItem={({item,index})=>{
            return(
<TouchableOpacity 
style={{flexDirection:'row',
justifyContent:'center',
alignItems:'center',
height:55,
width:150,
marginRight:index==dummyData.categories.length-1?SIZES.padding:0,
marginTop:SIZES.padding,
marginLeft:index==0?SIZES.padding:SIZES.right,
paddingHorizontal:8,
borderRadius:SIZES.radius,
backgroundColor:selectedCategoryId==item.id?COLORS.primary:COLORS.lightGray2

}} onPress={()=>{setSelectedCategoryId(item.id),handleChangeCategory(item.id,selectedMenuType)}}>
    <Image source={item.icon}  style={{marginTop:5,height:50,width:50}} />
                <Text style={{...FONTS.h3,alignSelf:'center',marginRight:SIZES.base,
                    color:selectedCategoryId==item.id?COLORS.white:COLORS.darkGray,
                    }}>{item.name}</Text>
                </TouchableOpacity>
        )}}

        />
    )}


    const renderDeliveryTo=()=>{
        return(
            <View style={{
                marginTop:SIZES.padding,
                marginHorizontal:SIZES.padding,

            }}>
                <Text style={{color:COLORS.primary,...FONTS.body3}}>Delivery</Text>
            <TouchableOpacity style={{flexDirection:'row',marginTop:SIZES.base,alignItems:'center'}}>
            <Text style={{...FONTS.h3}}>{dummyData.myProfile.address}</Text>
<Image source={icons.down_arrow}  style={{marginLeft:SIZES.base,height:20,width:20}}/> 
            </TouchableOpacity>
            </View>
        )
    }

    return (
        <View>
{/* Search */}
{renderSeach()}
{
    showFilterModal &&
<FilterModal
isVisible={showFilterModal}
onClose={()=>setShowFilterModal(false)}

/>
}
<FlatList 

data={menuList}
keyExtractor={(item)=>{item.id}}
showsVerticalScrollIndicator={false}
ListHeaderComponent={
    
    <View>
{/* delivery Section */}
{renderDeliveryTo()}

{/* Food Categories */}
{renderFoodCategories()}

{/* Popular */}
{renderPopularSection()}
{/* Recommended */}
{renderRecommendedSection()}
        {renderMenuTypes()}
        </View>
}
renderItem={({item,index})=>{
return(

<HorizontalFoodCart
 containerStyle={{
    height:130,alignItems:'center',marginHorizontal:SIZES.padding,marginBottom:SIZES.radius }}
    imageStyle={{marginTop:20,height:110,width:110}}
    item={item}
    onPress={()=>console.log("HorizontalFOodCard")}
 />
 )}} 

ListFooterComponent={
    <View style={{height:200}}/>
}
/>

{/* List */}

</View>
    )
}

export default Home;