/** 
 * 描述: Loading弹窗
 * 作者:Evan  创建日期:
 */
namespace Core {

    export class LoadingOverlay extends egret.DisplayObjectContainer {

        private static _instance: LoadingOverlay;
        public static get Instance(): LoadingOverlay {
            if (this._instance == null) {
                this._instance = new LoadingOverlay();
            }
            return this._instance;
        }

        // Loading容器
        private LoadingBase: egret.DisplayObjectContainer;

        // Loading背景
        private LoadingBG: egret.Shape;

        // Loading Icon
        private LoadingIcon: egret.Bitmap;

        // 是否在现实中
        private IsShowing: boolean = false;

        // LoadingID
        private LoadingID: number;

        // Loading超时事件
        private LoadingTimeoutSecond: number = 10;

        public constructor() {
            super();

            this.CreateLoadngOverlay();
        }

        /** 显示Loading */
        public Show(timeoutCall?: Core.CoreFunction): boolean {
            if (this.IsShowing) {
                return false;
            }
            this.IsShowing = true;

            this.addEventListener(egret.Event.ENTER_FRAME, this.OnLoadingEnterFrame, this);

            this.LoadingBase.visible = true;

            this.LoadingID = setTimeout(function () {
                clearTimeout(this.LoadingID);
                timeoutCall && timeoutCall.Call();
                LoadingOverlay.Instance.Hide();
            }, this.LoadingTimeoutSecond * 1000)

            return true;
        }

        /** 隐藏Loading */
        public Hide() {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.OnLoadingEnterFrame, this);
            clearTimeout(this.LoadingID);

            this.IsShowing = false;
            this.LoadingBase.visible = false;
        }

        private OnLoadingEnterFrame() {
            if (this.IsShowing) {
                this.LoadingIcon.rotation += 13;
            }
        }

        /** 创建Laoding界面 */
        private CreateLoadngOverlay() {
            this.LoadingBase = new egret.DisplayObjectContainer();
            this.addChild(this.LoadingBase);

            this.LoadingBG = new egret.Shape();
            this.LoadingBG.graphics.beginFill(0x000000, 0.3);
            this.LoadingBG.graphics.drawRect(0, 0, Core.StageWidth, Core.StageHeight);
            this.LoadingBG.graphics.endFill();
            this.LoadingBase.addChild(this.LoadingBG);

            this.LoadingIcon = new egret.Bitmap();
            this.LoadingIcon.texture = RES.getRes("LoadingIcon_png");
            this.LoadingIcon.width = this.LoadingIcon.height = Core.StageWidth * 0.07;
            this.LoadingIcon.anchorOffsetX = this.LoadingIcon.width / 2;
            this.LoadingIcon.anchorOffsetY = this.LoadingIcon.height / 2;
            this.LoadingIcon.x = Core.StageWidth / 2;
            this.LoadingIcon.y = Core.StageHeight / 2;
            this.LoadingBase.addChild(this.LoadingIcon);

            this.LoadingBase.touchEnabled = true;

            this.Hide();

            Core.StageEgret.addChild(this);
        }

    }

}
