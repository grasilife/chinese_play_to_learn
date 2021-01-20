namespace Core {

	/**
	 * 舞台对象
	 */
	export var StageEgret: egret.DisplayObjectContainer;

	/**
	 * Core 全局配置
	 */
	export var Configuration;
	/**
	 * 字符串模板json对象
	 */
	export var StringResourceJson;
	/**
	 * 全局高度
	 */
	export var StageHeight;
	/**
	 * 全局宽度
	 */
	export var StageWidth;
	/**
	 * Scene容器
	 */
	export var SceneContainer;
	/**
	 * Window容器
	 */
	export var WindowContainer;
	/**
	 * Popup容器
	 */
	export var PopupContainer;
	/**
	 * MessageBox容器
	 */
	export var MessageContainer;
	/**
	 * 导航层
	 */
	export var NavigatorContainer;

	/**
	 * 全局单例对象
	 */
	export var _instance: Core.CoreRoot;

	/**
	 * 网络管理器
	 */
	export var NetManagerInstance = Core.NetManager.instance;

	/** 
	 * 消息加工工厂
	 */
	export var MessageFactoryInstance = Core.MessageFactory.instance;

	// 用户登录Token信息
	export var AUTHORIZATION: string = "";


	/**
	 * 初始化
	 * @param main 白鹭项目启动类 Main
	 * @param config {
		@param	navigatorContainerAvailable		 是否启用导航层
		@param	stringResName					 全局本地化文本字符串配置文件，json格式， 通过core.getString(key)来获取
		@param	orientation						 App窗口方向，默认是项目设定的方向
		@param	stageWidth						 自定义游戏窗口宽度，默认是全屏窗口宽度
		@param	stageHeight				   		 自定义游戏窗口高度，默认是全屏窗口高度
		@param	windowContainerMaskColor		 Window层遮罩颜色，默认是黑色0x000000
		@param	windowContainerMaskAlpha		 Window层遮罩不透明度，默认是0
		@param	popupContainerMaskColor			 Popup层遮罩颜色，默认是黑色0x000000
		@param	popupContainerMaskAlpha			 Popup层遮罩不透明度，默认是0
		@param	messageContainerMaskColor		 MessageBox层遮罩颜色，默认0x000000
		@param	messageContainerMaskAlpha		 MessageBox层遮罩不透明度，默认0
		@param	popupPositionHori				 Popup对象全局水平位置，默认是中间0.5
		@param	popupPositionVert				 Popup对象全局垂直位置，默认是中间0.5
		@param	allowMultipleMessageBoxes		 是否允许MessageBox可以弹出多层，每层独立，默认是true，如果为false，新弹出的messagebox会关闭前一个
		@param	showMultipleMessageBoxesOffset	 当allowMultipleMessageBoxes=true的时候，后一个相比前一个messagebox是否有错位显示，默认是10}
	 */
	export function initCoreRoot(main: egret.DisplayObjectContainer, config?: {
		navigatorContainerAvailable?: boolean,
		stringResName?: string,
		orientation?: string,
		stageWidth?: number,
		stageHeight?: number,
		windowContainerMaskColor?: number,
		windowContainerMaskAlpha?: number,
		popupContainerMaskColor?: number,
		popupContainerMaskAlpha?: number,
		messageContainerMaskColor?: number,
		messageContainerMaskAlpha?: number,
		popupPositionHori?: number,
		popupPositionVert?: number,
		allowMultipleMessageBoxes?: boolean,
		showMultipleMessageBoxesOffset?: number
	}) {
		Core._instance = Core.CoreRoot.__init(main, config);
		// if (dragonBones)
		// 	core._dbAnimeGeneratorInstance = core.DbAnimeGenerator.__initAnimeGenerator();
	}

	/**
	 * 判断Core是否初始化完成
	 */
	export function checkGgValid(): boolean {
		if (!Core._instance) {
			// egret.error('The Core is not initialized! \'Core.initCoreRoot()\' should be executed first.');
			return false;
		} else {
			return true;
		}
	}


	/**
	 * 游戏框架主类，轻量级游戏UI框架，兼容横屏竖屏
	 */
	export class CoreRoot extends egret.EventDispatcher {

		/**
		 * 单例对象
		 */
		private static __instance: Core.CoreRoot;

		/**
		 * 全局Main对象
		 */
		public __mainContainer: egret.DisplayObjectContainer;

		/**
		 * Scene层容器，游戏最底层
		 */
		public __sceneContainer: egret.DisplayObjectContainer;

		/**
		 * Window层容器，Sprite类型，可以设置底色，在Scene层之上，导航层之下
		 */
		public __windowContainer: egret.Sprite;

		/**
		 * 导航层，在Scene,Window层之上，popup层之下
		 */
		public __navigatorContainer: egret.DisplayObjectContainer;

		/**
		 * Popup层，在导航层之上，message层之下
		 */
		public __popupContainer: egret.Sprite;

		/**
		 * messagebox 层，Popup层之上
		 */
		public __messageContainer: egret.Sprite;


		// // window历史列表，不包含当前当前打开的window
		// public __windowHistoryList: Array<BaseWindow> = new Array<BaseWindow>();

		public __isPause: boolean = false;

		private constructor(main: egret.DisplayObjectContainer, config?: any) {
			super();
			this.__mainContainer = main;

			// 初始化各层容器
			this.__initContainers(main, config);
		}

		/**
		 * 初始化所有容器
		 */
		private __initContainers(main: egret.DisplayObjectContainer, config: any) {

			// Scene层
			let sceneContainer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
			sceneContainer.width = config.stageWidth;
			sceneContainer.height = config.stageHeight;
			Core.SceneContainer = this.__sceneContainer = sceneContainer;
			main.addChild(this.__sceneContainer);

			// Window层
			let windowContainer = new egret.Sprite();
			windowContainer.width = config.stageWidth;
			windowContainer.height = config.stageHeight;
			windowContainer.graphics.beginFill(config.windowContainerMaskColor, config.windowContainerMaskAlpha);
			windowContainer.graphics.drawRect(0, 0, windowContainer.width, windowContainer.height);
			windowContainer.graphics.endFill();
			windowContainer.touchEnabled = true;
			main.addChild(windowContainer);
			Core.WindowContainer = this.__windowContainer = windowContainer;
			this.__windowContainer.visible = false;

			if (config.navigatorContainerAvailable === true) {
				let navigatorContainer = new egret.DisplayObjectContainer();
				navigatorContainer.width = config.stageWidth;
				navigatorContainer.height = config.stageHeight;
				navigatorContainer.touchEnabled = false;
				navigatorContainer.touchChildren = true;
				main.addChild(navigatorContainer);
				Core.NavigatorContainer = this.__navigatorContainer = navigatorContainer;
			}

			// Popup层
			let popupContainer = new egret.Sprite();
			popupContainer.width = config.stageWidth;
			popupContainer.height = config.stageHeight;
			popupContainer.graphics.beginFill(config.popupContainerMaskColor, config.popupContainerMaskAlpha);
			popupContainer.graphics.drawRect(0, 0, popupContainer.width, popupContainer.height);
			popupContainer.graphics.endFill();
			popupContainer.touchEnabled = true;
			popupContainer.visible = false;
			main.addChild(popupContainer);
			Core.PopupContainer = this.__popupContainer = popupContainer;
			this.__popupContainer.visible = false;

			// MessageBox层
			let messageContainer = new egret.Sprite();
			messageContainer.width = config.stageWidth;
			messageContainer.height = config.stageHeight;
			messageContainer.graphics.beginFill(config.messageContainerMaskColor, config.messageContainerMaskAlpha);
			messageContainer.graphics.drawRect(0, 0, messageContainer.width, messageContainer.height);
			messageContainer.graphics.endFill();
			messageContainer.touchEnabled = true;
			messageContainer.visible = false;
			messageContainer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onMessageContainerBg_Tap, this);
			main.addChild(messageContainer);
			Core.MessageContainer = this.__messageContainer = messageContainer;
			this.__messageContainer.visible = false;

			// LoadingOverlay
			// main.addChild(Core.LoadingOverlay.Instance);
		}

		public static __init(main: egret.DisplayObjectContainer, config?: {
			navigatorContainerAvailable?: boolean,
			stringResName?: string,
			orientation?: string,
			stageWidth?: number,
			stageHeight?: number,
			windowContainerMaskColor?: number,
			windowContainerMaskAlpha?: number,
			popupContainerMaskColor?: number,
			popupContainerMaskAlpha?: number,
			messageContainerMaskColor?: number,
			messageContainerMaskAlpha?: number,
			popupPositionHori?: number,
			popupPositionVert?: number,
			allowMultipleMessageBoxes?: boolean,
			showMultipleMessageBoxesOffset?: number
		}) {

			Core.StageEgret = main;
			// 初始化参数
			config = config || {};
			config.orientation = config.orientation || main.stage.orientation;
			if (config.stringResName) {
				Core.StringResourceJson = RES.getRes(config.stringResName);
			}
			config.stageHeight = Core.StageHeight = config.stageHeight || main.stage.stageHeight;
			config.stageWidth = Core.StageWidth = config.stageWidth || main.stage.stageWidth;

			config.windowContainerMaskColor = config.windowContainerMaskColor || 0;
			config.windowContainerMaskAlpha = config.windowContainerMaskAlpha || 0;
			config.popupContainerMaskColor = config.popupContainerMaskColor || 0;
			config.popupContainerMaskAlpha = config.popupContainerMaskAlpha || .1;
			config.messageContainerMaskColor = config.messageContainerMaskColor || 0;
			config.messageContainerMaskAlpha = config.messageContainerMaskAlpha || .1;
			config.popupPositionHori = config.popupPositionHori || .5;
			config.popupPositionVert = config.popupPositionVert || .5;

			config.allowMultipleMessageBoxes = config.allowMultipleMessageBoxes === undefined ? true : config.allowMultipleMessageBoxes;
			config.showMultipleMessageBoxesOffset = config.showMultipleMessageBoxesOffset || 10;

			config.navigatorContainerAvailable = config.navigatorContainerAvailable === undefined ? false : config.navigatorContainerAvailable;

			Core.Configuration = config;

			return Core._instance || new Core.CoreRoot(main, config);
		}

		/**
		 * 全局Update
		 */
		public __update(deltaTime: number) {
			if (this.__isPause == true) {
				return;
			}

			if (this.__sceneContainer.numChildren > 0) {
				for (let i = 0; i < this.__sceneContainer.numChildren; i++) {
					let item = (this.__sceneContainer.getChildAt(i) as BaseScene);
					if (item && item._isInitCompleted) {
						(this.__sceneContainer.getChildAt(i) as BaseScene).update(deltaTime);
					}
				}
			}
			if (this.__windowContainer.numChildren > 0) {
				for (let i = 0; i < this.__windowContainer.numChildren; i++) {
					let item = (this.__windowContainer.getChildAt(i) as BaseWindow);
					if (item && item._isInitCompleted) {
						(this.__windowContainer.getChildAt(i) as BaseWindow).update(deltaTime);
					}
				}
			}
			if (this.__popupContainer.numChildren > 0) {
				for (let i = 0; i < this.__popupContainer.numChildren; i++) {
					let item = (this.__popupContainer.getChildAt(i) as BasePopup);
					if (item && item._isInitCompleted) {
						(this.__popupContainer.getChildAt(i) as BasePopup).update(deltaTime);
					}
				}
			}

		}
		/**
		 * 全局onPause
		 */
		public __onPause() {
			this.__isPause = true;

			if (this.__sceneContainer.numChildren > 0) {
				for (let i = 0; i < this.__sceneContainer.numChildren; i++) {
					(this.__sceneContainer.getChildAt(i) as BaseScene).onPause();
				}
			}
			if (this.__windowContainer.numChildren > 0) {
				for (let i = 0; i < this.__windowContainer.numChildren; i++) {
					(this.__windowContainer.getChildAt(i) as BaseWindow).onPause();
				}
			}
			if (this.__popupContainer.numChildren > 0) {
				for (let i = 0; i < this.__popupContainer.numChildren; i++) {
					(this.__popupContainer.getChildAt(i) as BasePopup).onPause();
				}
			}

		}
		/**
		 * 全局onResume
		 */
		public __onResume() {
			this.__isPause = false;

			if (this.__sceneContainer.numChildren > 0) {
				for (let i = 0; i < this.__sceneContainer.numChildren; i++) {
					(this.__sceneContainer.getChildAt(i) as BaseScene).onResume();
				}
			}
			if (this.__windowContainer.numChildren > 0) {
				for (let i = 0; i < this.__windowContainer.numChildren; i++) {
					(this.__windowContainer.getChildAt(i) as BaseWindow).onResume();
				}
			}
			if (this.__popupContainer.numChildren > 0) {
				for (let i = 0; i < this.__popupContainer.numChildren; i++) {
					(this.__popupContainer.getChildAt(i) as BasePopup).onResume();
				}
			}

		}

		/**
		 * 打开一个Scene
		 * @param scene IScene 打开的对象
		 * @param showAnime boolean 是否显示切换Scene的动画
		 */
		public __openScene(scene: BaseScene, showAnime: boolean = false): boolean {
			let lastLayer: BaseScene = this.__sceneContainer.numChildren > 0 ? this.__sceneContainer.getChildAt(0) as BaseScene : undefined;

			if (lastLayer && egret.getQualifiedClassName(lastLayer) == egret.getQualifiedClassName(scene)) {
				return false;
			}

			let logic = () => {
				scene.init();
				scene.addListener();
				scene._isInitCompleted = true;

				if (lastLayer) {
					lastLayer.parent.removeChild(lastLayer);
					lastLayer.removeListener();
					lastLayer.dispose();
					lastLayer = null;
				}
			}

			if (!showAnime) {
				let fn = () => {
					scene.removeEventListener(egret.Event.ADDED_TO_STAGE, fn, this);
					logic();
				}
				scene.addEventListener(egret.Event.ADDED_TO_STAGE, fn, this);
				this.__sceneContainer.addChild(scene);
			} else {
				scene.x = 0;
				scene.y = Core.StageHeight;
				let fn = () => {
					scene.removeEventListener(egret.Event.ADDED_TO_STAGE, fn, self);
					egret.Tween.get(scene).wait(60).to({ x: 0, y: 0 }, 150).call(() => {
						logic();
					}, self);
				}
				scene.addEventListener(egret.Event.ADDED_TO_STAGE, fn, this);
				this.__sceneContainer.addChild(scene);
			}

			return true;
		}

		/**
		 * 关闭一个Scene
		 * @param scene IScene 打开的对象
		 * @param showAnime boolean 是否显示切换Scene的动画
		 */
		public __closeScene(scene: BaseScene, showAnime: boolean = false) {
			let logic = () => {
				scene && scene.parent.removeChild(scene);
				scene && scene.removeListener();
				scene && scene.dispose();
				scene = null;
			}

			if (!showAnime) {
				logic();
			}
			else {
				egret.Tween.get(scene).wait(30).to({ x: 0, y: Core.StageHeight }, 150, egret.Ease.circOut).call(() => {
					logic();
				}, self);
			}
		}

		// /**
		//  * 清理所有window历史
		//  */
		// public __clearWindowHistory() {
		// 	let windowList = this.__windowHistoryList.splice(0);
		// 	windowList.forEach((window) => {
		// 		(<any>window).removeListener();
		// 		(<any>window).dispose();
		// 	});
		// 	windowList = null;
		// }

		/**
		 * 打开一个window
		 * @param window BaseWindow
		 * @param showAnime boolean 是否显示动画
		 */
		public __openWindow(window: BaseWindow, showAnime: boolean = false): void {

			let logic = () => {
				window.removeEventListener(egret.Event.ADDED_TO_STAGE, logic, this);
				window.init();
				window.addListener();
				window._isInitCompleted = true;

				if (showAnime) {
					window.alpha = 0;
					egret.Tween.get(window).to({ alpha: 1 }, 300, egret.Ease.circOut);
				}
			}

			window.addEventListener(egret.Event.ADDED_TO_STAGE, logic, this);

			this.__windowContainer.addChild(window);
			this.__windowContainer.visible = true;
		}

		/** 
		 * 关闭Window
		 * @param showAnime boolean 是否显示动画
		 */
		public __closeWindow(window: BaseWindow, showAnime: boolean = false): void {
			let logic = () => {
				window.parent.removeChild(window);
				window.removeListener();
				window.dispose();
				window = null;
				if (this.__windowContainer.numChildren <= 0) {

					this.__windowContainer.visible = false;
				}
			}

			if (!showAnime) {
				logic();
			}
			else {
				egret.Tween.get(window).to({ alpha: 0 }, 300, egret.Ease.circOut).call(() => {
					logic();
				}, this);
			}
		}

		/*
		* 打开Popup
		*/
		public __openPopup(popup: BasePopup, showAnime: boolean = false): void {
			let logic = () => {
				popup.anchorOffsetX = popup.width / 2;
				popup.anchorOffsetY = popup.height / 2;
				popup.x = this.__popupContainer.width / 2;
				popup.y = this.__popupContainer.height / 2;

				popup.removeEventListener(egret.Event.ADDED_TO_STAGE, logic, this);
				popup.init();
				popup.addListener();
				popup._isInitCompleted = true;

				if (showAnime) {
					popup.alpha = 0;
					egret.Tween.get(popup).to({ alpha: 1 }, 300, egret.Ease.circOut);
				}
			}

			popup.addEventListener(egret.Event.ADDED_TO_STAGE, logic, this);
			this.__popupContainer.addChild(popup);
			this.__popupContainer.visible = true;

			// if (true === popup.showPopAnime) {
			// 	popup.x = Core.StageWidth * Core.Configuration.popupPositionHori;
			// 	popup.y = Core.StageHeight * (Core.Configuration.popupPositionVert - .13);
			// 	popup.alpha = 0;
			// 	let fn = () => {
			// 		popup.removeEventListener(egret.Event.ADDED_TO_STAGE, fn, this);
			// 		egret.Tween.get(popup).wait(80).to({ y: Core.StageHeight * Core.Configuration.popupPositionVert, alpha: 1 }, 300, egret.Ease.sineOut).call(() => {
			// 			(<any>popup).display();
			// 		}, this);
			// 	}
			// 	popup.addEventListener(egret.Event.ADDED_TO_STAGE, fn, this);
			// 	popup.anchorOffsetX = popup.width * .5;
			// 	popup.anchorOffsetY = popup.height * .5;
			// }

			// this.__popupContainer.addChild(popup);
			// (<any>popup)._isInitCompleted = true;
			// this.__popupContainer.visible = true;
		}

		/**
		 * 关闭当前popup
		 */
		public __closePopup(popup: BasePopup, showAnime: boolean = false): void {

			let logic = () => {
				popup.parent.removeChild(popup);
				popup.removeListener();
				popup.dispose();
				popup = null;
				if (this.__popupContainer.numChildren <= 0) {

					this.__popupContainer.visible = false;
				}
			}

			if (!showAnime) {
				logic();
			}
			else {
				egret.Tween.get(popup).to({ alpha: 0 }, 300, egret.Ease.circOut).call(() => {
					logic();
				}, this);
			}

			// let container: egret.Sprite = this.__popupContainer;
			// if (container.numChildren > 0) {
			// 	let lastPopup: egret.DisplayObject = container.numChildren > 0 ? container.getChildAt(0) : undefined;
			// 	if (immediate) {
			// 		egret.Tween.removeTweens(lastPopup);
			// 		container.removeChildren();
			// 		(<any>lastPopup).dispose();
			// 		container.visible = false;
			// 	} else {
			// 		egret.Tween.get(lastPopup).to({ y: Core.StageHeight * (Core.Configuration.popupPositionVert - .13), alpha: 0 }, 200, egret.Ease.sineIn).call(() => {
			// 			container.removeChildren();
			// 			container.visible = false;
			// 			(<any>lastPopup).dispose();
			// 		}, this);
			// 	}
			// } else {
			// 	container.visible = false;
			// }
		}

		/**
		 * 弹出messagebox
		 * @param messageBox IMessageBox
		 * @param closeOthers boolean 打开的同时是否关闭其他当前打开
		 */
		public __showMessageBox(messageBox: egret.DisplayObject, closeOthers: boolean = false) {
			this.__messageContainer.visible = true;
			let container = this.__messageContainer;
			if (container.numChildren > 0 && (closeOthers || !Core.Configuration.allowMultipleMessageBoxes)) {
				let msgs: any[] = container.$children;
				container.removeChildren();
				msgs.forEach((msg) => {
					egret.Tween.removeTweens(msg);
					(<any>msg).dispose();
				});
				msgs = null;
			}
			messageBox.anchorOffsetX = messageBox.width * .5;
			messageBox.anchorOffsetY = messageBox.height * .5;
			messageBox.scaleX = messageBox.scaleY = 0;
			let offset = (<any>messageBox).AllowMultipleOffsetPosition ? container.numChildren * Core.Configuration.showMultipleMessageBoxesOffset : 0;
			messageBox.x = Core.StageWidth * .5 + offset;
			messageBox.y = Core.StageHeight * .5 + offset;
			container.addChild(messageBox);
			egret.Tween.get(messageBox).wait(30).to({ scaleX: 1, scaleY: 1 }, 260, egret.Ease.backOut).call(() => {
				(<any>messageBox).init();
			});
		}
		/**
		 * 关闭指定的messagebox
		 * @param target IMessageBox
		 * @param closeAll boolean  关闭全部
		 */
		public __closeMessageBox(target: IMessageBox, closeAll: boolean = false) {
			let container = this.__messageContainer;
			if (!target && container.numChildren <= 0) {
				container.visible = false;
				return;
			}
			if (closeAll) {
				if (container.numChildren > 0) {
					let msgs: any[] = container.$children;
					container.removeChildren();
					msgs.forEach((msg) => {
						egret.Tween.removeTweens(msg);
						(<any>msg).dispose();
					});
					msgs = null;
				}
			} else if (target) {
				egret.Tween.removeTweens(target);
				if (target.parent)
					target.parent.removeChild(target);
				(<any>target).dispose();
			}
			if (container.numChildren <= 0) {
				container.visible = false;
			}
		}

		/**
		 * 点击messagebox背景触发事件
		 */
		public __onMessageContainerBg_Tap(e: egret.TouchEvent) {
			let container = this.__messageContainer;
			if (e.target != container) {
				return;
			}
			if (container.numChildren > 0) {
				let target = container.getChildAt(container.numChildren - 1);
				if (true === (<IMessageBox>target).AllowCloseByTapBg)
					this.__closeMessageBox(target as IMessageBox);
			} else {
				container.visible = false;
			}
		}
		/**
		 * 添加导航模块，window层之上，popup层之下
		 * @param navi egret.DisplayObject
		 */
		public __addNavigator(navi: egret.DisplayObject) {
			this.__navigatorContainer.addChild(navi);
		}

	}

	/**
	 * 打开一个Scene
	 * @param scene IScene 打开的对象
	 * @param showAnime boolean 是否显示切换Scene的过度动画
	 */
	export function openScene(scene: BaseScene, showAnime?: boolean): void {
		Core._instance.__openScene(scene, showAnime);
	}
	/**
	 * 关闭一个Scene
	 * @param scene IScene 打开的对象
	 * @param showAnime boolean 是否显示切换Scene的过度动画
	 */
	export function closeScene(scene: BaseScene, showAnime?: boolean): void {
		Core._instance.__closeScene(scene, showAnime);
	}

	/**
	 * 打开一个window，如果当前有window已经打开，则自动关闭并dispose
	 * @param window IWindow
	 * @param showAnime boolean 是否显示切换Scene的过度动画
	 */
	export function openWindow(window: Core.BaseWindow, showAnime?: boolean): void {
		Core._instance.__openWindow(window, showAnime);
	}
	/**
	 * 关闭当前window
	 * @param showAnime boolean 是否显示切换Scene的过度动画
	 */
	export function closeWindow(window: BaseWindow, showAnime?: boolean): void {
		Core._instance.__closeWindow(window, showAnime);
	}

	/**
	 * 打开一个popup
	 */
	export function openPopup(popup: Core.BasePopup, showAnime?: boolean): void {
		Core._instance.__openPopup(popup, showAnime);
	}

	/**
	 * 关闭当前popup
	 */
	export function closePopup(popup: Core.BasePopup, showAnime?: boolean): void {
		Core._instance.__closePopup(popup, showAnime);
	}

	/**
	 * 弹出messagebox
	 * @param messageBox IMessageBox
	 * @param closeOthers boolean 打开的同时是否关闭其他当前打开
	 */
	export function showMessageBox(messageBox: Core.IMessageBox, closeOthers?: boolean): void {
		Core._instance.__showMessageBox(messageBox, closeOthers);
	}
	/**
	 * 关闭所有已打开的messagebox
	 */
	export function closeAllMessageBoxes(): void {
		Core._instance.__closeMessageBox(null, true);
	}
	/**
	 * 关闭指定的messagebox
	 * @param target IMessageBox
	 */
	export function closeMessageBox(target: IMessageBox): void {
		Core._instance.__closeMessageBox(target);
	}
	/**
	 * 添加导航模块，window层之上，popup层之下
	 * @param navi egret.DisplayObject
	 */
	export function addNavigator(navi: egret.DisplayObject): void {
		Core._instance.__addNavigator(navi);
	}

	/**
	 * 生成龙骨急速格式动画，已废弃，请导出二进制格式，并使用二进制动画方法
	 * @param resName string  
	 */
	// export function dbGenerateMovieClip(resName: string, disposeAfterUnload?: boolean, removeAfterComplete?: boolean): dragonBones.Movie {
	// 	return Core._dbAnimeGeneratorInstance.__generateMovieClip(resName, disposeAfterUnload, removeAfterComplete);
	// }
	/**
	 * 生成龙骨急速格式动画，已废弃，并缓存动画数据，已废弃，请导出二进制格式，并使用二进制动画方法
	 */
	// export function dbGenerateMovieClipWithCache(resName: string, disposeAfterUnload?: boolean, removeAfterComplete?: boolean): dragonBones.Movie {
	// 	return Core._dbAnimeGeneratorInstance.__generateMovieClip(resName, disposeAfterUnload, removeAfterComplete, false);
	// }
	/**
	 * 回收所有急速格式的龙骨动画资源，已废弃
	 */
	// export function dbDisposeAllMovieClipData() {
	// 	Core._dbAnimeGeneratorInstance.__disposeMovieClipData();
	// }
	/**
	 * 回收指定急速格式的龙骨动画 已废弃
	 * @param resName string 资源文件名称 例如 resName_ske_dbmv, resName_tex_png
	 */
	// export function dbDisposeMovieClipData(resName: string) {
	// 	Core._dbAnimeGeneratorInstance.__disposeMovieClipData(resName);
	// }
	/**
	 * 生成龙骨二进制动画
	 * @param resName string 资源文件名称 例如 resName_ske_dbbin, resName_tex_png
	 * @param armatureName string 骨架名称 （Armature）
	 * @param disposeAfterUnload boolean 当动画被移除的时候，是否自动回收 默认true，如果设为false，则需要手动回收Core.dbDisposeDbbinAnime(anime)
	 * @param removeAfterComplete boolean 当动画播放周期结束，是否自动从父容器中移除，默认为true
	 */
	// export function dbGenerateDbbinAnime(resName: string, armatureName: string, disposeAfterUnload?: boolean, removeAfterComplete?: boolean) {
	// 	return Core._dbAnimeGeneratorInstance.__generateDbbinAnime(resName, armatureName, disposeAfterUnload, removeAfterComplete);
	// }
	/**
	 * 回收指定的龙骨二进制动画对象
	 * @param anime dragonBones.EgretAramtureDisplay
	 */
	// export function dbDisposeDbbinAnime(anime: dragonBones.EgretArmatureDisplay): void {
	// 	Core._dbAnimeGeneratorInstance.__disposeDbbinAnime(anime);
	// }
	/**
	 * 回收所有二进制龙骨动画资源缓存
	 */
	// export function dbDisposeAllDbbinFactoryData(): void {
	// 	Core._dbAnimeGeneratorInstance.__disposeDBFactoryData();
	// }
	/**
	 * 回收指定二进制龙骨动画资源缓存
	 * @param resName string 资源文件名称
	 */
	// export function dbDisposeDbbinFactoryData(resName: string): void {
	// 	Core._dbAnimeGeneratorInstance.__disposeDBFactoryData(resName);
	// }
	/**
	 * 启动龙骨骨骼动画计时器，启动龙骨动画前，需要开启计时器
	 */
	// export function dbStartDbWorldClock(): void {
	// 	Core._dbAnimeGeneratorInstance.__startDbWorldClock();
	// }
	/**
	 * 关闭龙骨谷歌动画计时器
	 */
	// export function dbStopDbWorldClock(): void {
	// 	Core._dbAnimeGeneratorInstance.__stopDbWorldClock();
	// }
}

