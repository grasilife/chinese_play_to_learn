class GlobalData {

    // 用户昵称
    public static UserName: string = '大大小小黑';
    public static UserHeadImgUrl: string = 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=387639067,1599589691&fm=26&gp=0.jpg';
    public static UserHeadImgTexture: egret.Texture;
    public static UserHeadImgUrlBase64: string = '';

    // 本地是否有登录态 (window["vueObj"].isLogin)
    public static UserIsLogin: boolean = false;

    // 用户学校信息
    public static UserSchoolInfo: { ['label']: string, ['value']: number } = { label: '暂无您的学校', value: 0 };
    /** 当前选择的学校信息 */
    public static CurrentSelectSchoolInfo: { ['school_name']: string, ['school_id']: number } = { school_name: '暂无您的学校', school_id: 0 };

    // 是否是老用户
    public static UserIsOldPlayer: boolean = false;

    // 是否点亮过轨迹
    public static UserIsReviewed: boolean = false;

    // 是否加入了校友星系
    public static UserIsJoinSchool: boolean = false;

    // 新用户选择的Flag的详情信息
    public static NewPlayerFlagDetail: flag_detail;

    // App的分享二维码
    public static AppQrCodeUrl: string;

    // 分享者的ID
    public static ShareIDGiveMe: string = "";

    // 热点ID
    public static SourceId: string = "";

    // 访问主页是否需要执行过场动画
    public static IsDoChangeAnimation: boolean = true;

    // 是否请求过首页相关接口
    public static IsRequestHomepageAPI: boolean = false;

}