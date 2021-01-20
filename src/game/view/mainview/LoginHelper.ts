class LoginHelper {

    private static _instance: LoginHelper;
    public static get Instance(): LoginHelper {
        if (this._instance == null) {
            this._instance = new LoginHelper();
        }
        return this._instance;
    }

    /** 登录 */
    public StartLogin(callback?: Core.CoreFunction) {
        // 本地有登录态
        if (GlobalData.UserIsLogin) {

            callback && callback.Call();
        }
        // 本地没有登录态
        else {
            Utils.ToLogin(new Core.CoreFunction(() => {

                GlobalData.UserIsLogin = true;

                Logger.report("0", "30001", "登录弹窗");

                callback && callback.Call();
            }, this));
        }
    }

    /** 开始请求接口 */
    public RequestHomepageServer(callback?: Core.CoreFunction) {
        // 请求首页数据
        Core.EventManager.AddEvent(ApiLists.locus_index_s2c, (data: locus_index_s2c) => {
            if (data.code != 0) {
                console.error(data.msg);
            }
            GlobalData.IsRequestHomepageAPI = true;
            GlobalData.UserIsOldPlayer = data.data.is_old_user == 1 ? true : false;
            GlobalData.UserIsReviewed = data.data.has_join == 1 ? true : false;

            callback && callback.Call();

        }, this, true);
        Core.MessageFactoryInstance.locus_index_c2s(GlobalData.ShareIDGiveMe ? { share_id: GlobalData.ShareIDGiveMe } : {});


        // 请求用户绑定的学校信息
        Core.EventManager.AddEvent(ApiLists.get_school_status_s2c, (data: get_school_status_s2c) => {
            if (data.code != 0) {
                console.error(data.msg);
                return;
            }

            GlobalData.UserIsJoinSchool = data.data.is_bind;
            if (GlobalData.UserIsJoinSchool) {
                GlobalData.UserSchoolInfo.label = data.data.name;
                GlobalData.UserSchoolInfo.value = data.data.school_id;

                GlobalData.UserSchoolInfo = { label: data.data.name, value: data.data.school_id };
            }
        }, this, true);
        Core.MessageFactoryInstance.get_school_status_c2s({});


        // 请求二维码
        if (!GlobalData.AppQrCodeUrl) {
            Core.EventManager.AddEvent(ApiLists.load_qrCode_s2c, (data: load_qrCode_s2c) => {
                if (data.code != 0) {
                    console.error(data.msg);
                    return;
                }
                GlobalData.AppQrCodeUrl = data.data.url;
            }, this, true);
            Core.MessageFactoryInstance.load_qrCode_c2s({ xeswx_sourceid: GlobalData.SourceId });
        }
    }


    /** 场景跳转逻辑 */
    public SceneChangeLogic(callback?: Core.CoreFunction) {
        // 老用户 - 跳转至 年终数据展示页
        if (GlobalData.UserIsOldPlayer) {

            

            callback && callback.Call();
        }
        // 新用户 - 跳转至 Flag选择页 / Flag展示页
        else {
            // Flag展示页
            if (GlobalData.UserIsReviewed) {

            }
            // Flag选择页
            else {

            }

            callback && callback.Call();
        }
    }

}