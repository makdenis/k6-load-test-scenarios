box.cfg{listen="127.0.0.1:3301"}
box.schema.user.grant("guest","read,write,execute,create,drop","universe")
box.schema.space.create("test")
box.space.test:format({{name="name", type="unsigned"}, {name="value", type="string"}})
box.space.test:create_index("primary", {parts={"name"}})
