/**
 * This file was generated from KendoGantt.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ListValue, ListAttributeValue } from "mendix";
import { Big } from "big.js";

export interface KendoGanttContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    data: ListValue;
    idAttribute: ListAttributeValue<Big>;
    titleAttribute: ListAttributeValue<string>;
    startDateAttribute: ListAttributeValue<Date>;
    endDateAttribute: ListAttributeValue<Date>;
    progressAttribute: ListAttributeValue<Big>;
    parentIdAttribute: ListAttributeValue<Big>;
    dependencies: ListValue;
    dependenciesType: ListAttributeValue<Big>;
    fromIdAttribute: ListAttributeValue<Big>;
    toIdAttribute: ListAttributeValue<Big>;
}

export interface KendoGanttPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    data: {} | { caption: string } | { type: string } | null;
    idAttribute: string;
    titleAttribute: string;
    startDateAttribute: string;
    endDateAttribute: string;
    progressAttribute: string;
    parentIdAttribute: string;
    dependencies: {} | { caption: string } | { type: string } | null;
    dependenciesType: string;
    fromIdAttribute: string;
    toIdAttribute: string;
}
