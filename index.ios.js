'use strict'

const React = require('react')
const ReactNative = require('react-native')
import Icon from 'react-native-vector-icons/Ionicons';

const List = require('./app/creation/index')
const Edit = require('./app/edit/index')
const Account =require('./app/account/index')

let {
    AppRegistry,
    StyleSheet,
    TabBarIOS,
    Text,
    View
} = ReactNative



const TabBarExample = React.createClass({
  statics: {
    description: 'Tab-based navigation.'
  },

  displayName: 'TabBarExample',

  getInitialState: function() {
    return {
      selectedTab: 'list',
      notifCount: 0,
      presses: 0
    }
  },

  render: function() {
    return (
            <TabBarIOS
                tintColor="#ee753c">

              <Icon.TabBarItem
                  iconName= 'ios-videocam-outline'
                  selectedIconName='ios-videocam'
                  selected={this.state.selectedTab === 'list'}
                  onPress={() => {
                    this.setState({
                      selectedTab: 'list'
                    })
                  }}>
                <List/>
              </Icon.TabBarItem>

              <Icon.TabBarItem
                  iconName=  'ios-recording-outline'
                  selectedIconName='ios-recording'
                  badge={5}   //{this.state.notifCount > 0 ? this.state.notifCount : undefined}
                  selected={this.state.selectedTab === 'edit'}
                  onPress={() => {
                    this.setState({
                      selectedTab: 'edit',
                      notifCount: this.state.notifCount + 1
                    })
                  }}>
                  <Edit/>
              </Icon.TabBarItem>
                
              <Icon.TabBarItem
                  iconName=  'ios-more-outline'
                  selectedIconName='ios-more'
                  renderAsOriginal
                  selected={this.state.selectedTab === 'account'}
                  onPress={() => {
                    this.setState({
                      selectedTab: 'account',
                      presses: this.state.presses + 1
                    })
                  }}>
                  <Account/>
              </Icon.TabBarItem>
                
            </TabBarIOS>
    )
  }

})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    tabContent: {
        flex: 1,
        alignItems: 'center'
    },
    tabText: {
         color: 'white',
         margin: 50
    }
})

module.exports = TabBarExample
//相当于java中的Main方法，第一个参数是和项目同名的，第二个参数是入口方法
AppRegistry.registerComponent('RN', () => TabBarExample)
