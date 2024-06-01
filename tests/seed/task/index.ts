import { exampleTaskData, exampleDependencyData } from "../../../src/components/data";
import Big from "big.js";

interface Task {
    id: number;
    title: string;
    orderId: number;
    start: Date;
    end: Date;
    parentId: number | null;
    percentComplete: number;
    children?: Task[];
}

function flatten(rootTask: Task): Task[] {
    const result = [rootTask];
    rootTask.children?.forEach((child: Task) => result.push(...flatten(child)));
    return result;
}

async function seedTask(entity: string, cb: (e: any) => void): Promise<any> {
    return new Promise((resolve, reject) => {
        window.mx.data.create({
            entity,
            callback(obj) {
                cb(obj);
                resolve(obj);
            },
            error(e) {
                console.error("Could not commit object:", e);
                reject(e);
            }
        });
    });
}

async function commit(objs: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
        window.mx.data.commit({
            mxobjs: objs,
            callback() {
                console.log("Committed successfully");
                resolve();
            },
            error(e) {
                console.error("Could not commit objects:", e);
                reject(e);
            }
        });
    });
}

async function removeAll(entity: string): Promise<void> {
    const tasks = await retrieveAll(entity);
    return new Promise((resolve, reject) => {
        window.mx.data.remove({
            guids: tasks.map(task => task.getGuid()),
            callback() {
                console.log("Removed all tasks");
                resolve();
            },
            error(e) {
                console.error("Could not remove tasks:", e);
                reject(e);
            }
        });
    });
}

async function retrieveAll(entity: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
        window.mx.data.get({
            xpath: `//${entity}`,
            callback(objs) {
                resolve(objs);
            },
            error(e) {
                console.error("Could not retrieve objects:", e);
                reject(e);
            }
        });
    });
}

async function main(rootTask: Task): Promise<void> {
    await removeAll("MyFirstModule.TaskData");
    const taskObjs = [];
    const tasks = flatten(rootTask);
    const id2IndexCache: { [id: number]: number } = {};
    const guidCache: string[] = [];

    for (const [index, task] of tasks.entries()) {
        const obj = await seedTask("MyFirstModule.TaskData", e => {
            e.set("Title", task.title);
            e.set("_Id", task.id);
            e.set("OrderID", task.orderId);
            e.set("Start", task.start);
            e.set("End", task.end);
            e.set("PercentComplete", Big(task.percentComplete).toFixed(8)); // 限制小数点后 8 位)
        });
        taskObjs.push(obj);
        // cache task object with obj.getGuid() and index for later use
        id2IndexCache[task.id] = index;
        guidCache.push(obj.getGuid());
    }
    // update parent-child relationships
    for (const obj of taskObjs) {
        const _Id = obj.get("_Id").toNumber();
        const index = id2IndexCache[_Id];
        const parentId = tasks[index].parentId;
        if (parentId == null) {
            continue;
        }
        const parentIndex = id2IndexCache[parentId];
        const parentObj = taskObjs[parentIndex];
        obj.set("MyFirstModule.TaskData_TaskData_Parent", parentObj);
    }

    await commit(taskObjs);

    await removeAll("MyFirstModule.DependencyData");
    const dependencyObjs = [];
    for (const [, dep] of exampleDependencyData.entries()) {
        const obj = await seedTask("MyFirstModule.DependencyData", e => {
            e.set("MyFirstModule.DependencyData_TaskData_From", guidCache[id2IndexCache[dep.fromId]]);
            e.set("MyFirstModule.DependencyData_TaskData_To", guidCache[id2IndexCache[dep.toId]]);
            e.set("DependencyType", dep.type);
        });
        dependencyObjs.push(obj);
    }
    await commit(dependencyObjs);
}
main(exampleTaskData[0]);
