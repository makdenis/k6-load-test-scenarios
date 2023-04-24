import tarantool from "k6/x/tarantool";
import exec from "k6/execution";


const conn = tarantool.connect("host:port");
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
    tarantool.replace(conn, "test", [exec.vu.iterationInInstance + exec.vu
        .idInInstance * 100, (exec.vu.iterationInInstance + exec.vu
            .idInInstance * 1000).toString()
    ])
};
export function get() {
    tarantool.call(conn, "box.space.test:select", [exec.vu.iterationInInstance +
        exec.vu.idInInstance * 100
    ])
};
export function del() {
    tarantool.call(conn, "box.space.test:delete", [exec.vu.iterationInInstance +
        exec.vu.idInInstance * 100
    ])
};
