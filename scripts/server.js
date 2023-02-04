import { createServer } from "lwr";

const PORT = parseInt(process.env.PORT || "3001", 10);
console.log(process.env.NODE_ENV);
const SERVER_MODE = process.env.NODE_ENV || "prod";

// Create the LWR App Server
const lwrServer = createServer({
    serverMode: SERVER_MODE,
    port: PORT,
});

// Get the internal express app
const expressApp = lwrServer.getInternalServer("express");

expressApp.get("/api/hello", (req, res) => {
    res.json({ greeting: "Hello!" });
});

lwrServer
    .listen(({ port, serverMode }) => {
        console.log(`✅ App listening on port ${port} in ${serverMode} mode!`);
        console.log(`Url http://localhost:${port}`);
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });