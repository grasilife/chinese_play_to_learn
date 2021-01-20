class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {

    private _loadingBG: egret.Bitmap;
    private _loadingIcon: egret.Bitmap;

    // private _loadingView: egret.Shape;

    public constructor() {
        super();
        this.createView();
    }

    private createView(): void {

        // // 背景
        // this._loadingBG = new egret.Bitmap();
        // this._loadingBG.texture = RES.getRes("LoadingBG_jpg");

        // // this._loadingBG.width = Core.StageWidth;
        // // this._loadingBG.height = Core.StageHeight;
        // this._loadingBG.y = Core.StageHeight - this._loadingBG.height;
        // this.addChild(this._loadingBG);

        // 游戏名
        this._loadingIcon = new egret.Bitmap();
        this._loadingIcon.texture = RES.getRes("xing_png");
        this._loadingIcon.width = this._loadingIcon.height = Core.StageWidth * 0.07;
        this._loadingIcon.anchorOffsetX = this._loadingIcon.width / 2;
        this._loadingIcon.anchorOffsetY = this._loadingIcon.height / 2;
        this._loadingIcon.x = Core.StageWidth / 2;
        this._loadingIcon.y = Core.StageHeight * 0.9;
        this.addChild(this._loadingIcon);

        // 进度条
        // this._loadingView = new egret.Shape();
        // // this.addChild(this._loadingView);
        // this._loadingView.x = Core.StageWidth / 2 - (Core.StageWidth * 0.7) / 2;
        // this._loadingView.y = Core.StageHeight * 0.8;

        this.addEventListener(egret.Event.ENTER_FRAME, this.OnEnterFrame, this);
    }

    public onProgress(current: number, total: number): void {

        let progress = Math.floor(100 * current / total);

        // 开始绘制
        // this._loadingView.graphics.clear();
        // this._loadingView.graphics.lineStyle(2, 0x000000);
        // this._loadingView.graphics.beginFill(0xfff5ce, 1);
        // this._loadingView.graphics.drawRoundRect(0, 0, (Core.StageWidth * 0.7) * progress / 100, 20, 20, 20);
        // this._loadingView.graphics.endFill();
    }

    private OnEnterFrame() {
        this._loadingIcon.rotation += 10;
    }

    public Dispose() {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.OnEnterFrame, this);
        // this._loadingView = null;
    }

}
