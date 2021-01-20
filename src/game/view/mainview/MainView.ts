class MainView extends Core.BaseScene {

    public BGBase: eui.Group;
    public UIBase: eui.Group;
    public ContentBase: eui.Group;
    public tabRightContent: eui.Group;
    public groundContent: eui.Group;
    public tabRightBtn: eui.Button;
    public yunImg: eui.Image;
    public XJDbEffect: DbAnimation;
    public isShowRightMenu: boolean = false;
    public isMenuAniComplate: boolean = false;

    public testMc;

    public constructor() {
        super();

        this.skinName = egret.getQualifiedClassName(this) + 'Skin';
    }

    public init() {
        //右侧Tab数据
        const tabData: Array<any> = [{
            "tabIcon": "phb_png",
            "tabName": "排行榜"
        }, {
            "tabIcon": "hy_png",
            "tabName": "好友"
        }, {
            "tabIcon": "wb_png",
            "tabName": "玩伴"
        }, {
            "tabIcon": "xx_png",
            "tabName": "消息"
        }]

        //土地数据
        const groundData: Array<any> = [{
            "groundX": 201,
            "groundY": 0,
            "isOpen": true,
            "isPlant": true,
            "type": 1,
            "level": 4
        }, {
            "groundX": 100,
            "groundY": 49,
            "isOpen": true,
            "isPlant": true,
            "type": 2,
            "level": 1
        }, {
            "groundX": 1,
            "groundY": 99,
            "isOpen": true,
            "isPlant": true,
            "type": 3,
            "level": 2
        }, {
            "groundX": 302,
            "groundY": 48,
            "isOpen": false,
            "isPlant": false,
            "type": null,
            "level": null
        }, {
            "groundX": 205,
            "groundY": 95,
            "isOpen": false,
            "isPlant": false,
            "type": null,
            "level": null
        }, {
            "groundX": 105,
            "groundY": 145,
            "isOpen": false,
            "isPlant": false,
            "type": null,
            "level": null
        }, {
            "groundX": 400,
            "groundY": 99,
            "isOpen": false,
            "isPlant": false,
            "type": null,
            "level": null
        }, {
            "groundX": 305,
            "groundY": 145,
            "isOpen": false,
            "isPlant": false,
            "type": null,
            "level": null
        }, {
            "groundX": 201,
            "groundY": 190,
            "isOpen": false,
            "isPlant": false,
            "type": null,
            "level": null
        }]

        //创建右侧Tab
        tabData.forEach((element, index) => {
            let tabitem = new TabItem(element);
            tabitem.anchorOffsetX = tabitem.width / 2;
            tabitem.anchorOffsetY = tabitem.height / 2;
            tabitem.x = tabitem.width / 2;
            tabitem.y = index * 122;
            this.tabRightContent.addChild(tabitem);
        });

        //创建小鸡吃米
        if (!this.XJDbEffect) {
            this.XJDbEffect = Core.EffectManager.getDbEffect("xiaoji", 'Armature');
            this.XJDbEffect.bindTo(this.ContentBase);
        }
        this.XJDbEffect.db.scaleX = this.XJDbEffect.db.scaleY = 0.4;
        this.XJDbEffect.db.x = 700;
        // this.XJDbEffect.db.y = 1400;
        this.XJDbEffect && this.XJDbEffect.play('ji_chimi');

        //创建土地
        groundData.forEach(item => {
            let groundItem = new GroundItem(item);
            groundItem.x = item.groundX;
            groundItem.y = item.groundY;
            this.groundContent.addChild(groundItem);
        });


        //测试序列帧
        this.testMc = Core.EffectManager.getMcEffect("test_mc");
        this.testMc.bindTo(this.ContentBase);
        this.testMc.x = 0;
        this.testMc.y = 150;
        this.testMc.play(0, 1).then(() => {
            alert("播放完毕")
        })

        // 设置滤镜
        // var BGMatrix = [
        //     0.3, 1, 0, 0, 0,
        //     0.3, 0.4, 0, 0, 0,
        //     0.3, 0.4, 0, 0, 0,
        //     0, 0, 0, 1, 0
        // ];
        // var BGFlilter = new egret.ColorMatrixFilter(BGMatrix);
        // this.BGBase.filters = [BGFlilter];
        // // 设置填充色
        this.UIBase.tint = 0x778899;


        /**
         * 创建粒子效果
         */
        //获取纹理
        var texture = RES.getRes("newParticle_png");
        //获取配置
        var config = RES.getRes("newParticle_json");
        //创建 GravityParticleSystem
        let system = new particle.GravityParticleSystem(texture, config);
        //启动粒子库
        system.start();
        //将例子系统添加到舞台
        this.ContentBase.addChild(system);

        // this.BGBase.tint = 0x4169E1

        //右侧Tab垂直布局
        // let vLayout: eui.VerticalLayout = new eui.VerticalLayout();
        // vLayout.gap = 5;
        // vLayout.paddingTop = 0;
        // vLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        // this.tabRightContent.layout = vLayout;

        //添加云动画
        egret.Tween.get(this.yunImg, {
            //设置循环播放
            loop: true,
        })
            .to({ x: 760 }, 50000)
    }

    public addListener() {
        //添加UIBase居底部适配
        Core.AdaptiveManager.setObject(this.UIBase).bottom.equalTo(Core.StageEgret).bottom.offset(0);
        Core.AdaptiveManager.setObject(this.XJDbEffect.db).bottom.equalTo(this.UIBase).bottom.offset(0);
        Core.AdaptiveManager.setObject(this.groundContent).bottom.equalTo(this.UIBase).bottom.offset(40);
        this.tabRightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showOrHideRightMenu, this);
        console.log("MainView - addListener");
    }

    public removeListener() {
        //移除UIBase居底部适配
        Core.AdaptiveManager.removeObject(this.UIBase);
        Core.AdaptiveManager.removeObject(this.groundContent);
        this.tabRightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showOrHideRightMenu, this);
        console.log("MainView - removeListener");
    }

    /**
     * 显示右侧Tab菜单
     */
    private showOrHideRightMenu() {
        console.log(this.isShowRightMenu)
        if (!this.isMenuAniComplate) {

            this.isMenuAniComplate = true;

            if (!this.isShowRightMenu) {

                //添加Tab抽屉打开动画
                egret.Tween.get(this.tabRightContent, {
                    //设置循环播放
                    loop: false,
                })
                    .to({ x: 635 }, 300, egret.Ease.cubicInOut)
                    .call(() => {
                        this.isShowRightMenu = true;
                        this.isMenuAniComplate = false;
                    }, this);//设置回调函数及作用域，可用于侦听动画完成

                // //添加TabItem旋转动画
                for (let index = 0; index < this.tabRightContent.$children.length; index++) {

                    let element = this.tabRightContent.$children[index];
                    console.log(element)
                    egret.Tween.get(element, {
                        //设置循环播放
                        loop: false,
                    })
                        .to({ rotation: 360 }, 230)
                }

            } else {

                //添加Tab抽屉关闭动画
                egret.Tween.get(this.tabRightContent, {
                    loop: false,//设置循环播放
                })
                    .to({ x: 750 }, 250, egret.Ease.cubicIn)
                    .call(() => {
                        this.isShowRightMenu = false;
                        this.isMenuAniComplate = false;
                    }, this);//设置回调函数及作用域，可用于侦听动画完成
            }
        }

    }

    private CloseThisScene() {
        Core.closeScene(this);

    }

    public dispose() {
        console.log("HomePageView - dispose");
    }

}