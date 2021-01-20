namespace Core {

    export function maskRound(x: number, y: number, r: number) {
        //画一个蓝色的圆形
        let circle: egret.Shape = new egret.Shape();
        circle.graphics.beginFill(0x0000ff);
        circle.graphics.drawCircle(r, r, r);
        circle.x = x;
        circle.y = y;
        circle.graphics.endFill();
        return circle
    }

    /* 获取范围区间随机整数, 包含max */
    export function RandomInt(min: number, max: number): number {
        return min + Math.round(Math.random() * (max - min));
    }

    /* 获取随机布尔值 */
    export function RandomBoolean(): boolean {
        return Math.random() >= 0.5;
    }

    /* 等待指定时间 */
    export async function WaitForSeconds(time: number, callBack: Function = null) {
        await new Promise<any>((resolve, reject) => { setTimeout(() => resolve(), time * 1000) });
        if (callBack != null) {
            callBack.call(this);
        }
    }

    /* 将from中坐标转换为to的坐标 */
    export function ConvertPointToContainer(x: number, y: number, from: egret.DisplayObjectContainer, to: egret.DisplayObjectContainer): egret.Point {
        let global: egret.Point = from.localToGlobal(x, y);
        return to.globalToLocal(global.x, global.y);
    }

    /* 根据传入参数名截取url参数值 */
    export function GetParamByUrl(name: string) {
        let reg = new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)"); //定义正则表达式
        let r = window.location.search.substr(0).match(reg);
        if (r != null) return window['unescape'](r[1]);
        return null;
    }

    /* 给文本添加蓝色描边效果 */
    export function TextFieldAddEffect(tfList: eui.Label[], color: number = 0x4080C9, stroke: number = 2) {
        for (let i = 0; i < tfList.length; i++) {
            color = color == 0 ? 0x4080C9 : 0x4080C9;
            if (color != 0) {
                tfList[i].strokeColor = color;
            }
            tfList[i].stroke = stroke;
        }
    }

    /** 截屏 */
    export function Screenshot(scene: egret.DisplayObject, rect?: egret.Rectangle): egret.Texture {
        const renderTexture: egret.RenderTexture = new egret.RenderTexture();
        // 增加传入参数,增加局部截图功能
        rect = rect || (new egret.Rectangle(scene.x, scene.y, scene.width, scene.height));

        renderTexture.drawToTexture(scene, rect, 1);
        // renderTexture.drawToTexture(scene, null);

        return renderTexture;
    }

    /** 动态Show */
    export async function TweenShow(object: egret.DisplayObject, time: number = 500) {
        await Core.WaitForSeconds(time / 1000);
        object.visible = true;
        object.alpha = 0;
        let showTween = egret.Tween.get(object);
        showTween.to({ alpha: 1 }, time);
    }

    /** 动态Hide */
    export async function TweenHide(object: egret.DisplayObject, time: number = 500) {
        await Core.WaitForSeconds(time / 1000);
        object.alpha = 1;
        object.touchEnabled = false;
        let showTween = egret.Tween.get(object);
        showTween.to({ alpha: 0 }, time).call(function () {
            object.visible = false;
            object.alpha = 1;
        }, this);
    }

}