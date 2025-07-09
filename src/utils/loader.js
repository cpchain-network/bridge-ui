import Vue from '@/main'
export function createLoader(data) {
    let item = data ? data : {
        // Optional parameters
        width: 100,
        height: 100,
        color: "#F46159",
        canCancel: true,
        // onCancel: this.onCancel,
        loader: "dots"
    };
    return Vue.$loading.show(item);
}