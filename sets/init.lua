box.cfg{listen="127.0.0.1:3301"}
box.schema.user.grant("guest","read,write,execute,create,drop","universe")
box.schema.space.create("test")
box.schema.sequence.create("S",{min=1, start=1})
box.space.test:format({{name="id", type="unsigned"},{name="name", type="string"}, {name="value", type="string"}})
box.space.test:create_index("primary", {sequence="S", parts={"id"}})
box.space.test:create_index("name", {unique=false, parts={"name"}})
