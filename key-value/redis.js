import redis from "k6/experimental/redis";
import exec from "k6/execution";

export const options = {
    discardResponseBodies: true,
    scenarios: {
        test: {
            executor: "constant-vus",
            exec: "set_keys",
            vus: 3500,
            duration: "120s",
        },
    },
};

const client = new redis.Client({
    addrs: new Array("host:port"),
    password: "",
    db: 0,
});

export function set_keys() {
    client.set(exec.vu.iterationInInstance + exec.vu.idInInstance * 100, exec.vu
        .iterationInInstance + exec.vu.idInInstance * 1000);
}
export function get_keys() {
    client.get(exec.vu.iterationInInstance + exec.vu.idInInstance * 100);
}
export function del_keys() {
    client.del(exec.vu.iterationInInstance + exec.vu.idInInstance * 100);
}