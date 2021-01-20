/**
 * 消息处理工厂
 * coded by wangshengwe1@tal.com 2020/11/23
 */
namespace Core {
    export class MessageFactory {
        private static _instance;
        public static get instance(): MessageFactory {
            if (this._instance == null)
                this._instance = new MessageFactory();
            return this._instance;
        }
        // private baseUrl: string = 'http://yapi.xesv5.com/mock/530/';
        private baseUrl: string = 'https://api.xueersi.com/scorpioapi/';

        /**
         * ajax请求,
         * todo 不要密集型请求,可能会有问题
         * @api 接口名称
         * @param url 链接
         * @param params 参数
         */
        ajax(api, url: string, params, type = 'get') {
            if (type.toLowerCase() === 'get') {
                Core.NetManagerInstance.get(this.baseUrl + url, params, (event: egret.Event) => {
                    const request = <egret.HttpRequest>event.currentTarget;
                    const data = JSON.parse(request.response);
                    if (data.code !== 0 && data.code !== 20601) {
                        // App.MessageCenter.dispatch(SceneList.ERROR_MESSAGE, data);

                        // UI显示网络错误
                    } else {
                        Core.EventManager.RunEvent(api.replace('_c2s', '_s2c'), data);
                    }

                }, this)
            } else if (type.toLowerCase() === 'post') {
                Core.NetManagerInstance.post(this.baseUrl + url, JSON.stringify(params), (event: egret.Event) => {
                    const request = <egret.HttpRequest>event.currentTarget;
                    const data = JSON.parse(request.response);
                    if (data.code !== 0 && data.code !== 20601) {
                        // App.MessageCenter.dispatch(SceneList.ERROR_MESSAGE, data)

                        // UI显示网络错误
                    } else {
                        Core.EventManager.RunEvent(api.replace('_c2s', '_s2c'), data);
                    }
                }, this)
            }
        }


        public locus_index_c2s(params: locus_index_c2s) {
            this.ajax('locus_index_c2s', 'locus/index', params, 'get');
        }

        public flag_list_c2s(params: flag_list_c2s) {
            this.ajax('flag_list_c2s', 'flag/list', params, 'get');
        }

        public school_bind_c2s(params: school_bind_c2s) {
            this.ajax('school_bind_c2s', 'school/bind', params, 'post');
        }

        public school_top_c2s(params: school_top_c2s) {
            this.ajax('school_top_c2s', 'school/top', params, 'get');
        }

        public school_select_c2s(params: school_select_c2s) {
            this.ajax('school_select_c2s', 'school/select', params, 'get');
        }

        public locus_shape_c2s(params: locus_shape_c2s) {
            this.ajax('locus_shape_c2s', 'locus/userShape', params, 'get');
        }

        public locus_edit_c2s(params: locus_edit_c2s) {
            this.ajax('locus_edit_c2s', 'locus/edit', params, 'post');
        }

        public school_user_c2s(params: school_user_c2s) {
            this.ajax('school_user_c2s', 'school/user', params, 'get');
        }

        public flag_detail_c2s(params: flag_detail_c2s) {
            this.ajax('flag_detail_c2s', 'flag/detail', params, 'get');
        }

        public update_Flag_c2s(params: update_Flag_c2s) {
            this.ajax('update_Flag_c2s', 'flag/edit', params, 'post');
        }

        public message_schoolMessageList_c2s(params: message_schoolMessageList_c2s) {
            this.ajax('message_schoolMessageList_c2s', 'message/schoolMessageList', params, 'get');
        }

        public message_addSchoolMessage_c2s(params: message_addSchoolMessage_c2s) {
            this.ajax('message_addSchoolMessage_c2s', 'message/addSchoolMessage', params, 'post');
        }

        public school_bindStatus_c2s(params: school_bindStatus_c2s) {
            this.ajax('school_bindStatus_c2s', 'school/bindStatus', params, 'get');

        }

        public upload_file_c2s(params: upload_file_c2s) {
            this.ajax('upload_file_c2s', 'upload/simple', params, 'post');
        }

        public load_qrCode_c2s(params: load_qrCode_c2s) {
            this.ajax('load_qrCode_c2s', 'locus/qrCode', params, 'post');
        }

        public get_school_status_c2s(params: get_school_status_c2s) {
            this.ajax('get_school_status_c2s', 'school/bindStatus', params, 'get');
        }

        public school_loginUser_c2s(params: school_loginUser_c2s) {
            this.ajax('school_loginUser_c2s', 'school/loginUser', params, 'get');
        }

        public school_loginTop_c2s(params: school_loginTop_c2s) {
            this.ajax('school_loginTop_c2s', 'school/loginTop', params, 'get');
        }

        public locus_Login_shape_c2s(params: locus_Login_shape_c2s) {
            this.ajax('locus_Login_shape_c2s', 'locus/loginUserShape', params, 'get');
        }
    }
}
