import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,Image,SafeAreaView,TextInput,FlatList, StatusBar
} from 'react-native';
import {FONTS,COLORS,SIZES,icons,images,dummyData} from '../constants';
import { CategoryCard,TrendingCard} from '../components';
const Home = ({ navigation }) => {

    function renderHeader(){
        return(
            <View
            style={{
                flexDirection:'row',
                marginHorizontal:SIZES.padding,
                alignItems:'center',
                height:80
            }}
            >
                {/* Text */}
                <View style={{
                    flex:1,

                }}
                >
              <Text style={{
                  color:COLORS.darkGreen,
                  ...FONTS.h2
              }}
              >Hello morgan,</Text>
              <Text style={{
                  marginTop:3,
                  color:COLORS.gray,
                  ...FONTS.body3
              }}>
                what You want to cook today</Text>

                </View>

                {/* Image */}
                <TouchableOpacity 
                onPress={()=>console.log("profile")}
                >
                    <Image
                    source={images.profile}
                    style={{
                        width:40,
                        height:40,
                        borderRadius:20
                    }}
                    />

                </TouchableOpacity>

            </View>
        )
    }
    function renderSearchBar(){
        return(
            <View 
            style={{
                flexDirection:'row',
                height:50,
                alignItems:'center',
                marginHorizontal:SIZES.padding,
                paddingHorizontal:SIZES.radius,
                backgroundColor:COLORS.lightGray,
                borderRadius:10,

            }}
            >
           <Image 
           source={icons.search}
           style={{
               width:20,
               height:20,
               tintColor:COLORS.gray
           }}
           />
           <TextInput style={{
               marginLeft:SIZES.radius,
               ...FONTS.body3
           }}
           placeholderTextColor={COLORS.gray}
           placeholder="Search Dishes"
           >
           </TextInput>
            </View>
        )
    }
    function renderRecipeCard(){
        return(
            <View style={{
                flexDirection:'row',
                marginTop:SIZES.padding,
                marginHorizontal:SIZES.padding,
                borderRadius:10,
                backgroundColor:COLORS.lightGreen
            }}>
             <View style={{
                 width:100,
                 alignItems:'center',
                 justifyContent:'center'
             }}>
                 <Image
                 source={images.recipe}
                 style={{
                     width:80,
                     height:80,
                     }}
                 />
                 </View>
                  <View style={{
                     flex:1,
                     paddingVertical:SIZES.radius
                 }}> 
                 <Text style={{
                     width:"70%",
                     ...FONTS.body4
                 }}>
                     you have 12 items to choose anythings and start preparing your recipe
                 </Text> 
                   <TouchableOpacity 
                  style={{
                      marginTop:10,

                  }}
                  onPress={()=>console.log("See Recipe")}
                  >
                   <Text style={{
                       color:COLORS.darkGreen,
                       textDecorationLine:'underline',
                       ...FONTS.h4
                   }}>See Recipe</Text>
                  </TouchableOpacity>
                 </View> 
             </View>
        )
    }
    function renderTrending(){
        return(
            <View style={{
                marginTop:SIZES.padding
            }}>
                <Text style={{
                    marginHorizontal:SIZES.padding,
                    ...FONTS.h2
                }}>
                   Trending Recipe 
                </Text>
                <FlatList
                data={dummyData.trendingRecipes}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={item=>`${item.id}`}
                  renderItem={({item,index})=>{
                      return(
                          <TrendingCard
                          recipeItem={item}
                          onPress={()=>navigation.navigate("Recipe",{recipe:item})}
                          containerStyle={{
                              marginLeft: index == 0 ? SIZES.padding : 0
                          }}
                          />

                      )
                  }}
                />

            </View>
        )
    }
    function renderCategoryHeader(){
        return(
           <View style={{
               flexDirection:'row',
               alignItems:'center',
               marginTop:20,
               marginHorizontal:SIZES.padding
           }}>
             {/* secttion title */}
             <Text style={{
                 flex:1,
                 ...FONTS.h2
             }}>
             Categories
             </Text >
             <TouchableOpacity>
                 <Text style={{
                     color:COLORS.gray,
                     ...FONTS.body4
                 }}>View All</Text>
             </TouchableOpacity>
           </View>
        )
    }
    return (
       <SafeAreaView 
       style={{
           flex:1,
           backgroundColor:COLORS.white
       }}
       >
           <FlatList
           data={dummyData.categories}
           keyExtractor={(item=>`${item.id}`)}
           keyboardDismissMode="on-drag"
           showsVerticalScrollIndicator={false}
           ListHeaderComponent={
               <View>
                  {/* Header */}
                  {renderHeader()}
                  {/*   search bar */}
                  {renderSearchBar()}
                  {/* see recipe card */}
                  {renderRecipeCard()}
                  {/* Trending section */}
                  {renderTrending()}
                  {/* Category */}
                  {renderCategoryHeader()}
               </View>
           }
           renderItem={({item})=>{
              return (
                  <CategoryCard
                   categoryItem={item}
                  onPress={()=>navigation.navigate("Recipe",{recipe:item})}
                  />
              )
           }}
           ListFooterComponent={
               <View
               style={{
                   marginBottom:100
               }}
               />
           }
           />
           {/* <StatusBar barStyle='light' backgroundColor="#4096FE"/> */}
       </SafeAreaView>
    )
}

export default Home;