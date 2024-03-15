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
            const zoomStep = delta * 0.5; // Adjust the zoom speed as needed
            let newOrthoHeight = clamp(this.camera!.orthoHeight - zoomStep, this.minZoom, this.maxZoom);
            let ui = this.node.getComponent(UITransform)
            tween(this.camera.node).to(0.5, {
                position: new Vec3(e.getUILocation().x - (ui.width * 0.5), e.getUILocation().y - (ui.height * 0.5), 0),
            }, {
                onStart: (target) => {
                    tween(this.camera).to(0.5, { orthoHeight: newOrthoHeight }).start();
                }
            }).start();
            // this.camera!.orthoHeight = newOrthoHeight;
            this.previousValue = Math.ceil(delta);
        }
    }

    update(deltaTime: number) {
        // Additional update logic can be added here if needed
    }
}
