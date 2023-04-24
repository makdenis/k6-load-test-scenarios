import redis from "k6/experimental/redis";
import exec from "k6/execution";

export const options = {
    discardResponseBodies: true,
    scenarios: {
        test_mem: {
            executor: "constant-vus",
            exec: "search",
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
    client.hset("test:" + exec.vu.idInInstance, "title", "test" + exec.vu
        .iterationInInstance + exec.vu.idInInstance * 100);
}
export function search() {
    let title = "test" + exec.vu.iterationInInstance + exec.vu.idInInstance *
        100
    client.sendCommand(
        "FT.SEARCH",
        "idx:test",
        title,
    );
}