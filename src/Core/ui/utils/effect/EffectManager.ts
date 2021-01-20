/**
 * 动效管理器(帧动画/龙骨/粒子等)
 * coder by 陈斌
 * 2021/1/4
 */
module Core {
	export class EffectManager {
		private static _instance: EffectManager = null;
		public static getInstance(): EffectManager {
			if (this._instance == null)
				this._instance = new EffectManager();
			return this._instance;
		}

		private static effectPool = {};

		/**
		 * 获取序列帧动画
		 */
		public static getMcEffect(effectName: string, durationTime: number = 0): Effect {
			let effect: Effect = null;
			if (this.effectPool[effectName] != null) {
				effect = this.effectPool[effectName].pop();
			}
			if (effect == null) {
				effect = new Effect(effectName, durationTime);
			}
			return effect;
		}
		/**
		 * 回收序列帧动画
		 */
		public static collectMcEffect(effect: Effect) {
			if (!this.effectPool[effect.effectName]) {
				this.effectPool[effect.effectName] = [];
			}
			this.effectPool[effect.effectName].push(effect);
		}
		/**
		 * 获取一个龙骨动画
		 * @param fileName: 文件前缀名
		 * @param ArmName: 元件/骨架名
		 */
		public static getDbEffect(fileName: string, ArmName: string): DbAnimation {
			return new DbAnimation(fileName, ArmName);
		}
	}

}