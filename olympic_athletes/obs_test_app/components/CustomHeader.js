import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

const CustomHeader = ({  navigation, route }) => {
  const title = route.params ? route.params.title : 'Olimpic Athletes'; 
  const isItemDetailScreen = route.name === 'AthleteDetail';
  return (
    <View 
      style={{ flexDirection: 'row',  justifyContent: 'center', alignItems: 'center',
      height: 60, 
      backgroundColor: '#e5e7eb',
      width: "100%"
    }}>
      {isItemDetailScreen  && (<TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>)}
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
    </View>
  );
};

export default CustomHeader;