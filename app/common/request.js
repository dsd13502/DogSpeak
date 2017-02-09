/**
 * Created by im_dsd on 2017/2/8.
 */
'use strict'

//"_"下划线标示私有方面，不对外暴露

import QueryString from 'query-string';
import Lodash from 'lodash';
import Mock from 'mockjs';
import config from './config';

const request = {}





request.get = function(url,params){
    if (params){
        url +='?' + QueryString.stringify(params)
    }
    console.log(url)

    return fetch(url)

        .then((response) => response.json())
        .then((response) => Mock.mock(response))
},


request.post = function(url,body)
{
    let options = Lodash.extend(config.header,
        {
            body: JSON.stringify({body})
        })

    return fetch(url,options)
        .then((response) => response.json())
        .then((response) => Mock.mock(response))
}

module.exports = request



