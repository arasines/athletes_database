import React from 'react';
import { View, StyleSheet } from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
const SkeletonListLoader = ({ loading }) => {
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
        style={styles.imagePlaceholder}
      >
      </ShimmerPlaceHolder>
      <ShimmerPlaceHolder
        autoRun={true}
        visible={!loading}
        style={styles.imagePlaceholder}
      >
      </ShimmerPlaceHolder>
    </View>
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 130,
    height: 130,
    margin: 8
  }
});

export default SkeletonListLoader;
