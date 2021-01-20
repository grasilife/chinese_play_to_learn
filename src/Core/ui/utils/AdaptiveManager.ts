namespace Core {

    export class AdaptiveManager {

        private static _eventID: number;
        /** 存放所有组件的约束对象 */
        private static AdaptivePool = {};
        /** 加入一个约束对象 */
        public static setObject(obj: egret.DisplayObject): AdaptiveManager {
            let adaptive = this.AdaptivePool[obj.$hashCode];
            if (!adaptive) {
                adaptive = new this(obj);
                this.AdaptivePool[obj.$hashCode] = adaptive;
            }
            return adaptive;
        }
        /** 移除一个约束 */
        public static removeObject(obj: egret.DisplayObject) {
            let adaptive = this.AdaptivePool[obj.$hashCode];
            if (adaptive) {
                // App.MessageCenter.removeListener(egret.Event.RESIZE, adaptive.onResize, adaptive);
                Core.EventManager.ClearEvent(egret.Event.RESIZE);
                delete this.AdaptivePool[obj.$hashCode];
                adaptive = null;
            }
        }
        // 记录原始对象
        private _displayObject: egret.DisplayObject;
        /**
         * 适配结构
         * 属性:[ 目标对象, 目标对象的属性, 偏移值]
         */
        private _adaptiveProperty = {};
        // 临时属性值
        private _currentProperty: string;
        // 临时目标对象
        private _currentTargetDisplay: egret.DisplayObject;
        constructor(displayObject) {
            this._displayObject = displayObject;
            Core.EventManager.AddEvent(egret.Event.RESIZE, this.onResize, this);
        }
        onResize() {
            for (const key in this._adaptiveProperty) {
                if (Object.prototype.hasOwnProperty.call(this._adaptiveProperty, key)) {
                    const element: any[] = this._adaptiveProperty[key];
                    if (element.length != 3 || !(element[0] instanceof egret.DisplayObject)) {
                        console.error('适配属性配置有误!')
                        return;
                    }
                    // 获取目标对象的属性值
                    const tempValue = this.convertProperty(element[0], element[1]);
                    if (key === AdaptiveProperty.BOTTOM) {
                        // 首先判断是否存在y约束
                        if (Object.keys(this._adaptiveProperty).indexOf(AdaptiveProperty.TOP) !== -1) {
                            // 存在y/top约束,则bottom为拉伸操作
                            // 先拿到约束的值
                            const tempY = tempValue - this._displayObject[AdaptiveProperty.TOP];
                            if (tempY < 0) {
                                console.error('底部约束的对象基准值应该大于约束对象的y值!')
                            } else {
                                this._displayObject[AdaptiveProperty.HEIGHT] = tempY + element[2];
                            }
                        } else {
                            // y轴方向没有约束, 则bottom为位移操作
                            this._displayObject[AdaptiveProperty.TOP] = tempValue - this._displayObject[AdaptiveProperty.HEIGHT] - element[2]
                        }
                    } else if (key === AdaptiveProperty.RIGHT) {
                        // 首先判断是否存在x约束
                        if (Object.keys(this._adaptiveProperty).indexOf(AdaptiveProperty.LEFT) !== -1) {
                            // 存在x轴约束,则RIGHT为拉伸操作
                            // 先拿到约束的值
                            const tempX = tempValue - this._displayObject[AdaptiveProperty.LEFT];
                            if (tempX < 0) {
                                console.error('底部约束的对象基准值应该大于约束对象的x值!')
                            } else {
                                this._displayObject[AdaptiveProperty.WIDTH] = tempX + element[2];
                            }
                        } else {
                            // y轴方向没有约束, 则bottom为位移操作
                            this._displayObject[AdaptiveProperty.LEFT] = tempValue - this._displayObject[AdaptiveProperty.WIDTH] - element[2]
                        }
                    } else if (key == AdaptiveProperty.CENTERX) {
                        this._displayObject[AdaptiveProperty.LEFT] = tempValue - this._displayObject[AdaptiveProperty.WIDTH] / 2 - element[2]
                    } else if (key == AdaptiveProperty.CENTERY) {
                        this._displayObject[AdaptiveProperty.TOP] = tempValue - this._displayObject[AdaptiveProperty.HEIGHT] / 2 - element[2]
                    } else {
                        this._displayObject[key] = tempValue + element[2];
                    }
                }
            }
        }
        // 记录x属性值
        get left() {
            this.recordProperty('x');
            return this;
        }
        // 记录right属性值
        get right() {
            this.recordProperty('right');
            return this;
        }
        // 记录top属性值
        get top() {
            this.recordProperty('y');
            return this;
        }
        // 记录bottom属性值
        get bottom() {
            this.recordProperty('bottom');
            return this;
        }
        // 记录width属性值
        get width() {
            this.recordProperty('width');
            return this;
        }
        // 记录height属性值
        get height() {
            this.recordProperty('height');
            return this;
        }
        // 记录centerX属性值
        get centerX() {
            this.recordProperty('centerX');
            return this;
        }
        // 记录centerY属性值
        get centerY() {
            this.recordProperty('centerY');
            return this;
        }
        /**
         * 设置target目标对象( 屏幕 > 父组件 > 上一个兄弟组件 )
         * @param obj target目标对象
         */
        equalTo(obj: egret.DisplayObject) {
            // 继续记录
            this._currentTargetDisplay = obj;
            this._adaptiveProperty[this._currentProperty].push(obj);
            return this;
        }
        /**
         * 偏移值
         * @param value 
         */
        offset(value: number | string) {
            this._adaptiveProperty[this._currentProperty].push(value);
            this.onResize();
            return this;
        }
        /**
         *  记录当前对象的适配属性值
         */
        recordProperty(property) {
            if (this._currentTargetDisplay) {
                // 如果有目标对象,则该属性为目标对象的属性
                if (this.isSameDirection(this._currentProperty, property)) {
                    this._adaptiveProperty[this._currentProperty].push(property);
                    // 记录完后及时清除
                    this._currentTargetDisplay = null;
                } else {
                    console.error('不是同方向的属性,暂不能进行约束!');
                }
            } else {
                // 没有目标对象,属性为当前对象的属性
                this._currentProperty = property;
                this._adaptiveProperty[this._currentProperty] = [];
            }
        }
        /**
         * 判断两个属性是否是同轴(方向)
         * @param p1 
         * @param p2 
         */
        isSameDirection(p1, p2) {
            return ([AdaptiveProperty.LEFT, AdaptiveProperty.RIGHT, AdaptiveProperty.CENTERX].indexOf(p1) >= 0 &&
                [AdaptiveProperty.LEFT, AdaptiveProperty.RIGHT, AdaptiveProperty.CENTERX].indexOf(p2) >= 0) ||
                ([AdaptiveProperty.TOP, AdaptiveProperty.BOTTOM, AdaptiveProperty.CENTERY].indexOf(p1) >= 0 &&
                    [AdaptiveProperty.TOP, AdaptiveProperty.BOTTOM, AdaptiveProperty.CENTERY].indexOf(p2) >= 0) ||
                ([AdaptiveProperty.WIDTH, AdaptiveProperty.HEIGHT].indexOf(p1) >= 0 &&
                    [AdaptiveProperty.WIDTH, AdaptiveProperty.HEIGHT].indexOf(p2) >= 0)
        }
        /**
         * 将特殊属性转化为基本属性
         * @param property 属性
         */
        convertProperty(displayObject, property) {
            switch (property) {
                case AdaptiveProperty.BOTTOM:
                    return displayObject[AdaptiveProperty.TOP] + displayObject[AdaptiveProperty.HEIGHT];
                case AdaptiveProperty.RIGHT:
                    return displayObject[AdaptiveProperty.LEFT] + displayObject[AdaptiveProperty.WIDTH];
                case AdaptiveProperty.CENTERX:
                    return displayObject[AdaptiveProperty.LEFT] + displayObject[AdaptiveProperty.WIDTH] / 2;
                case AdaptiveProperty.CENTERY:
                    return displayObject[AdaptiveProperty.TOP] + displayObject[AdaptiveProperty.HEIGHT] / 2;
                default:
                    return displayObject[property];
            }
        }
    }
    enum AdaptiveProperty {
        LEFT = 'x',
        RIGHT = 'right',
        TOP = 'y',
        BOTTOM = 'bottom',
        WIDTH = 'width',
        HEIGHT = 'height',
        CENTERX = 'centerX',
        CENTERY = 'centerY'
    }

}
