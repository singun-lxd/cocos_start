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

    // score label 的引用
    @property(cc.Label)
    scoreDisplay: cc.Label = null;

    // 得分音效资源
    @property(cc.AudioClip)
    scoreAudio: cc.AudioClip = null;

    public timer: number;
    public starDuration: number;

    private groundY: number;
    private score: number;

    public spawnNewStar(): void {
        // 使用给定的模板在场景中生成一个新节点
        let newStar: cc.Node = cc.instantiate(this.starPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());

        // 将 Game 组件的实例传入星星组件
        newStar.getComponent('Star').game = this;

        // 重置计时器，根据消失时间范围随机取一个值
        this.starDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
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

    public gainScore(): void {
        this.score += 1;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = 'Score: ' + this.score.toString();

        // 播放得分音效
        cc.audioEngine.playEffect(this.scoreAudio, false);
    }

    private gameOver(): void {
        this.player.stopAllActions(); //停止 player 节点的跳跃动作
        cc.director.loadScene('game');
    }

    // LIFE-CYCLE CALLBACKS:

    protected onLoad(): void {
        // 获取地平面的 y 轴坐标
        this.groundY = this.ground.y + this.ground.height/2;

        // 初始化计时器
        this.timer = 0;
        this.starDuration = 0;

        // 生成一个新的星星
        this.spawnNewStar();

        // 初始化计分
        this.score = 0;
    }

    protected update(dt: number): void {
        // 每帧更新计时器，超过限度还没有生成新的星星
        // 就会调用游戏失败逻辑
        if (this.timer > this.starDuration) {
            this.gameOver();
            return;
        }
        this.timer += dt;
    }
}
