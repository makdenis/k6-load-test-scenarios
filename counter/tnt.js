import tarantool from "k6/x/tarantool";
import exec from "k6/execution";


const conn = tarantool.connect();
export const options = {
    discardResponseBodies: true,
    scenarios: {
        incr: {
            executor: "constant-vus",
            exec: "incr",
            vus: 1750,
            duration: "120s",
        },
        decr: {
            executor: "constant-vus",
            exec: "decr",
            vus: 1750,
            duration: "120s",
        },
    },
};
export function setup() {
    for (let i = 1; i < 1751; i++) {
        tarantool.replace(conn, "test", [i.toString(), 0]);
    }

};
export function incr() {
    tarantool.call(conn, "box.space.test:update", [exec.vu.idInInstance
        .toString(), [
            ["+", 2, 1]
        ]
    ])
}
export function decr() {
    tarantool.call(conn, "box.space.test:update", [exec.vu.idInInstance
        .toString(), [
            ["-", 2, 1]
        ]
    ])
}