import { ReactElement, createElement, useMemo } from "react";
import { ObjectItem, ValueStatus } from "mendix";
import { createDataTree, extendDataItem, mapTree } from "@progress/kendo-react-gantt";

import { HelloWorldSample } from "./components/HelloWorldSample";

import { KendoGanttContainerProps } from "../typings/KendoGanttProps";

import "./ui/KendoGantt.css";

export function KendoGantt({
    data,
    titleAttribute,
    startDateAttribute,
    endDateAttribute,
    progressAttribute,
    parentIdAttribute,
    dependencies,
    dependenciesType,
    fromIdAttribute,
    toIdAttribute,
    idAttribute
}: KendoGanttContainerProps): ReactElement {
    const tasks = useMemo(() => {
        if (data.status === ValueStatus.Available && data.items) {
            const flatData = data.items.map((task: ObjectItem) => {
                const pa = parentIdAttribute.get(task).value;
                return {
                    id: idAttribute.get(task).value?.toNumber(),
                    title: titleAttribute.get(task).value,
                    orderId: 0,
                    parentId: pa ? pa.toNumber() : null,
                    start: startDateAttribute.get(task).value,
                    end: endDateAttribute.get(task).value,
                    progress: progressAttribute.get(task).value?.toNumber(),
                    isExpanded: true
                };
            });
            const dataTree = createDataTree(
                flatData,
                i => i.id,
                i => i.parentId,
                "children"
            );
            return mapTree(dataTree, "children", e => {
                return extendDataItem(e, "children", {
                    isExpanded: true
                });
            });
        }
        return [];
    }, [
        data.items,
        data.status,
        endDateAttribute,
        idAttribute,
        parentIdAttribute,
        progressAttribute,
        startDateAttribute,
        titleAttribute
    ]);
    // dependecy
    const dependencyData = useMemo(() => {
        if (dependencies.status === ValueStatus.Available && dependencies.items) {
            return dependencies.items.map((dep: ObjectItem) => {
                return {
                    id: dep.id,
                    fromId: fromIdAttribute.get(dep).value?.toNumber(),
                    toId: toIdAttribute.get(dep).value?.toNumber(),
                    type: dependenciesType.get(dep).value?.toNumber()
                };
            });
        }
        return [];
    }, [dependencies.items, dependencies.status, dependenciesType, fromIdAttribute, toIdAttribute]);
    return <HelloWorldSample tasks={tasks} dependencies={dependencyData} />;
}
