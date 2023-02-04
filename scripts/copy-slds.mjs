import fs from "fs-extra";

fs.copy(
    "node_modules/@salesforce-ux/design-system/assets",
    "src/assets",
    (err) => {
        if (err) return console.error(err);
        console.log("SLDS was successfully copied!");
    }
);
