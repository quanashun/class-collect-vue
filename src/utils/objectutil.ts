export function isEmptyObject(obj: object): boolean {
    console.log(JSON.stringify(obj))
    return JSON.stringify(obj) == "{}";
}

