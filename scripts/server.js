import { createServer } from "lwr";
import helmet from "helmet";

const PORT = parseInt(process.env.PORT || "3001", 10);
const SERVER_MODE = process.env.NODE_ENV || "prod";

// Create the LWR App Server
const lwrServer = createServer({
    serverMode: SERVER_MODE,
    port: PORT,
});

// Get the internal express app
const expressApp = lwrServer.getInternalServer("express");

expressApp.enable("trust proxy");
expressApp.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                scriptSrcAttr: ["'unsafe-inline'"],
                scriptSrc: [
                    "'self'",
                    "https://apis.google.com",
                    "https://www.google.com",
                    "https://www.gstatic.com",
                    "'unsafe-inline'",
                ],
                childSrc: [
                    "'self'",
                    "https://www.google.com",
                    "https://accounts.google.com/",
                ],
                frameAncestors: [
                    "'self'",
                    "https://jesperklang-dev-ed.my.salesforce.com",
                    "https://klangdev-dev-ed.my.salesforce.com/",
                ],
                imgSrc: [
                    "'self'",
                    "https://ssl.gstatic.com",
                    "https://csi.gstatic.com",
                ],
            },
        },
        noSniff: false,
    })
);

expressApp.get("/api/hello", (req, res) => {
    res.json({ greeting: "Hello!" });
});

lwrServer
    .listen(({ port, serverMode }) => {
        console.log(`✅ App listening on port ${port} in ${serverMode} mode!`);
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
