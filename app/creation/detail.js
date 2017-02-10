/**
 * Created by im_dsd on 2017/2/9.
 */

'use strict'

const React = require('react')
const ReactNative = require('react-native')
import Video from 'react-native-video/Video';
 import Icon from 'react-native-vector-icons/Ionicons';

let {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ActivityIndicator
} = ReactNative

const width= Dimensions.get('window').width

const Detail = React.createClass({



    getInitialState()
    {
        let data = this.props.data;
        return{
            data : data,
            rate :1,
            videoUrl:'http://219.238.7.66/mp4files/4100000003406F25/clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
            muted:false,
            resizeMode:'contain',
            repeat:false,
            videoLoaded:false,
            videoTotal:0,
            currentTime:0,
            videoPercent:0,
            playing:false,
        }
    },

    render () {
        return(
            <View style={styles.container}>
                <Text onPress={this._backToList}>详情页面 {this.state.data._id}</Text>
                <View style={styles.videoBox}>
                    <Video
                        rep='videoPlayer' //相当于对组建的引用
                        source={{uri:this.state.videoUrl}}
                        style={styles.video}
                        volume={3}
                        paused={false} //是否暂停
                        rate={this.state.rate}//  去职是0和1，0暂停
                        muted={this.state.muted} //是否静音
                        resizeMode={this.state.resizeMode} //视频的尺寸
                        repeat={this.state.repeat}//是否重复播放

                        onLoadStart={this._onLoadStart}//开始调用视频
                        onLoad={this._onLoad}// 视频开始之后会不断的调用它
                        onProgress={this._onProgress}//每200ms回调一次，并将当前时间作为参数
                        onEnd={this._onEnd}
                        onError={this._onError}
                    />

                    {
                        !this.state.videoLoaded &&
                        <ActivityIndicator color='#ee735c' style={styles.loading}/>
                    }

                    {
                        this.state.videoLoaded && this.state.playing ?
                            <Icon
                                onPress={this._rePlay}//如果调用 _rePlay() 则会自动执行，不知道原因
                                size={48}
                                name ='ios-play'
                                style ={styles.playIcon}/>
                            : null

                    }
                </View>
                <View style={styles.progressBox}>
                    <View style={[styles.progressBar, {width :width * this.state.videoPercent}]}>
                    </View>
                </View>
                
            </View>
        )
    },

    _rePlay()
    {
       this.refs.videoPlayer.seek(0)
    },
    _onLoadStart()
    {
        console.log("load start")
    },

    _onLoad()
    {
        console.log("load ")

    },

    _onProgress(data)
    {
        if (!this.state.videoLoaded){
            this.setState({
                videoLoaded:true
            })
        }

        const duration = data.playableDuration
        const currentTime = data.currentTime
        const percent = Number((currentTime/duration).toFixed(2))
        const newState={
            videoTotal:duration,
            currentTime: Number((currentTime).toFixed(2)),
            videoPercent:percent
        }

        if (!this.state.videoLoaded){
            newState.videoLoaded = true
        }

        if (!this.state.playing){
            newState.playing = true
        }

        this.setState(newState)


    },

    _onEnd(){
        console.log("end")
        this.setState({
            videoPercent:1,
            playing : false
        })

    },

    _onError()
    {
        console.log("error")

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
   videoBox:{
        width:width,
        height:360,
        backgroundColor:'#000',
   },
    video:{
        width:width,
        height:360,
        backgroundColor:'#000',
    },
    loading:{
        position:'absolute',
        left:0,
        top:140,
        width:width,
        backgroundColor:'transparent'
    },
    progressBox:{
        width : width,
        height:2,
        backgroundColor:'#ccc'
    },
    progressBar:{
        width : 1,
        height:2,
        backgroundColor:'#ff6600'
    },

    playIcon:{
        position:'absolute',
        top:140,
        left:width / 2 -30 ,
        height:60,
        width:60,
        paddingTop:8,
        paddingLeft:22,
        backgroundColor:'transparent',
        borderColor:'#fff',
        borderWidth:1,
        borderRadius:30,
        color:'#ed7b66',
    }

})

module.exports = Detail;
