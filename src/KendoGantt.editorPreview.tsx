import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { KendoGanttPreviewProps } from "../typings/KendoGanttProps";

export function preview({ sampleText }: KendoGanttPreviewProps): ReactElement {
    return <HelloWorldSample sampleText={sampleText} />;
}

export function getPreviewCss(): string {
    return require("./ui/KendoGantt.css");
}
