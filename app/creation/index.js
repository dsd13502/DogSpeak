/**
 * Created by im_dsd on 2017/2/7.
 */

'use strict'

import React  from 'react';
import ReactNative from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const {
    StyleSheet,
    Text,
    View,
    ListView,
    Dimensions,
    TouchableHighlight,
    Image
} = ReactNative

const width = Dimensions.get('window').width

const List = React.createClass({

    getInitialState:function () {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        return{
            dataSource:ds.cloneWithRows([
                {
                    "_id":"230000197809160223","thumb":"http://dummyimage.com/1200x600/b570ea)","video":"http://www.imooc.com/video/1430"
                }
                ,
                {
                    "_id":"710000200511092300","thumb":"http://dummyimage.com/1200x600/a12aed)","video":"http://www.imooc.com/video/1430"
                }
                ,
                {
                    "_id":"230000197405062619","thumb":"http://dummyimage.com/1200x600/12ee5d)","video":"http://www.imooc.com/video/1430"
                }]),
        }
    },
    renderRow:function (row) {
        return(
            <TouchableHighlight>
                <View style={styles.item}>

                    <Text style={styles.title}>{row._id}</Text>
                    
                    <Image
                        source={{uri:row.thumb}}
                        style={styles.thumb}
                    >
                        <Icon
                            name='ios-play'
                            size={28}
                            style={styles.play}/>

                    </Image>


                    <View style={styles.itemFooter}>
                        <View style={styles.handleBox}>
                            <Icon
                                name='ios-heart-outline'
                                size={28}
                                style={styles.up}
                            />
                            <Text style={styles.handleText}>喜欢</Text>
                        </View>

                        <View style={styles.handleBox}>
                            <Icon
                                name='ios-chatbubbles-outline'
                                size={28}
                                style={styles.commentIcon}
                            />
                            <Text style={styles.handleText}>评论</Text>
                        </View>
                    </View>




                </View>
            </TouchableHighlight>
        )
    },

    componentDidMount:function () {
        console.log('componentDidMount');
        this._fetchData();

    },


    _fetchData:function () {
        console.log('fetch');
        fetch('http://rap.taobao.org/mockjs/4230/api/creations?accessToken=abcdef')

            .then((response) => response.text())
            .then((responseText) => {
                console.log(responseText);
                console.log(1234);
            })
            .catch((error) => {
                console.warn(error);
                console.log(567);
            });


    },


    getMoviesFromApiAsync() {
        return fetch('https://facebook.github.io/react-native/movies.json')
            .then((response) => response.json())
            .then((responseJson) => {
            console.log(responseJson);
                return responseJson.movies;
            })
            .catch((error) => {
                console.error(error);
            });
    },

    render:function () {
        return(
            <View sytle={styles.container}>
                <View style={styles.header}>
                      <Text style={styles.headerTitle}>列表页面</Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    enableEmptySections={true}
                />

            </View>
        )
    }
})


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    header:{
        paddingTop:25,
        paddingBottom:12,
        backgroundColor:'#ee735c'
    },
    headerTitle:{
        color:'#fff',
        fontSize:16,
        textAlign:'center',
        fontWeight:'600'
    },
    item:{
        width:width,
        marginBottom:10,
        backgroundColor:'#fff'
    },
    thumb:{
        width:width,
        height:width * 0.5,
        resizeMode:'cover'
    },
    title:{
        padding:10,
        fontSize:18,
        color:'#333'
    },
    itemFooter:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#eee'
    },
    handleBox:{
        padding:10,

        flexDirection:'row',
        width:width / 2 - 0.5,
        justifyContent:'center',
        backgroundColor:'#fff'
    },
    play:{
        position:'absolute',
        bottom:14,
        right:14,
        width:46,
        height:46,
        paddingTop:9,
        paddingLeft:18,
        backgroundColor:'transparent',
        borderColor:'#fff',
        borderWidth:1,
        borderRadius:23,
        color:'#ed7b66',
    },

    handleText:{
        paddingLeft:12,
        fontSize:18,
        color:'#333',
    },

    up:{
        fontSize:22,
        color:'#333'
    },

    commentIcon:{
        fontSize:22,
        color:'#333'
    }



})

module.exports = List;
