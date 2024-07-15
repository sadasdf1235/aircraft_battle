import { _decorator, Component, SpriteFrame, Sprite, resources } from "cc";
import { loadAudio } from "../utils";
import { ScreenState } from "../enum/screenEnum";
const { ccclass, property } = _decorator;

enum EnemyType {
  Type1,
  Type2,
  Type3,
}

@ccclass("enemyControl")
export class enemyControl extends Component {
  @property
  speed: number = 100;
  @property
  enemyType: EnemyType = EnemyType.Type1;
  start() {
    if(this.enemyType == EnemyType.Type3){
        loadAudio(this, "audio/enemy3_flying", true);
    }
  }

  update(deltaTime: number) {
    this.node.setPosition(
      this.node.position.x,
      this.node.position.y - this.speed * deltaTime
    );
    if (this.node.position.y < -ScreenState.HEIGHT) {
      this.node.destroy();
    }
  }

  protected onDestroy(): void {
    console.log("enemyControl onDestroy", this.node.getPosition().y);
  }

  die() {
    const enemyNames = ["enemy1", "enemy2", "enemy3"];
    // 死亡动画
    resources.load(
      `images/${enemyNames[this.enemyType]}_down1/spriteFrame`,
      SpriteFrame,
      (err, res) => {
        this.getComponent(Sprite).spriteFrame = res;
      }
    );
    // 死亡音效
    loadAudio(this, `audio/enemy1_down`, true);
    setTimeout(() => {
      this.node.destroy();
    }, 300);
  }
}
