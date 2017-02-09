/**
 * Created by im_dsd on 2017/2/7.
 */

'use strict'

import React  from 'react';
import ReactNative from 'react-native';
import Request from '../common/request';
import config from '../common/config'
import Icon from 'react-native-vector-icons/Ionicons';
const {
    StyleSheet,
    Text,
    View,
    ListView,
    Dimensions,
    TouchableHighlight,
    Image,
    ActivityIndicator,
    AlertIOS,
} = ReactNative

const width = Dimensions.get('window').width

const cacheRequest = {
    pagerNext : 0,
    items : [],
    total : 0,
}

const Item = React.createClass({

    getInitialState()
    {
        let row  = this.props.row;
        return{//return可以返回多个
            row : row,
            up : row.voted
        }
    },

    _up()
    {
        let that = this;
        let up = !this.state.up;
        let row = this.state.row;
        let url = config.api.base + config.api.up;

        let body = {
            id : row.id,
            up : up ? 'yes' : 'no',
            accessToken :'abcdef'
        }

        Request.post(url,body)
            .then((data) => {
                if (data && data.success){
                    that.setState({
                        up:up,
                    })
                }else
                {
                    AlertIOS.alert('点赞失败，稍后重试')
                }
            })
            .catch((error) =>{
                console.log(error)
                AlertIOS.alert('点赞失败，稍后重试')
        })

    }
    ,

    render()
    {
        const row = this.state.row;
        return (
            <TouchableHighlight>
                <View style={styles.item}>

                    <Text style={styles.title}>{row.title}</Text>

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
                                name={this.state.up ? 'ios-heart' :'ios-heart-outline'}
                                size={28}
                                style={this.state.up ?  styles.up : styles.down}
                                onPress={this._up}
                            />
                            <Text style={styles.handleText} onPress={this._up}>喜欢</Text>
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
    }


})

const List = React.createClass({

    getInitialState() {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        return{
            isLoadingTail : false ,
            dataSource : ds.cloneWithRows([])
        }

    },

    renderRow:function (row) {
        return(
           this._renderRow(row)
        )
    },

    componentDidMount() {
        this._fetchData(1);

    },


    _renderRow(row){
        return <Item row={row}/>
    },

    //"_"下划线标示私有方面，不对外暴露
    _fetchData(page) {
        var that = this;
        this.setState(
            {
                isLoadingTail:true
                //赋值的时候要使用this.setState({XXX : ooo}) 方法，取的时候要用this.state.XXXX
            }
        )

        Request.get(config.api.base + config.api.creations,{
            accessToken:'abcdef'
        })
            .then((data) => {

                //如果数据加载成功刷新数据。
                if (data.success){

                    let items =  cacheRequest.items.slice(); //slice 遍历数组
                    items = items.concat(data.data) ;//concat追加
                    cacheRequest.items = items;
                    cacheRequest.total = data.total;
                    setTimeout(() => //添加两秒延迟
                    {
                        that.setState(
                            {
                                isLoadingTail :false,
                                dataSource:that.state.dataSource.cloneWithRows(cacheRequest.items)
                            }
                        )
                    },1000)

                }
            })
            .catch((error) => {
                console.warn(error);
                console.log(567);
            });


    },

    _hasMore()
    {
       return cacheRequest.items.length !== cacheRequest.total;
    },

    _fetchMoreData()
    {
        if (!this._hasMore || this.state.isLoadingTail){ //如果没有更多数据
            return
        }

        let page = cacheRequest.pagerNext;
        this._fetchData(page);

    },

    _renderFooter()
    {
        if (!this._hasMore){
            return(
                <View style={styles.loadingMore}>
                    <Text style={styles.loadingText}>
                        没有更多了
                    </Text>
                </View>
            )
        }

        return (
            <ActivityIndicator style={styles.loadingMore}/>
        )

    },

    render() {
        return(
            <View sytle={styles.container}>
                <View style={styles.header}>
                      <Text style={styles.headerTitle}>列表页面</Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    //添加下载更多图标
                    renderFooter={this._renderFooter}
                    //触底获取更多方法
                    onEndReached={this._fetchMoreData}
                    onEndReachedThreshold={20}

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
        color:'#ed7b66'
    },

    down:{
        fontSize:22,
        color:'#333'
    },
    commentIcon:{
        fontSize:22,
        color:'#333'
    },

    loadingMore:{
        marginVertical:20,
    },

    loading:{
        color:'#777',
        textAlign:'center'
    }


})

module.exports = List;
