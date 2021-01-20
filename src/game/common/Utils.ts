class Utils {

    public static maskRound(x: number, y: number, r: number) {
        //画一个蓝色的圆形
        let circle: egret.Shape = new egret.Shape();
        circle.graphics.beginFill(0x0000ff);
        circle.graphics.drawCircle(r, r, r);
        circle.x = x;
        circle.y = y;
        circle.graphics.endFill();
        return circle
    }


    /* 根据传入参数名截取url参数值 */
    public static GetParamByUrl(name: string) {
        let reg = new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)"); //定义正则表达式
        let r = window.location.search.substr(0).match(reg);
        if (r != null) return window['unescape'](r[1]);
        return null;
    }

    /* 给文本添加蓝色描边效果 */
    public static TextFieldAddEffect(tfList: eui.Label[], color: number = 0x4080C9, stroke: number = 2) {
        for (let i = 0; i < tfList.length; i++) {
            color = color == 0 ? 0x4080C9 : 0x4080C9;
            if (color != 0) {
                tfList[i].strokeColor = color;
            }
            tfList[i].stroke = stroke;
        }
    }

    /** 截屏 */
    public static Screenshot(scene: egret.DisplayObject, rect?: egret.Rectangle): egret.Texture {
        const renderTexture: egret.RenderTexture = new egret.RenderTexture();
        // 增加传入参数,增加局部截图功能
        rect = rect || (new egret.Rectangle(scene.x, scene.y, scene.width, scene.height));

        renderTexture.drawToTexture(scene, rect, 1);
        // renderTexture.drawToTexture(scene, null);

        return renderTexture;
    }

    /** 调起登录 */
    public static ToLogin(callback: Core.CoreFunction) {
        if (Share.isApp()) {
            window["xesApp"].appLoginBack = res => {
                if (Number(res) === 1) {
                    const isAndroid =
                        navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1
                    if (isAndroid) {
                        window.location.reload()
                    }
                }
                Logger.report("1002", "0", "登录弹窗");
            }
            window["xesApp"].xesLogin('xesApp.appLoginBack')
            callback.Call();
        } else {
            if (window['vueObj'].isLogin) {
                window['vueObj'].quickLogin()
                callback.Call();
                return;
            } else {
                window['vueObj'].loginViewShow();
                Logger.report("1002", "0", "登录弹窗");
            }
            window['vueObj'].loginSuccess = () => {
                // console.log('login loginSuccess');
                window['vueObj'].loginViewhide();
                window['vueObj'].isLogin = true;
                callback.Call();
            }
        }

    }

}

