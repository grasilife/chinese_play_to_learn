/**
 * 描述:日志工具
 * 作者:chenbin  创建日期:2020年12月18日
 */
class Logger {
    /**
     *日志上报
     *
     * @static
     * @param {*} 事件ID
     * @param {*} 页面ID
     * @param {*} clickid
     * @param {*} 事件名称
     * @memberof Logger
     */
    public static report(pageuid, clickid, eventname) {
        console.log("Logger: " + eventname + ", PageUID:" + pageuid + ", ClickID:" + clickid);
        var logData = {
            'elem': document.body,
            'params': {
                'eventid': "year_review",
                'pageuid': pageuid,
                'clickid': clickid,
                'eventname': eventname,
                'usertype': GlobalData.UserIsOldPlayer,
                'shareid': GlobalData.ShareIDGiveMe,
                'sourceid': GlobalData.SourceId
            }
        };
        logger.clickMsg(logData);
    }
}