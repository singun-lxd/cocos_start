"use strict";
cc._RF.push(module, '562f96TXZ9Dypk+7iZFeQOg', 'Star');
// scripts/Star.ts

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("./Game");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Star = /** @class */ (function (_super) {
    __extends(Star, _super);
    function Star() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pickRadius = 0;
        _this.game = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    Star.prototype.start = function () {
    };
    __decorate([
        property
    ], Star.prototype, "pickRadius", void 0);
    __decorate([
        property(Game_1.default)
    ], Star.prototype, "game", void 0);
    Star = __decorate([
        ccclass
    ], Star);
    return Star;
}(cc.Component));
exports.default = Star;

cc._RF.pop();