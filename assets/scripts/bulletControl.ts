import { _decorator, Component, find, Collider2D, Contact2DType } from "cc";
import { ScreenState } from "../enum/screenEnum";
import { bgControl } from "./bgControl";
const { ccclass, property } = _decorator;

@ccclass("bulletControl")
export class bulletControl extends Component {
  @property
  speed: number = 800;
  start() {
    // 注册单个碰撞体的回调函数
    let collider = this.getComponent(Collider2D);
    collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
  }

  update(deltaTime: number) {
    this.node.setPosition(
      this.node.position.x,
      this.node.position.y + this.speed * deltaTime
    );
    if (this.node.position.y > ScreenState.HEIGHT) {
      this.node.destroy();
    }
  }

  onBeginContact(selfCollider, otherCollider, contact) {
    const bgCtrl: bgControl = find("Canvas/bg").getComponent(bgControl);
    if (otherCollider.node.name == "enemy1") {
        bgCtrl.increaseScore(10);
    }else if (otherCollider.node.name == "enemy2") {
        bgCtrl.increaseScore(50);
    }else {
        bgCtrl.increaseScore(100);
    }
    otherCollider.node.getComponent("enemyControl").die();
    this.node.destroy();
  }
}
