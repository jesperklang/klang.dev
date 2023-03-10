import { createServer } from "lwr";
import helmet from "helmet";

// Create the LWR App Server
const lwrServer = createServer();

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

expressApp.get("/api/v1/getCustomerType", (req, res) => {
    const resultOptions = ['Paying', 'Free'];
    const randomResult = resultOptions[Math.floor(Math.random() * resultOptions.length)];
    res.json({ customerType: randomResult });
});

lwrServer
    .listen(({ port, serverMode }) => {
        console.log(`✅ App listening on port ${port} in ${serverMode} mode!`);
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
