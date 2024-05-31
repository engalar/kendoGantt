import { exampleTaskData, exampleDependencyData } from "../../../src/components/data";
import Big from "big.js";

function flatten(rootTask) {
    const result = [rootTask];
    rootTask.children?.forEach(child => result.push(...flatten(child)));
    return result;
}

async function seedTask(task) {
    return new Promise((resolve, reject) => {
        mx.data.create({
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

async function commit(objs) {
    await new Promise((resolve, reject) => {
        mx.data.commit({
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

async function removeAll() {
    const tasks = await retrieveAll("MyFirstModule.TaskData");
    await new Promise((resolve, reject) => {
        mx.data.remove({
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

async function retrieveAll(entity) {
    return new Promise((resolve, reject) => {
        mx.data.get({
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

async function main(rootTask) {
    await removeAll();
    const taskObjs = [];
    const tasks = flatten(rootTask);
    for (const task of tasks) {
        const obj = await seedTask(task);
        taskObjs.push(obj);
    }
    await commit(taskObjs);
}
main(exampleTaskData[0]);
