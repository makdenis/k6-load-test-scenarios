box.cfg{listen="127.0.0.1:3301"}
box.schema.user.grant("guest","read,write,execute,create,drop","universe")
box.schema.space.create("test")
box.space.test3:format({{name="name", type="string"}, {name="value", type="integer"}})
box.space.test3:create_index("primary", {parts={"name"}})