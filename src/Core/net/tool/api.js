/**
 * 接口列表
 * todo 后期优化(需要与服务端协商,每个接口都要有一个msgId, 便于消息的统一分发)
 * APi接口文档: http://yapi.xesv5.com/project/530/interface/api
 */
module.exports = {

    /** flag列表 */
    flag_list_c2s: {
        url: 'flag/list',
        type: 'get'
    },
    flag_list_s2c: {
        stat: '?number',
        code: '?number',
        msg: '?string',
        data: '?flagDataItem[]'
    },
    flagDataItem: {
        id: '?string',
        name: '?string'
    },
    /** 活动首页接口 */
    locus_index_c2s: {
        url: 'locus/index',
        type: 'get',
        share_id: '?string'
    },
    locus_index_s2c: {
        stat: '?string',
        code: '?number',
        msg: '?string',
        data: 'locus_index_data'
    },
    locus_index_data: {
        is_old_user: 'number',
        has_join: 'number'
    },

    /** 绑定用户与学校 */
    school_bind_c2s: {
        url: 'school/bind',
        type: 'post',
        school_name: 'string',
        school_id: '?number'
    },
    school_bind_s2c: {
        stat: '?string',
        code: '?number',
        msg: '?string',
        data: '?string'
    },

    /** 学校绑定人数排行榜 */
    school_top_c2s: {
        url: 'school/top',
        type: 'get',
        page_size: 'number',
        self_school: 'boolean'
    },
    school_top_s2c: {
        stat: '?string',
        code: '?number',
        msg: '?string',
        data: '?school_top_school'
    },
    school_top_school: {
        school: 'school_top_school_data[]'
    },
    school_top_school_data: {
        school_id: 'number',
        name: 'string',
        user_count: 'number'
    },
    /** 登录状态活动用户轨迹信息 **/
    locus_Login_shape_c2s: {
        url: 'locus/loginUserShape',
        type: 'get'
    },
    locus_Login_shape_s2c: {
        stat: '?string',
        code: '?number',
        msg: '?string',
        data: '?user_shape_data'
    },
    /** 活动用户轨迹信息 **/
    locus_shape_c2s: {
        url: 'locus/userShape',
        type: 'get',
        user_id: '?number'
    },
    locus_shape_s2c: {
        stat: '?string',
        code: '?number',
        msg: '?string',
        data: '?user_shape_data'
    },
    user_shape_data: {
        shape_items: 'shape_item[]',
        locus_wz_id: 'string',
        star_tag: 'string',
        super_star: 'string',
        inspire_words: 'string',
        user_reffer: 'string',
        nickname: 'string',
        profile: 'string'
    },
    shape_item: {
        wn: 'string',
        sl: 'number',
        super_star: 'string'
    },

    /** 学校下拉框 */
    school_select_c2s: {
        url: 'school/select',
        type: 'get',
        area_id: 'number',
        name: '?string'
    },
    school_select_s2c: {
        stat: '?string',
        code: '?number',
        msg: '?string',
        data: '?school_select_data[]'
    },
    school_select_data: {
        value: 'number',
        label: 'string'
    },

    /** 编辑用户信息 */

    locus_edit_c2s: {
        url: 'locus/edit',
        type: 'post',
        nickname: 'string',
        profile: 'string'
    },
    locus_edit_s2c: {
        stat: '?string',
        code: '?number',
        msg: '?string',
        data: '?string'
    },
    /** 提交Flag **/
    update_Flag_c2s: {
        url: 'flag/edit',
        type: 'post',
        flag_id: 'string',
    },
    update_Flag_s2c: {
        stat: '?string',
        code: '?number',
        msg: '?string',
        data: '?string'
    },
    /** 当前学校用户的轨迹 */
    school_user_c2s: {
        url: 'school/user',
        type: 'get',
        page_size: 'number',
        school_id: 'number'
    },
    school_user_s2c: {
        stat: '?string',
        code: '?number',
        msg: '?string',
        data: '?school_user_user'
    },
    school_user_user: {
        user: '?school_user_user_data[]'
    },
    school_user_user_data: {
        user_id: 'number',
        profile: 'string',
        star_id: 'string',
        is_login: 'boolean',
        nickname: 'string',
        // 用户类型1新用户2老用户
        user_type: 'number',
        flag_s_pic: 'string',
        flag_font_pic: 'string'
    },

    /** 获取Flag详情 **/

    flag_detail_c2s: {
        url: 'flag/detail',
        type: 'get',

    },
    flag_detail_s2c: {
        stat: '?string',
        code: '?number',
        msg: '?string',
        data: '?flag_detail'
    },
    flag_detail: {
        flag_s_pic: 'string',
        flag_b_pic_id: 'number',
        flag_font: 'string',
        flag_font_pic: 'string',
        nickname: 'string',
        banner_pic: 'string',
        banner_ad: 'string',
        user_reffer: 'string',
        profile: 'string',
    },

    /** 学校留言列表 */
    message_schoolMessageList_c2s: {
        url: 'message/schoolMessageList',
        type: 'get',
        school_id: 'number'
    },
    message_schoolMessageList_s2c: {
        stat: '?string',
        code: '?number',
        msg: '?string',
        data: '?message_schoolMessageList_messageList'
    },
    message_schoolMessageList_messageList: {
        messageList: '?message_schoolMessageList_messageList_data[]'
    },
    message_schoolMessageList_messageList_data: {
        nick_name: 'string',
        headicon: 'string',
        message: 'string',

    },

    /** 添加留言 */
    message_addSchoolMessage_c2s: {
        url: 'message/addSchoolMessage',
        type: 'post',
        school_id: 'number',
        message: 'string'
    },
    message_addSchoolMessage_s2c: {
        stat: '?string',
        code: '?number',
        msg: '?string',
        data: '?message_addSchoolMessage_result'
    },
    message_addSchoolMessage_result: {
        result: '?boolean'
    },

    /** 当前用户的学校绑定状态 */
    school_bindStatus_c2s: {
        url: 'school/bindStatus',
        type: 'get'
    },
    school_bindStatus_s2c: {
        stat: '?string',
        code: '?number',
        msg: '?string',
        data: '?school_bindStatus_data'
    },
    school_bindStatus_data: {
        is_bind: 'boolean',
        name: 'string',
        school_id: 'number',
        user_count: 'number',
        rank: 'string'
    },
    /** 上传图片 **/
    upload_file_c2s: {
        url: 'upload/simple',
        type: 'post',
        file_base_64: 'string'
    },
    upload_file_s2c: {
        stat: '?string',
        code: '?number',
        msg: '?string',
        data: '?file_url'
    },
    file_url: {
        url: 'string'
    },
    /** 获取二维码 **/
    load_qrCode_c2s: {
        url: 'locus/qrCode',
        type: 'post',
        xeswx_sourceid: 'string'
    },
    load_qrCode_s2c: {
        stat: '?string',
        code: '?number',
        msg: '?string',
        data: '?qrCode_url'
    },
    qrCode_url: {
        url: 'string'
    },
    /** 获取用户绑定的学校信息 **/
    get_school_status_c2s: {
        url: 'school/bindStatus',
        type: 'get'
    },
    get_school_status_s2c: {
        stat: '?string',
        code: '?number',
        msg: '?string',
        data: '?school_status'
    },
    school_status: {
        is_bind: 'boolean',
        name: 'string',
        school_id: 'number',
        user_count: 'number',
        rank: 'string',
    },

    /** (登录)用户所属学校用户轨迹  */
    school_loginUser_c2s: {
        url: 'school/loginUser',
        type: 'get',
        page_size: 'number',
        school_id: '?number'
    },
    school_loginUser_s2c: {
        stat: '?string',
        code: '?number',
        msg: '?string',
        data: '?school_user_user'
    },

    /** 学校绑定人数排行榜(登录) */
    school_loginTop_c2s: {
        url: 'school/loginTop',
        type: 'get',
        page_size: 'number',
        self_school: 'boolean'
    },
    school_loginTop_s2c: {
        stat: '?string',
        code: '?number',
        msg: '?string',
        data: '?school_top_school'
    }
}
