namespace Core {

    export interface IUIBase extends egret.DisplayObject {
        init();
        update(deltaTime?: number);
        onPause();
        onResume();
        addListener();
        removeListener();
        dispose();
    }

    /** 
     * 场景
     */
    export class BaseScene extends eui.Component implements IUIBase {

        // 是否初始化完成
        public _isInitCompleted: boolean = false;

        public constructor() {
            super();

            this.width = Core.StageWidth;
            this.height = Core.StageHeight;
        }

        public init() { }

        public update(deltaTime?: number) { }

        public onPause() { }

        public onResume() { }

        public addListener() { }

        public removeListener() { }

        public dispose() { }

    }


    /** 
     * 窗口基类
     */
    export class BaseWindow extends eui.Component implements IUIBase {

        // 初始化完成
        public _isInitCompleted: boolean = false;

        public constructor() {
            super();

            this.width = Core.WindowContainer.width;
            this.height = Core.WindowContainer.height;
        }

        public init() { }

        public update(deltaTime?: number) { }

        public onPause() { }

        public onResume() { }

        public addListener() { }

        public removeListener() { }

        public dispose() { }

    }


    /**
     * 弹出窗口基类
     */
    export class BasePopup extends eui.Component implements IUIBase {

        // 初始化完成
        public _isInitCompleted: boolean = false;

        public showPopAnime: boolean = true;

        public constructor() {
            super();
        }

        public init() { }

        public update(deltaTime?: number) { }

        public onPause() { }

        public onResume() { }

        public addListener() { }

        public removeListener() { }

        public dispose() { }

    }

}