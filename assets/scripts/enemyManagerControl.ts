import { _decorator, Component, instantiate, Prefab, find } from "cc";
import { bgControl } from "./bgControl";
const { ccclass, property } = _decorator;

@ccclass("enemyManagerControl")
export class enemyManagerControl extends Component {
  @property(Prefab)
  enemyPre1: Prefab = null;
  @property(Prefab)
  enemyPre2: Prefab = null;
  @property(Prefab)
  enemyPre3: Prefab = null;
  start() {
    this.schedule(() => {
        this.scheduleFunc(1)
        this.switchCate();
    }, 2);
  }

  update(deltaTime: number) {
    
  }
  scheduleFunc(category: number) {
    let enemy = null;
    if (category == 1) {
      enemy = instantiate(this.enemyPre1);
    } else if (category == 2) {
      enemy = instantiate(this.enemyPre2);
    } else {
      enemy = instantiate(this.enemyPre3);
    }
    const x = Math.random() * 400 + 20;
    enemy.setPosition(x, this.node.getPosition().y, this.node.getPosition().z);
    this.node.addChild(enemy);
  }

  switchCate() {
    const bgCtrl: bgControl = find("Canvas/bg").getComponent(bgControl);
    if (bgCtrl.score > 300) {
      this.schedule(() => this.scheduleFunc(2), 6);
    } else if (bgCtrl.score > 600) {
      this.schedule(() => this.scheduleFunc(3), 18);
    }
  }
}
