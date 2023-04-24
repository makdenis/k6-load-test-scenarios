import tarantool from "k6/x/tarantool";
import exec from "k6/execution";


const conn = tarantool.connect();
export const options = {
    discardResponseBodies: true,
    scenarios: {
        test: {
            executor: "constant-vus",
            exec: "set",
            vus: 3500,
            duration: "120s",
        },
    },
};

export function set() {
    tarantool.replace(conn, "test", [exec.vu.idInInstance * 1000, (exec.vu
            .iterationInInstance + exec.vu.idInInstance * 1000)
        .toString()
    ])
}
export function search() {
    tarantool.call(conn, "box.space.test.index.secondary:select", [(exec.vu
            .iterationInInstance + exec.vu.idInInstance * 1000)
        .toString()
    ])
}