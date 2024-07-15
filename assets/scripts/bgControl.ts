import { _decorator, Component } from "cc";
import { ScreenState } from "../enum/screenEnum";
const { ccclass, property } = _decorator;

@ccclass("bgControl")
export class bgControl extends Component {
  score: number = 0;
  start() {}

  update(deltaTime: number) {
    this.node.children.forEach((element) => {
      element.setPosition(
        element.getPosition().x,
        element.getPosition().y - 50 * deltaTime
      );
      if (element.getPosition().y < -ScreenState.HEIGHT) {
        element.setPosition(
          element.getPosition().x,
          element.getPosition().y + ScreenState.HEIGHT * 2
        );
      }
    });
  }
  increaseScore(score: number) {
    this.score += score;
  }
}
