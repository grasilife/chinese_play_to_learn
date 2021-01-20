namespace Core {

    // export enum EventType {
    //     EventHelloWorld,
    // }

    export class EventManager {

        private static _instance: EventManager;
        public static get Instance(): EventManager {
            if (this._instance == null) {
                this._instance = new EventManager();
            }
            return this._instance;
        }

        private _currentIndex: number = 0;
        private _events: { [key: string]: { [key: string]: CoreEvent } } = {};
        private _eventsID: { [key: string]: CoreEvent } = {};

        private constructor() { }

        /** 
         * 创建事件
         * @param eventName 事件名称
         * @param callback 回调函数
         * @param thisObj 就是this
         * @param once 是否只执行一次，默认为false
         * @returns 每个事件唯一的id
         */
        public static AddEvent(eventName: string, callback: Function, thisObj: any, once: boolean = false): number {
            let eventNameStr = eventName.toString();
            let event: CoreEvent = new CoreEvent();
            event.ID = EventManager.Instance._currentIndex++;
            event.EventName = eventNameStr;
            event.Func = new CoreFunction(callback, thisObj);
            event.Once = once;

            if (null == EventManager.Instance._events[eventNameStr]) {
                EventManager.Instance._events[eventNameStr] = {};
            }

            EventManager.Instance._events[eventNameStr][event.ID.toString()] = event;
            EventManager.Instance._eventsID[event.ID.toString()] = event;

            return event.ID;
        }

        /** 
         * 移除制定id的事件
         * @param id 事件ID
         */
        public static RemoveEvent(id: number) {
            if (null == EventManager.Instance._eventsID[id]) {
                return;
            }

            let eName = EventManager.Instance._eventsID[id].EventName;
            let eID = EventManager.Instance._eventsID[id].ID;

            if (null != EventManager.Instance._events[eName] && null != EventManager.Instance._events[eName][eID]) {
                EventManager.Instance._events[eName][eID] = null;
                delete EventManager.Instance._events[eName][eID];
            }

            EventManager.Instance._eventsID[eID] = null;
            delete EventManager.Instance._eventsID[eID];
        }

        /** 
         * 移除指定eventName下所有的事件
         * @param eventName 事件Type
         */
        public static ClearEvent(eventName: string) {
            let eventNameStr = eventName.toString();
            if (null == EventManager.Instance._events[eventNameStr]) {
                return;
            }

            for (let key in EventManager.Instance._events[eventNameStr]) {
                let id: number = Number(key);
                if (null == EventManager.Instance._eventsID[id]) {
                    continue;
                }

                EventManager.Instance._eventsID[id] = null;
                delete EventManager.Instance._eventsID[id];
            }

            EventManager.Instance._events[eventNameStr] = null;
            delete EventManager.Instance._events[eventNameStr];
        }

        /** 
         * 执行事件
         * @param eventName 事件Type
         * @param args 参数列表，默认为空
         */
        public static RunEvent(eventName: string, args: any[] = null) {
            let eventNameStr = eventName.toString();
            let events = EventManager.Instance._events[eventNameStr];
            if (null == events) {
                return;
            }

            let tobeDelete: Array<CoreEvent>;
            //执行回调
            for (let key in events) {
                let event: CoreEvent = events[key];
                event.Func.Call(args);

                if (event.Once) {
                    if (tobeDelete == null) {
                        tobeDelete = new Array<CoreEvent>();
                    }

                    tobeDelete.push(event);
                }
            }

            //删除一次性的事件
            if (null != tobeDelete) {
                for (let i: number = 0; i < tobeDelete.length; ++i) {
                    EventManager.RemoveEvent(tobeDelete[i].ID);
                }
            }
        }


    }

    export class CoreEvent {
        public ID: number;
        public EventName: string;
        public Func: CoreFunction;
        public Once: boolean;
    }

    export class CoreFunction {

        private m_callback: Function;
        private m_thisObj: any;

        public constructor(callback: Function, thisObj: any) {
            this.m_callback = callback;
            this.m_thisObj = thisObj;
        }

        public Call(args: any[] = null): any {
            if (null == args) {
                return this.m_callback.call(this.m_thisObj);
            }
            else {
                return this.m_callback.call(this.m_thisObj, args);
            }
        }

    }
}
