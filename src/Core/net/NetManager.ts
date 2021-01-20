/**
 * 网络管理器(http/websocket)
 * coded by wangshengwe1@tal.com 2020/11/16
 */
namespace Core {

    export class NetManager {
        private static _instance;
        public static get instance(): NetManager {
            if (this._instance == null)
                this._instance = new NetManager();
            return this._instance;
        }
        /**获取数据 */
        public get(request_url, params, callback, thisObj) {
            let request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request_url += `?${this.parseParam(params, null)}`
            request.open(request_url, egret.HttpMethod.GET);
            request.setRequestHeader("Content-Type", "application/json");
            request.withCredentials = true;
            // request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            if (Core.AUTHORIZATION) {
                request.setRequestHeader("Authorization", `Bearer ${Core.AUTHORIZATION}`);
            }
            request.send();
            request.addEventListener(egret.Event.COMPLETE, callback, thisObj);
            request.addEventListener(egret.HTTPStatusEvent.HTTP_STATUS, this.onHttpStatus, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        }
        /**提交数据 */
        public post(request_url, value, callback, thisObj) {
            let request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open(request_url, egret.HttpMethod.POST);
            request.setRequestHeader("Content-Type", "application/json");
            request.withCredentials = true;
            // request.setRequestHeader("Content-Type", "multipart/form-data");
            if (Core.AUTHORIZATION) {
                request.setRequestHeader("Authorization", `Bearer ${Core.AUTHORIZATION}`);
            }
            request.send(value);
            request.addEventListener(egret.Event.COMPLETE, callback, thisObj);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        }

        private onHttpStatus(event: egret.HTTPStatusEvent): void {
            console.log('httpstatus', event.status)
        }

        private onGetIOError(event: egret.IOErrorEvent): void {
            // Global.toolMgr.updataUserData();
            /** 
             * todo http请求失败的容错处理, 再次登录
             */
            console.log('onGetIOError', event);
            // App.SceneManager.show(App.SceneList.sceneInstanceList.NetErrorView);
        }

        private parseParam(param, key) {
            var paramStr = "";
            if (typeof param != 'object') {
                paramStr += "&" + key + "=" + encodeURIComponent(param as any);
            } else {
                for (const i in param) {
                    var k = key == null ? i : key + (Array.isArray(param) ? "[" + i + "]" : "." + i);
                    if (param.hasOwnProperty(i)) {
                        paramStr += '&' + this.parseParam(param[i], k);
                    }
                }
            }
            return paramStr.substr(1);
        };

    }
}
