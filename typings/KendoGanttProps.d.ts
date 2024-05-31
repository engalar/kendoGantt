/**
 * This file was generated from KendoGantt.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ListValue, ListAttributeValue, ListReferenceValue } from "mendix";
import { Big } from "big.js";

export interface KendoGanttContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    data: ListValue;
    titleAttribute: ListAttributeValue<string>;
    startDateAttribute: ListAttributeValue<Date>;
    endDateAttribute: ListAttributeValue<Date>;
    progressAttribute?: ListAttributeValue<Big>;
    dependencies?: ListValue;
    dependenciesType?: ListAttributeValue<Big>;
    fromAssociation?: ListReferenceValue;
    fromObjectsDatasource: ListValue;
    toAssociation?: ListReferenceValue;
    toObjectsDatasource: ListValue;
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
    titleAttribute: string;
    startDateAttribute: string;
    endDateAttribute: string;
    progressAttribute: string;
    dependencies: {} | { caption: string } | { type: string } | null;
    dependenciesType: string;
    fromAssociation: string;
    fromObjectsDatasource: {} | { caption: string } | { type: string } | null;
    toAssociation: string;
    toObjectsDatasource: {} | { caption: string } | { type: string } | null;
}
