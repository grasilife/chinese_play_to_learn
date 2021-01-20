class GroundItem extends eui.Component {
    private groundData;
    private groundImg: eui.Image;
    private plantImg: eui.Image;
    private tipImg: eui.Image;
    private openBtn: eui.Image;
    public constructor(data) {
        super();
        this.groundData = data;
        this.skinName = egret.getQualifiedClassName(this) + 'Skin';
        this.init();
        this.addListener();
    }

    public init() {
        //当前土地是否扩建
        if (this.groundData.isOpen) {
            this.groundImg.source = "hui-tudi_png";
            //当前已扩建土地是否种植植物
            if (this.groundData.isPlant) {
                this.getPlantTypeOrPlantLevel(this.groundData.type, this.groundData.level);
            }
        } else {
            this.openBtn.visible = true;
            // this.openBtn.source = "btn_kuojian1_png"
            this.groundImg.source = "lv-tudi_png";
        }

    }

    public getPlantTypeOrPlantLevel(type, level) {
        this.plantImg.source = "pic_" + type + "_" + level + "_png"
    }

    public openTipDialog() {
        let tipDialog = new TipDialog(this);
        Core.openWindow(tipDialog, true);
    }

    public addListener() {
        this.openBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openTipDialog, this)
        console.log("TabItem - addListener");
    }

    public removeListener() {
        this.openBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openTipDialog, this)
        console.log("TabItem - removeListener");
    }

    public dispose() {
        this.removeListener();
        console.log("TabItem - dispose");
    }

}