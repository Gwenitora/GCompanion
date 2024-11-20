class DataLink {
    private datas: { [actionId in string]: any } = {};

    public setDatas(action: string, datas: any): void {
        this.datas[action] = datas;
    }

    public getDatas(action: string): any {
        return this.datas[action];
    }
}

const dataLink = new DataLink();
export default dataLink;