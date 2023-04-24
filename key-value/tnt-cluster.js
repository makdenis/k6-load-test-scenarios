import tarantool from "k6/x/tarantool";
import exec from "k6/execution";


const conn = tarantool.connect("host:port");
export const options = {
    discardResponseBodies: true,
    scenarios: {
        test: {
            executor: "constant-vus",
            exec: "del",
            vus: 3500,
            duration: "120s",
        },
    },
};

export function set() {
    var key = exec.vu.iterationInInstance + exec.vu.idInInstance * 100
    tarantool.call(conn, "add", [key, (exec.vu.iterationInInstance + exec.vu
        .idInInstance * 1000).toString()])
};
export function get() {
    tarantool.call(conn, "get", [exec.vu.iterationInInstance + exec.vu
        .idInInstance * 100
    ])
};
export function del() {
    var key = exec.vu.iterationInInstance + exec.vu.idInInstance * 100
    tarantool.call(conn, "del", [key])
};