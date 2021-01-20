class DbAnimation {
	public db: dragonBones.EgretArmatureDisplay;
	public fileName: string;
	public factory: dragonBones.EgretFactory;
	/** 当前龙骨是否正在播放动画 */
	public isPlaying: boolean = false;
	/**
	 * 当前正在播放动画的名称
	 */
	public currentDbName = '';
	/**
	 * 生成龙骨动画
	 */
	public constructor(fileName, ArmName) {
		this.factory = new dragonBones.EgretFactory();
		let skeData: any = RES.getRes(`${fileName}_ske_json`);
		let texData: any = RES.getRes(`${fileName}_tex_json`);
		let texture: egret.Texture = RES.getRes(`${fileName}_tex_png`);

		if (!skeData || !texData || !texture) {
			console.log('龙骨动画资源加载失败:' + fileName);
			return;
		}
		this.factory.parseDragonBonesData(skeData);
		this.factory.parseTextureAtlasData(texData, texture);
		this.db = this.factory.buildArmatureDisplay(ArmName);
	}
	/**
	 * 将自身添加到显示列表
	 * @param parent 要添加到的父类
	 * @param isCenter 是否居中显示
	 * @param index: 插入父类,指定层级
	 */
	public bindTo(parent: egret.DisplayObjectContainer, isCenter: boolean = false, index: number = null) {
		if (!this.db) {
			console.log('龙骨动画:' + this.fileName + '不存在');
			return;
		}
		if (index == null) {
			parent.addChild(this.db);
		} else {
			parent.addChildAt(this.db, index);
		}
		if (isCenter) {
			this.db.anchorOffsetX = this.db.width / 2;
			this.db.anchorOffsetY = this.db.height / 2;
			this.db.x = parent.width / 2;
			this.db.y = parent.height / 2;
		}
	}
	/**
	 * - 播放指定动画。
	 * @param animationName - 动画数据名称。 （如果未设置，则播放默认动画，或将暂停状态切换为播放状态，或重新播放之前播放的动画）
	 * @param playTimes - 循环播放次数。 [-1: 使用动画数据默认值, 0: 无限循环播放, [1~N]: 循环播放 N 次] （默认: -1）
	 * @returns 播放的动画状态。
	 * @example
	 * <pre>
	 *     armature.animation.play("walk");
	 * </pre>
	 */
	public play(animationName?: string | null, playTimes?: number, callback?: Function, thisObj?: any) {
		if (!this.db) {
			console.log('龙骨动画:' + this.fileName + '不存在');
			return;
		}
		let self = this;
		function dbComplete() {
			self.db.removeEventListener(dragonBones.EventObject.COMPLETE, dbComplete, this);
			self.isPlaying = false;
			callback && callback.call(thisObj);
			self.currentDbName = null;
		}
		this.db.addEventListener(dragonBones.EventObject.COMPLETE, dbComplete, this);
		let stage = this.db.animation.play(animationName, playTimes);
		this.isPlaying = true;
		this.currentDbName = stage.name;
	}
	/**
	 * - 暂停指定动画状态的播放。
	 * @param animationName - 动画状态名称。 （如果未设置，则暂停所有动画）
	 * @see dragonBones.AnimationState
	 * @version DragonBones 3.0
	 * @language zh_CN
	 */
	public stop(animationName?: string | null): void {
		if (!this.db) {
			console.log('龙骨动画:' + this.fileName + '不存在');
			return;
		}
		this.db.animation.stop(animationName);
	}

	/**
	 * - 指定插槽替换选项图。
	 * @param slotName - 插槽名称。
	 * @param textureName - 资源名
	 * @param itemWH - 选项图尺寸
	 * @see dragonBones.AnimationState
	 * @version DragonBones 3.0
	 * @language zh_CN
	 */
	public replaceSlot(slotName: string | null, textureName: string, itemWH: number): void {
		if (!this.db) {
			console.log('龙骨动画:' + this.fileName + '不存在');
			return;
		}

		var repImage: egret.Bitmap = new egret.Bitmap();
		let slot: dragonBones.Slot = this.db.armature.getSlot(slotName);//找到包含要换装的图片的插槽=
		repImage.texture = RES.getRes(textureName);
		repImage.width = repImage.height = itemWH;
		repImage.anchorOffsetX = repImage.width / 2;
		repImage.anchorOffsetY = repImage.height / 2;
		repImage.x = slot.display.x;
		repImage.y = slot.display.y;

		slot.setDisplay(repImage);//替换插槽的显示对象
	}

}
