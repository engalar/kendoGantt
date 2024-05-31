import { exampleTaskData, exampleDependencyData } from "../../../src/components/data";
import Big from "big.js";

interface Task {
    title: string;
    orderId: number;
    start: Date;
    end: Date;
    percentComplete: number;
    children?: Task[];
}

function flatten(rootTask: Task): Task[] {
    const result = [rootTask];
    rootTask.children?.forEach((child: Task) => result.push(...flatten(child)));
    return result;
}

async function seedTask(task: Task): Promise<any> {
    return new Promise((resolve, reject) => {
        window.mx.data.create({
            entity: "MyFirstModule.TaskData",
            callback(obj) {
                obj.set("Title", task.title);
                obj.set("OrderID", task.orderId);
                obj.set("Start", task.start);
                obj.set("End", task.end);
                obj.set("PercentComplete", Big(task.percentComplete).toFixed(8)); // 限制小数点后 8 位)
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

async function removeAll(): Promise<void> {
    const tasks = await retrieveAll("MyFirstModule.TaskData");
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
    await removeAll();
    const taskObjs = [];
    const tasks = flatten(rootTask);
    for (const task of tasks) {
        const obj = await seedTask(task);
        taskObjs.push(obj);
    }
    // update parent-child relationships
    for (const task of tasks) {
        if (task.children) {
            const parentObj = taskObjs.find(obj => obj.get("Title") === task.title);
            for (const child of task.children) {
                const childObj = taskObjs.find(obj => obj.get("Title") === child.title);
                if (childObj) {
                    childObj.set("MyFirstModule.TaskData_TaskData_Parent", parentObj);
                }
            }
        }
    }

    await commit(taskObjs);
}
main(exampleTaskData[0]);
