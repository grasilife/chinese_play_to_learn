class Main extends eui.UILayer {

    private _lastTime: number;

    private _loadingUI: LoadingUI;

    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {

            context.onUpdate = () => {
                let cureTime: number = egret.getTimer();
                let deltaTime: number = cureTime - this._lastTime;
                this._lastTime = cureTime;

                if (Core.checkGgValid()) {
                    Core._instance.__update(deltaTime);
                }
            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();

            if (Core.checkGgValid()) {
                Core._instance.__onPause();
            }
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();

            if (Core.checkGgValid()) {
                Core._instance.__onResume();
            }
        }

        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {

        // FIXED_WIDTH
        this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
        // 竖屏
        this.stage.orientation = egret.OrientationMode.PORTRAIT;

        Core.StageWidth = this.stage.stageWidth;
        Core.StageHeight = this.stage.stageHeight;

        await this.loadResource()
        this.createGameScene();
    }

    private async loadResource() {
        try {
            await RES.loadConfig("resource/default.res.json", "resource/");
            // await RES.loadGroup("loading");

            this._loadingUI = new LoadingUI();
            this.stage.addChild(this._loadingUI);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);

            await this.loadTheme();
            await RES.loadGroup("preload", 0, this._loadingUI);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        }
        catch (e) {
            console.error(e);
        }
    }
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this._loadingUI.onProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);
        })
    }

    /**
     * 创建场景界面
     */
    protected async createGameScene() {

        // 初始化项目
        Core.initCoreRoot(this);
        console.log("屏幕宽高:", Core.StageWidth, Core.StageHeight);

        // 检测本地登录态
        if (window["vueObj"] && window["vueObj"].isLogin) {
            GlobalData.UserIsLogin = true;
        }
        else {
            GlobalData.UserIsLogin = false;
        }

        // 主页
        let mainview = new MainView();
        Core.openScene(mainview);

        // 唤起端内分享组件
        // if (!Share.isApp()) {
        //     Core.NetManagerInstance.post('https://weixin.xueersi.com/Share/conf', {}, (event: egret.Event) => {
        //         const request = <egret.HttpRequest>event.currentTarget;
        //         const data = JSON.parse(request.response);
        //         // console.log("唤起端内分享组件", data);
        //         Share.wxShareConfig(data.msg);
        //     }, this);
        // }

        // 清空LoadingUI
        this.RemoveLoadingUI();

        // 埋点 - 热点链接
        // if (window.location.href.indexOf("xeswx_sourceid") != -1) {
        //     GlobalData.SourceId = Utils.GetParamByUrl("xeswx_sourceid");
        //     console.log("热点链接", GlobalData.SourceId);
        // }
        // // 埋点 - 回流用户 Ps:https://activity.xueersi.com/topic/growth/yearreview/?share_id=123456
        // if (window.location.href.indexOf("share_id") != -1) {
        //     GlobalData.ShareIDGiveMe = Utils.GetParamByUrl("share_id");

        //     Logger.report("0", "10003", "回流用户");
        // }

    }

    /** 清空LoadingUI */
    private RemoveLoadingUI() {
        this._loadingUI && this._loadingUI["Dispose"] && this._loadingUI.Dispose();
        this.stage.removeChild(this._loadingUI);
        this._loadingUI = null;
    }

}
