import tarantool from "k6/x/tarantool";
import exec from "k6/execution";


const conn = tarantool.connect("host:port");
export const options = {
    discardResponseBodies: true,
    scenarios: {
        test: {
            executor: "constant-vus",
            exec: "add",
            vus: 3500,
            duration: "120s",
        },
    },
};

export function add() {
    tarantool.insert(conn, "test", [null, (exec.vu.idInInstance * 1000)
        .toString(), (exec.vu.iterationInInstance + exec.vu
            .idInInstance * 100).toString()
    ])
}
export function members() {
    tarantool.call(conn, "box.space.test.index.name:select", [(exec.vu
        .idInInstance * 1000).toString()])
}