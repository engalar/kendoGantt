import { defineConfig } from "vite";
import vitePluginMendix from "@engalar/vite-plugin-mendix";
import pkg from "./package.json";

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
            entry: "tests/seed/task/index.ts",
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
