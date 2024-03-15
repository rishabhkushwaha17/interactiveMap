import { _decorator, Camera, clamp, Component, EventMouse, input, Input, tween, UITransform, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MapManager')
export class MapManager extends Component {
    @property(Camera)
    camera: Camera | null = null;
    minZoom = 1;
    maxZoom = 357.669;
    previousValue = -Infinity;
    start() {
        input.on(Input.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
    }

    onMouseWheel(e: EventMouse) {
        const delta = e.getScrollY();
        if (Math.ceil(delta) != this.previousValue) {
            let moveToValue = clamp(this.camera.orthoHeight - (e.getScrollY() * 2), this.minZoom, this.maxZoom);
            console.log(e.getScrollY());
            if (moveToValue >= this.minZoom && moveToValue < this.maxZoom) {
                // this.node.getComponent(UITransform).convertToWorldSpaceAR(new Vec3())
                let ui = this.node.getComponent(UITransform)
                console.log(ui.width, ui.height, new Vec3(e.getUILocation().x - (ui.width * 0.5), e.getUILocation().y - (ui.height * 0.5), 0));
                tween(this.camera.node).to(0.5, {
                    position: new Vec3(e.getUILocation().x - (ui.width * this.node.scale.x * 0.5), e.getUILocation().y - (ui.height * this.node.scale.y * 0.5), 0),
                }, {
                    onStart: (target) => {


                        tween(this.camera).to(1, { orthoHeight: moveToValue }).start();
                    }
                }).start();            // this.camera.orthoHeight = newValue;
                // tween(this.camera).to(1, { orthoHeight: moveToValue }).start();
            }
        }
    }

    update(deltaTime: number) {
        // Additional update logic can be added here if needed
    }
}
