///<reference path="../../../libs/weixinapi/weixinapi.d.ts"/>
/**
 * 描述:分享工具
 * 作者:chenbin  创建日期:2020年12月09日
 */
class Share {
    /**
     *返回是否为端内
     *
     * @static
     * @returns {boolean}
     * @memberof Share
     */
    public static isApp(): boolean {
        return /jzh$/.test(navigator.userAgent.toLowerCase())
    }
    /**
     *端内分享配置
     *
     * @static
     * @param {*} posterPath
     * @memberof Share
     */
    public static appShareConfig(posterPath) {
        if (this.isApp()) {
            const shareConfig = {
                shareType: 2, // 1.网页，2大图，3小程序 // 分享类型，默认h5链接
                agentKey: '', // 项目日志自定义统计keys
                shareScence: 31, // 分享渠道,二进制转换 000000 ~ 111111。 timeline
                businessId: 2018, // 项目对于业务ID
                isOneKeyShare: false, // 是否一键分享,有多种分享渠道时应置为false
                title: '双11热卖知识节开启，集能量兑好礼！',
                actionUrl: "http://baidu.com", // 跳转url, 域名应以http或https开头开头
                description: '素养课口碑好课免拼折上折，年度超低折扣等你来！',
                imagePath: posterPath // 图片地址

            }
            window['xesApp'].start('xesShare/share', JSON.stringify(shareConfig), 'xesApp.appShareBack')
        }
    }
    /**
     *微信分享配置
     *
    * @static
     * @param {*} data 接口获取到的appid等信息
     * @memberof Share
     */
    public static wxShareConfig(data: any) {
        var bodyConfig: BodyConfig = new BodyConfig();
        bodyConfig.appId = data.wxConf.appId;
        bodyConfig.debug = false;
        bodyConfig.timestamp = data.wxConf.timeStamp;// 必填，生成签名的时间戳
        bodyConfig.nonceStr = data.wxConf.nonceStr;// 必填，生成签名的随机串
        bodyConfig.signature = data.wxConf.signature;// 必填，签名，见附录1
        bodyConfig.jsApiList = data.wxConf.jsApiList
        if (wx) {
            wx.config(bodyConfig);
            wx.ready(function () {
                wx.checkJsApi({
                    jsApiList: data.wxConf.jsApiList, // 需要检测的JS接口列表，所有JS接口列表见附录2,
                    success: function (res) {
                        console.log(res)
                        let wxShareConfig: any = {
                            title: "我的2020年度学习报告", // 分享标题
                            desc: "探索学而思进步宇宙，寻找最优秀的校友！", // 分享描述
                            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: 'https://activity.xueersi.com/topic/growth/common/images/common/xes-logo.png' // 分享图标
                        }

                        wx.onMenuShareTimeline(wxShareConfig) // 分享给到朋友圈
                        wx.onMenuShareAppMessage(wxShareConfig) // 分享给朋友
                        wx.onMenuShareQQ(wxShareConfig) // 分享到QQ
                        wx.onMenuShareWeibo(wxShareConfig) // 分享到微博
                    }
                });
            });
        }
    }
    /**
     *动态海报生成（自定义DOM）
     *
     * @static
     * @param {*} posterPath
     * @memberof Share
     */
    public static wxPosterSave(posterPath) {
        if (!this.isApp()) {
            let sharePoster = document.getElementById('wxSharePoster')
            let imgurl = posterPath;
            let str = '<div class="posterBox"><div class="closePoster"  onclick="clearSharePoster()"></div><img src="' + imgurl + '"' + '/></div><div class="shareTip"><div class="title"> <p>长按海报保存 </p></div><div class="desc"><p>立刻分享给好友吧 </p></div></div>'
            sharePoster.style.height = "100%";
            sharePoster.innerHTML = str;
        }
    }
    /**
     *动态海报清空（自定义DOM）
     *
     * @static
     * @memberof Share
     */
    public static wxPosterClear() {
        let sharePoster = document.getElementById('wxSharePoster');
        sharePoster.innerHTML = "";
    }
}