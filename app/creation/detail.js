/**
 * Created by im_dsd on 2017/2/9.
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

const Detail = React.createClass({
    render () {
        let row = this.props.row;
        return(
            <View style={styles.container}>
                <Text onPress={this._backToList}>详情页面 {row._id}</Text>
            </View>
        )
    },

    _backToList()
    {
        this.props.navigator.pop() //将页面出栈
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

module.exports = Detail;
