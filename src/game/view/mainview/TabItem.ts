class TabItem extends eui.Component {

    public tabIcon: eui.Image;
    public tabName: eui.Label;
    public tabData;

    public constructor(data) {
        super();
        this.tabData = data;
        this.skinName = egret.getQualifiedClassName(this) + 'Skin';
        this.init();
        this.addListener();
    }

    public init() {
        this.tabIcon.source = this.tabData.tabIcon;
        this.tabName.text = this.tabData.tabName;
    }

    public addListener() {
        console.log("TabItem - addListener");
    }

    public removeListener() {
        console.log("TabItem - removeListener");
    }

    public dispose() {
        this.removeListener();
        console.log("TabItem - dispose");
    }

}