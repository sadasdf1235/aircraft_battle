import {
  _decorator,
  Component,
  NodeEventType,
  Prefab,
  Vec3,
  instantiate,
  resources,
  SpriteFrame,
  Sprite,
  Collider2D,
  Contact2DType,
} from "cc";
import { loadAudio } from "../utils";
const { ccclass, property } = _decorator;

@ccclass("playerControl")
export class playerControl extends Component {
  @property(Prefab)
  bulletPre: Prefab = null;
  enemyNames = ["enemy1", "enemy2", "enemy3"];
  destoryFrames = ["me_destroy_1", "me_destroy_2", "me_destroy_3"];
  start() {
    this.node.on(NodeEventType.TOUCH_MOVE, (event) => {
      const location = event.getLocation();
      this.node.setWorldPosition(
        new Vec3(
          location.x,
          this.node.worldPosition.y,
          this.node.worldPosition.z
        )
      );
    });

    // 创建子弹
    this.schedule(() => {
      const bullet = instantiate(this.bulletPre);
      // bullet.setParent(director.getScene());
      bullet.setParent(this.node.parent);
      bullet.setWorldPosition(
        new Vec3(
          this.node.worldPosition.x,
          this.node.worldPosition.y + 60,
          this.node.worldPosition.z
        )
      );
    }, 0.5);

    // 注册单个碰撞体的回调函数
    let collider = this.getComponent(Collider2D);
    collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
  }

  update(deltaTime: number) {}

  onBeginContact(selfCollider, otherCollider, contact) {
    if (this.enemyNames.includes(otherCollider.node.name)) {
      // 敌机死亡
      otherCollider.node.getComponent("enemyControl").die();
      // 玩家死亡
      this.die(otherCollider.node.name);
    }
  }

  die(name) {
    const index = this.enemyNames.findIndex(item => item == name);
    resources.load(
      `images/${this.destoryFrames[index]}/spriteFrame`,
      SpriteFrame,
      (err, res) => {
        this.getComponent(Sprite).spriteFrame = res;
      }
    );
    loadAudio(this, "audio/me_down", true);
    setTimeout(() => {
      // 玩家死亡
      this.node.destroy();
      // 游戏结束 销毁
      this.node.getParent().destroy();
    }, 300);
  }
}
