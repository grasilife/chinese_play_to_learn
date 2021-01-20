class Effect extends egret.DisplayObjectContainer {
	// 动画特效的容器
	// public effectObject: egret.DisplayObjectContainer = null;
	// 帧动画
	public movieClip: egret.MovieClip = null;
	// 动画是否可播放
	private canPlaying: boolean = false;
	// 已播放时长
	private runningTime: number = -1;
	// 动画播放时长
	private durationTime: number = 0;
	// 动画的位置
	private e_x: number = 0;
	private e_y: number = 0;

	// 动画资源的名字
	public effectName: string = null;
	// 动画的大小缩放
	private mcScaleX: number = 1;
	private mcScaleY: number = 1;

	/**
	 * 帧动画资源名, 动画播放时长
	 */
	public constructor(effectName: string, durationTime: number = 0) {
		super();
		this.effectName = effectName;
		//this.effectObject = new egret.DisplayObjectContainer();
		this.durationTime = durationTime;
		this.loadEffect();
	}

	private loadEffect() {
		let keyJson = this.effectName + '_json';
		let keyImg = this.effectName + '_png';
		if (RES.hasRes(keyJson)) {
			let jsonData = RES.getRes(keyJson);
			let imgData = RES.getRes(keyImg);
			if (!jsonData || !imgData) {
				console.log(this.effectName + "is null.");
			}
			let mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(jsonData, imgData);
			this.movieClip = new egret.MovieClip(mcFactory.generateMovieClipData(Object.keys(jsonData.mc)[0]));
		} else {
			console.log('加载动效资源失败: ' + this.effectName);
		}
	}

	private applyEffect(frame = 0, playTimes?: number) {
		if (!this.movieClip) {
			this.loadEffect();
		}
		if (!this.canPlaying) {
			return;
		}
		this.movieClip.scaleX = this.mcScaleX;
		this.movieClip.scaleY = this.mcScaleY;
		this.removeChildren();
		this.addChild(this.movieClip);

		return new Promise((resolve, reject) => {
			this.resolve = resolve;
			if (!this.movieClip.hasEventListener(egret.Event.COMPLETE)) {
				this.movieClip.addEventListener(egret.Event.COMPLETE, this.playComplete, this);
			}
			if (this.durationTime) {
				Core.EventManager.AddEvent(this.effectName, this.playComplete, this);
			}
			// 播放(如果有播放时长控制,则默认循环播放)
			this.movieClip.gotoAndPlay(frame, this.durationTime ? -1 : playTimes);
		})
	}
	private resolve: (value?: {} | PromiseLike<{}>) => void;
	// 动画播放完成
	private playComplete() {
		if (this.movieClip && this.movieClip.hasEventListener(egret.Event.COMPLETE)) {
			this.movieClip.removeEventListener(egret.Event.COMPLETE, this.playComplete, this);
		}
		Core.EventManager.ClearEvent(this.effectName);
		// 
		this.stop();
		this.resolve('complete');
	}
	/**
	 * 将自身添加到显示列表
	 * @param parent 要添加到的父类
	 * @param isCenter 是否居中显示
	 * @param index: 插入父类,指定层级
	 */
	public bindTo(parent: egret.DisplayObjectContainer, isCenter: boolean = false, index: number = null) {
		if (index == null) {
			parent.addChild(this);
		} else {
			parent.addChildAt(this, index);
		}
		if (isCenter) {
			this.anchorOffsetX = this.movieClip.width / 2;
			this.anchorOffsetY = this.movieClip.height / 2;
			this.x = parent.width / 2;
			this.y = parent.height / 2;
		}
	}
	/**
	 * 将播放头移到指定帧并播放
	 * @param frame {any} 指定帧的帧号或帧标签
	 * @param playTimes {number} 播放次数。 参数为整数，可选参数，>=1：设定播放次数，<0：循环播放，默认值 0：不改变播放次数，
	 * @version Egret 2.4
	 * @platform Web,Native
	 */
	public async play(frame = 0, playTimes?: number) {
		this.canPlaying = true;
		this.runningTime = 0;
		// 如果有播放时长限制
		if (this.durationTime) {
			this.currTime = egret.getTimer();
			this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
		}
		return await this.applyEffect(frame, playTimes);
		// return true;
	}

	//移除动画
	public remove(parent: egret.DisplayObjectContainer) {
		this.parent.removeChildren();
	}

	// 停止播放
	public stop() {
		this.canPlaying = false;
		// this.removeChildren();
		if (this.hasEventListener(egret.Event.ENTER_FRAME)) {
			this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
		}
		// this.movieClip = null;
		this.movieClip && this.movieClip.stop();
	}
	// update
	private currTime: number = 0;
	public update(event: egret.Event) {
		let now = egret.getTimer();
		let dt = now - this.currTime;
		this.currTime = now;
		if (this.canPlaying) {
			this.runningTime += dt;
			if (this.durationTime > 0 && this.runningTime > this.durationTime) {
				// 播放时长一到,就停止动画
				this.stop();
				Core.EventManager.RunEvent(this.effectName, ['timeComplete']);
			}
		}
	}
	// 设置播放时长
	public setDuration(duration: number) {
		this.durationTime = duration;
	}
	// 设置播放时长
	public setScale(mcScaleX: number, mcScaleY: number) {
		this.mcScaleX = mcScaleX;
		this.mcScaleY = mcScaleY;
	}


	/**
	 * 停止播放并停止到某帧
	 * @param frame 帧数
	*/
	public gotoAndStop(frame: number) {
		this.canPlaying = false;
		// this.removeChildren();
		if (this.hasEventListener(egret.Event.ENTER_FRAME)) {
			this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
		}
		// this.movieClip = null;
		this.movieClip && this.movieClip.gotoAndStop(frame);
	}
	/**
	 * 继续播放直到停止
	 */
	public continuePlayToEnd() {
		let currentFrame = this.movieClip.currentFrame;
		this.movieClip.gotoAndStop(currentFrame);
		return new Promise((resolve, reject) => {
			// if (!this.movieClip.hasEventListener(egret.Event.COMPLETE)) {

			this.movieClip.addEventListener(egret.Event.COMPLETE, playComplete, this);
			// }
			this.movieClip.gotoAndPlay(currentFrame, 1);
			// 自动播放完成
			let self = this;
			function playComplete(e) {
				if (self.movieClip && self.movieClip.hasEventListener(egret.Event.COMPLETE)) {
					self.movieClip.removeEventListener(egret.Event.COMPLETE, playComplete, this);
				}
				console.log('---->333');

				resolve('complete');
			}
		})
	}

	// /**
	//  * waring: 慎用,可能用引起native端的报错
	//  */
	// public dispose() {
	// 	let keyJson = this.effectName + '_json';
	// 	let keyImg = this.effectName + '_png';
	// 	RES.destroyRes(keyJson);
	// 	RES.destroyRes(keyImg);
	// }
}