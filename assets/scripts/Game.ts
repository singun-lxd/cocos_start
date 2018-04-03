// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {
    // 这个属性引用了星星预制资源
    @property(cc.Prefab)
    starPrefab: cc.Prefab = null;

    // 星星产生后消失时间的随机范围
    @property
    maxStarDuration: number = 0;
    @property
    minStarDuration: number = 0;

    // 地面节点，用于确定星星生成的高度
    @property(cc.Node)
    ground: cc.Node = null;

    // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
    @property(cc.Node)
    player: cc.Node = null;

    private groundY: number;

    public spawnNewStar(): void {
        // 使用给定的模板在场景中生成一个新节点
        let newStar: cc.Node = cc.instantiate(this.starPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());

        // 将 Game 组件的实例传入星星组件
        newStar.getComponent('Star').game = this;
    }

    private getNewStarPosition(): cc.Vec2 {
        let randX: number = 0;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        let randY: number = this.groundY + cc.random0To1() * this.player.getComponent('Player').jumpHeight + 50;
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        let maxX: number = this.node.width/2;
        randX = cc.randomMinus1To1() * maxX;
        // 返回星星坐标
        return cc.p(randX, randY);
    }

    // LIFE-CYCLE CALLBACKS:

    protected onLoad(): void {
        // 获取地平面的 y 轴坐标
        this.groundY = this.ground.y + this.ground.height/2;
        // 生成一个新的星星
        this.spawnNewStar();
    }
}
