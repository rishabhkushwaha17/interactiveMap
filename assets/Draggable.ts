import { _decorator, Component, Node, Vec2, EventTouch, UITransform, Vec3, input, Input } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MapManager')
export class MapManager extends Component {
  @property(Node)
  mapNode: Node | null = null;

  private mapStartPos: Vec2 = new Vec2();
  private isDragging: boolean = false;
  start() {
    input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    input.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
  }

  onTouchStart(event: EventTouch) {
    this.isDragging = true;
  }

  onTouchMove(event: EventTouch) {
    if (!this.isDragging) return;
    const delta = event.getDelta();
    const newPos = this.mapStartPos.add(delta)
    this.mapNode.setPosition(new Vec3(newPos.x, newPos.y, 0));
  }

  onTouchEnd(event: EventTouch) {
    this.isDragging = false;
  }
}
