import { createServer } from "lwr";

const lwrServer = createServer({ serverType: "express" });

const app = lwrServer.getInternalServer();

app.get("/api/hello", (req, res) => {
    res.json({ greeting: "Hello!" });
});

lwrServer
    .listen(({ port, serverMode }) => {
        console.log(`Server started on port ${port} in ${serverMode} mode`);
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
