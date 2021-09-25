export default class Device {
    constructor(id, name, description, price, deviceType, createTime) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.deviceType = deviceType;
        this.createTime = createTime;
    }
}
