import React,{useState,useRef} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Animated,
    Platform,
    FlatList
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import {SIZES,COLORS,FONTS,icons} from '../constants';
import { Viewers } from '../components';


const RecipeCreatorCardDetails=({selectedRecipe})=>{
    return(
       <View style={{
           flex:1,
           flexDirection:'row',
           alignItems:'center'
       }}>
           <View style={{
               width:40,
               height:40,
               marginLeft:20
           }}>
               {/* profile photo */}
               <Image source={selectedRecipe?.author?.profilePic}
               style={{
                   width:40,
                   height:40,
                   borderRadius:20
               }}
               />
         </View>
           <View style={{
               flex:1,
               marginHorizontal:20,

           }}>
               <Text style={{
                   color:COLORS.lightGray2,
                   ...FONTS.body4
               }}>Recipe By</Text>
               <Text style={{
                   color:COLORS.white2,
                   ...FONTS.h3
               }}>{selectedRecipe?.author?.name}</Text>

           </View>
           <TouchableOpacity style={{
               width:30,
               height:30,
               alignItems:'center',
               justifyContent:'center',
               marginRight:20,
               borderRadius:5,
               borderWidth:1,
               borderColor:COLORS.lightGreen1
           }}
           onPress={()=>console.log("view profile")}
           >
          <Image source={icons.rightArrow}
          style={{
              width:15,
              height:15,
              tintColor:COLORS.lightGreen1
          }}
          />
           </TouchableOpacity>

       </View>
    )
}
const RecipeCreatorCardInfo =({selectedRecipe})=>{
    if(Platform.OS==='android'){
 return(
      <BlurView
      style={{
          flex:1,
          borderRadius:SIZES.radius
      }}
      blurType='dark'
      >
       <RecipeCreatorCardDetails
       selectedRecipe={selectedRecipe}
       />
      </BlurView>
    )
}else{
    return(
        <View style={{
            flex:1,
            borderRadius:SIZES.radius,
            backgroundColor:COLORS.transparentBlack9
        }}>
     <RecipeCreatorCardDetails
       selectedRecipe={selectedRecipe}
       />
        </View>

    )
}
}
const HEADER_HEIGHT=350;
 const Recipe=({navigation,route,selectedRecipe}) => {
     const [selectRecipe,setSelectRecipe]=useState(null);
     const scrollY=useRef(new Animated.Value(0)).current;

     React.useEffect(()=>{
         let {recipe}=route.params
         setSelectRecipe(recipe)
     },[]);

     function renderHeaderBar({selectedRecipe}){
         return(
             <View style={{
                 position:'absolute',
                 top:0,
                 left:0,
                 right:0,
                 alignItems:'flex-end',
                 flexDirection:'row',
                 justifyContent:'space-between',
                 paddingHorizontal:SIZES.padding,
                 paddingBottom:10
                 
             }}>
                 {/* screen overlay */}
                 <Animated.View 
                 style={{
                     position:'absolute',
                     top:0,
                     left:0,
                     right:0,
                     bottom:0,
                     backgroundColor:COLORS.black,
                     opacity:scrollY.interpolate({
                         inputRange:[HEADER_HEIGHT-100,HEADER_HEIGHT-70],
                         outputRange:[0,1]
                     })
                 }}
                 />
                 {/* header bar title */}
                 <Animated.View style={{
                     position:'absolute',
                     top:0,
                     left:0,
                     right:0,
                     bottom:0,
                     alignItems:'center',
                     justifyContent:'flex-end',
                     paddingBottom:10,
                     opacity:scrollY.interpolate({
                         inputRange:[HEADER_HEIGHT-100,HEADER_HEIGHT-50],
                         outputRange:[0,1]
                     }),
                     transform:[
                         {
                           translateY:scrollY.interpolate({
                               inputRange:[HEADER_HEIGHT-100,HEADER_HEIGHT-50],
                               outputRange:[0],
                               extrapolate:'clamp'
                           })
                         }
                     ]
                 }}>
                     <Text style={{color:COLORS.lightGray,...FONTS.body4}}>Recipe by:</Text>
                     <Text style={{
                         color:COLORS.white2,...FONTS.h3
                     }}>{selectedRecipe?.author?.name}</Text>

                 </Animated.View>
                 <TouchableOpacity style={{
                     alignItems:'center',
                     justifyContent:'center',
                     height:30,
                     width:30,
                     borderRadius:18,
                     borderWidth:1,
                     borderColor:COLORS.lightGray,
                     backgroundColor:COLORS.transparentBlack5
                 }}
                 onPress={()=>navigation.goBack('Recipe')}
                 >
               <Image source={icons.back}
               style={{width:15,height:15,tintColor:COLORS.lightGray}}
               />
                 </TouchableOpacity>
                 <TouchableOpacity style={{
                     alignItems:"center",
                     justifyContent:'center',
                     height:35,
                     width:35
                 }}>
                     <Image source={selectedRecipe?.isBookmark?icons.bookmarkFilled:icons.bookmark}
                     style={{
                         width:30,
                         height:30,
                         tintColor:COLORS.darkGreen
                     }}
                     />
                 </TouchableOpacity>

             </View>
         )
     }
     function renderRecipeCardHeader(){
         return(
             <View style={{
                 marginTop:-1000,
                 paddingTop:1000,
                 alignItems:'center',
                 overflow:'hidden'
             }}>
                 {/* background image */}
                 <Animated.Image
                 source={selectRecipe?.image}
                 resizeMode='contain'
                 style={{
                     height:HEADER_HEIGHT,
                     width:'200%',
                     transform:[
                         {
                             translateY:scrollY.interpolate({
                                 inputRange:[-HEADER_HEIGHT,0,HEADER_HEIGHT],
                                 outputRange:[-HEADER_HEIGHT/2,0,HEADER_HEIGHT*0.75]
                             })
                         },
                         {
                             scale:scrollY.interpolate({
                                 inputRange:[-HEADER_HEIGHT,0,HEADER_HEIGHT],
                                 outputRange:[2,1,0.75]
                             })
                         }
                     ]
                 }}
                 />



                 {/* recipeCardImage */}
                 <Animated.View style={{
                     position:'absolute',
                     bottom:10,
                     left:30,
                     right:30,
                     height:80,
                     transform:[
                         {
                             translateY:scrollY.interpolate({
                                 inputRange:[0,170,250],
                                 outputRange:[0,0,100],
                                 extrapolate:'clamp'
                             })
                         }
                     ]
                 }}>
                 <RecipeCreatorCardInfo 
                 selectRecipe={selectRecipe}
                 />
                 </Animated.View>

             </View>
         )
     }
     function renderRecipeInfo(){
         return(
             <View style={{
                 flexDirection:'row',
                 height:130,
                 width:SIZES.width,
                 paddingHorizontal:30,
                 paddingVertical:20,
                 alignItems:'center'
             }}>

                {/* recipe section */}
                <View style={{
                    flex:1.5,
                    justifyContent:'center'
                }}>
                    <Text style={{
                        ...FONTS.h2
                    }}>{selectRecipe?.name}</Text>
                  
                    <Text style={{marginTop:5,color:COLORS.lightGray2,...FONTS.body4}}>{selectRecipe?.duration} | {selectedRecipe?.serving}</Text>
              
                </View>
                <View style={{
                    flex:1,
                    justifyContent:'center'
                }}>
                   <Viewers
                   viewerList={selectedRecipe?.viewers}
                   />
                 </View>
             </View>
         )
     }
    return (
        <View
            style={{
                flex: 1,
               backgroundColor:COLORS.white
            }}
        >
            <Animated.FlatList
            data={selectRecipe ?.ingredients}
            keyExtractor={item=>`${item.id}`}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
                <View>
                    {/* header */}
                    {renderRecipeCardHeader()}
                    {/* info */}
                    {renderRecipeInfo()}
                    {/* ingredient */}
                </View>
            }
            scrollEventThrottle={16}
            onScroll={Animated.event([
                {nativeEvent:{contentOffset:{y:scrollY}}}
            ],{useNativeDriver:true})}
            renderItem={({item})=>(
                <View style={{
                    flexDirection:'row',
                    paddingHorizontal:30,
                    marginVertical:5
                }}>
                    {/* icon */}
                    <View style={{
                        alignItems:'center',
                        justifyContent:'center',
                        height:50,
                        width:50,
                        borderRadius:5,
                        backgroundColor:COLORS.lightGray
                    }}>
                        <Image source={item.icon}
                        style={{
                            height:40,
                            width:40
                        }}
                        />

                    </View>

                     {/* description */}
                     <View style={{
                         flex:1,
                         paddingHorizontal:20,
                         justifyContent:'center'
                     }}>
                     <Text style={{
                         ...FONTS.body3
                     }}>{item.description}</Text>
                     </View>
                    
                    {/* quantity */}
                    <View style={{
                        alignItems:'flex-end',
                        justifyContent:'center'
                    }}>
                  <Text style={{
                      ...FONTS.body3
                  }}>{item.quantity}</Text>
                    </View>
                </View>
            )}
            
            />
            {renderHeaderBar()}
        </View>
    )
}

export default Recipe;