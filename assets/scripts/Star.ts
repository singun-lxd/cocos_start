// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import Game from "./Game"

const {ccclass, property} = cc._decorator;

@ccclass
export default class Star extends cc.Component {

    @property
    pickRadius: number = 0;

    @property(Game)
    game: Game = null;

    private getPlayerDistance(): number {
        // 根据 player 节点位置判断距离
        let playerPos: cc.Vec2 = this.game.player.getPosition();
        // 根据两点位置计算两点之间距离
        let dist: number = cc.pDistance(this.node.position, playerPos);
        return dist;
    }

    private onPicked(): void {
        // 当星星被收集时，调用 Game 脚本中的接口，生成一个新的星星
        this.game.spawnNewStar();
        // 调用 Game 脚本的得分方法
        this.game.gainScore();
        // 然后销毁当前星星节点
        this.node.destroy();
    }

    // LIFE-CYCLE CALLBACKS:
    protected update(dt: number): void {
        // 每帧判断和主角之间的距离是否小于收集距离
        if (this.getPlayerDistance() < this.pickRadius) {
            // 调用收集行为
            this.onPicked();
            return;
        }

        // 根据 Game 脚本中的计时器更新星星的透明度
        let opacityRatio: number = 1 - this.game.timer/this.game.starDuration;
        let minOpacity: number = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    }
}
