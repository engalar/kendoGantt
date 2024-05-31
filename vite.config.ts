import { defineConfig } from "vite";
import vitePluginMendix from "@engalar/vite-plugin-mendix";
import pkg from "./package.json";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vitePluginMendix({
            widgetName: pkg.widgetName,
            widgetPackage: pkg.packagePath,
            testProject: pkg.config.projectPath
        })
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, "tests/seed/task/index.js"),
            name: "SeedLib",
            fileName: (format, entryName) => `SeedLib-${entryName}.${format}.js`
        },
        rollupOptions: {
            output: {
                format: "amd"
            },
            external: ["react", "react-dom", "react/jsx-runtime", "big.js"]
        }
    }
});
