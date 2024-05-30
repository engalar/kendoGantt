import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { KendoGanttContainerProps } from "../typings/KendoGanttProps";

import "./ui/KendoGantt.css";

export function KendoGantt({ sampleText }: KendoGanttContainerProps): ReactElement {
    return <HelloWorldSample sampleText={sampleText ? sampleText : "World"} />;
}
