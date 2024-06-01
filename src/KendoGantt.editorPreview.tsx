import { ReactElement, createElement } from "react";

export function preview(): ReactElement {
    return <span>Gantt Chart Preview</span>;
}

export function getPreviewCss(): string {
    return require("./ui/KendoGantt.css");
}
