class TestPopup extends Core.BasePopup {


    public UIBase: eui.Group;

    public CloseBtn: eui.Image;


    public constructor() {
        super();

        this.skinName = egret.getQualifiedClassName(this) + 'Skin';
    }

    public display() {
        this.y = Core.StageHeight - this.height;
    }

    public update(deltaTime?: number) { }


    private OnClickClose() {
        Core.closePopup(this, true);
    }

    public addListener() {
        this.CloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnClickClose, this);
    }

    public removeListener() {
        this.CloseBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.OnClickClose, this);
    }

    public dispose() {

    }
}