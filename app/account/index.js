/**
 * Created by im_dsd on 2017/2/7.
 */

'use strict'

const React = require('react')
const ReactNative = require('react-native')
const Icon = require('react-native-vector-icons/Ionicons')
let {
    StyleSheet,
    Text,
    View
} = ReactNative

const Account = React.createClass({
    render:function () {
        return(
            <View style={styles.container}>
                <Text>账户页面</Text>
            </View>
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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
})

module.exports = Account;
