/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Row from './row'
import Header from './searchbar.js'

import ApiUtils from './ApiUtils'

import {
  AppRegistry,
  StyleSheet,
  ListView,
  Image,
  Text,
  TextInput,
  View
} from 'react-native';

var REQUEST_URL = 'https://www.triposo.com/api/v2/location.json?id=Amsterdam&fields=all&account=ID0LFX9D&token=715rf5nhrec2ytaohe7zca8fsx9827fh'


export default class PlacesLive extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ]),
    };
  }

  getTriposoLocations(location) {
    fetch('https://www.triposo.com/api/v2/poi.json?location_id='+location, {
      method: 'GET',
      headers: {
        'X-Triposo-Account': 'ID0LFX9D',
        'X-Triposo-Token': '715rf5nhrec2ytaohe7zca8fsx9827fh',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
      })
      .then(ApiUtils.checkStatus)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('veio RESPOSTA PORRRRA');
        console.log(JSON.stringify(responseJson));
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseJson["results"])
        }, function (state) {
          console.log(state);
        });
        // this.state.dataSource = 

       // return responseJson.movies;
      })
      .catch((error) => {
        console.error('this is the error'+ error);
      });
   }

  componentWillMount() {
    console.log('componentDidMount');
    this.getTriposoLocations();
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <ListView
          dataSource = {this.state.dataSource}
          renderRow =
          {
            (rowData) => <Row {...rowData} />
          }
          renderHeader =
          {
            (props) => (
            <View style={styles.searchbar}>
              <TextInput
                style={styles.input}
                placeholder="Search For a City"
                onChangeText={(text) => this.getTriposoLocations(text)}
              />
            </View>
            )
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchbar: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C1C1C1',
  },
  input: {
    height: 30,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('PlacesLive', () => PlacesLive);
