import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 200,
    width: 200,
    borderRadius: 20,
  },
});

const Row = (props) => (
  <View style={styles.container}>
    <Image source={{ uri: props.images? props.images[0].source_url : ''}} style={styles.photo} />
    <Text style={styles.text}>
      {`${props.name}`}
    </Text>
  </View>
);

export default Row;