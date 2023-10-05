import { View,Text,Dimensions } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";


const AddFriends = ({text,data,navigation,type}) => {
    const widths = Dimensions.get("screen").width;
    const heights = Dimensions.get("screen").height;
    
    return (
       <TouchableOpacity onPress={()=>{
            navigation.navigate("FriendUserList",{data:data,type:type})
       }}>

            <View
                style={{
                    backgroundColor:'white',
                    width: widths - widths * 0.1,
                    padding: 10,
                    paddingLeft:5,
                    marginBottom:heights * 0.009,
                    flexDirection:"row",
                    alignItems:'center',
                    justifyContent: "space-between"
                }}
            >

                <Text style={{
                    color: "#333",
                    fontSize: widths * 0.05,
                    fontWeight:'500',
                
                }}>
                {text} 
                </Text>

                <View style={{
                    width: widths * 0.08,
                    height: widths * 0.08,
                    backgroundColor:'gold',
                    alignItems:'center',
                    justifyContent:'center',
                    borderRadius:5,
                }}>
                    <Text style={{
                        color:'white',
                        fontSize: widths * 0.05,
                        fontWeight:'bold',
                    }}>
                        {data.length}
                    </Text>
                </View>
            </View>
       </TouchableOpacity>
    )
}


export default AddFriends;