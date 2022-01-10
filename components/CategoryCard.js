import React from "react";
import {View,TouchableOpacity,Text,Image} from 'react-native';
import { color } from "react-native-reanimated";
import  {COLORS,FONTS,SIZES} from '../constants';


const CategoryCard=({containerStyle,categoryItem,onPress})=>{
    return(
<TouchableOpacity 
style={{
    flexDirection:'row',
    alignItems:'center',
    padding:10,
    marginTop:10,
    borderRadius:SIZES.radius,
    backgroundColor:COLORS.gray2,
    ...containerStyle
}}
onPress={onPress}
>
    {/* image */}
    <Image
    source={categoryItem.image}
    resizeMode="cover"
    style={{
        width:100,
        height:100,
        borderRadius:SIZES.radius
    }}
    />
    <View>
      <Text style={{
          flex:1,
          ...FONTS.h3,
          marginLeft:20,
          color:COLORS.black,
          textAlign:'left'
      }}>
     {categoryItem.name}
      </Text>
      <View>
          <Text style={{
              bottom:50,
              left:20
          }}>
              {categoryItem.duration} | {categoryItem.serving}</Text></View>
      
      </View>
{/* details */}
</TouchableOpacity>
    )
}
export default CategoryCard