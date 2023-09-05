import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
const SkeletonLoader = ({ loading }) => {
  return (
    <>
    <View style={styles.container}>
      <ShimmerPlaceHolder
        autoRun={true}
        visible={!loading}
        style={styles.imagePlaceholder}
      >
      </ShimmerPlaceHolder>
      <ShimmerPlaceHolder
        autoRun={true}
        visible={!loading}
        style={styles.textPlaceholder}
      >
        <Text style={styles.text}>Loading...</Text>
      </ShimmerPlaceHolder>
    </View>
    <View style={styles.container}>
      <ShimmerPlaceHolder
        autoRun={true}
        visible={!loading}
        style={styles.textPlaceholder}
      >
        <Text style={styles.text}>Loading...</Text>
      </ShimmerPlaceHolder>
    </View>
    <View style={styles.container}>
      <ShimmerPlaceHolder
        autoRun={true}
        visible={!loading}
        style={styles.textPlaceholder}
      >
        <Text style={styles.text}>Loading...</Text>
      </ShimmerPlaceHolder>
    </View>
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    marginRight: 16,
  },
  textPlaceholder: {
    flex: 1,
    height: 100,
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SkeletonLoader;
