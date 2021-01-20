class TipDialog extends Core.BaseWindow {

    public UIBase: eui.Group;

    public GoBtn: eui.Image;

    public closeBtn: eui.Image;

    public confirmBtn: eui.Image;

    public cancelBtn: eui.Image;

    public groundItemData;


    public constructor(data) {
        super();
        this.groundItemData = data;
        this.skinName = egret.getQualifiedClassName(this) + 'Skin';
    }

    public display() { }

    public update(deltaTime?: number) { }


    private OnClickConfirm() {
        console.log(this.groundItemData)
        this.groundItemData.groundImg.source = "hui-tudi_png";
        this.groundItemData.openBtn.visible = false;
        Core.closeWindow(this);
    }

    private OnClickClose() {
        Core.closeWindow(this);
    }

    public addListener() {
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnClickConfirm, this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnClickClose, this);
        this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnClickClose, this);
    }

    public removeListener() {
        this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.OnClickConfirm, this);
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.OnClickClose, this);
        this.cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.OnClickClose, this);
    }

    public dispose() {

    }
}