//#region If
const a = do {
    if (Math.random() > 0.5) true;
    else false;
}
const b = do {
    const tmp = Math.random();
    if (tmp > 0.3) 3;
    else if (tmp > 0.6) 6;
    else 10;
}
//#endregion

//#region try
const c = do {
    try { 1; } catch { 2; }
}
const d = do {
    try { 1; } finally { 2 }
}
const e = do {
    try { 1; } catch { 2; } finally {3}
}
//#endregion

//#region Switch
const f = do {
    switch (Math.random()) {
        case 0: "lucky";
        default: "Normal";
    }
}
//#endregion

//#region Await
async function g() {
    const val = do {
        await 1;
    }
}
//#endregion

//#region Yield
function* h() {
    const val = do {
        const val: number = yield 1;
        val * val;
    }
}
//#endregion

//#region Await and Yield
async function* i() {
    const val = do {
        const val: number = yield await 1
        val * val;
    }
    const val2 = do {
        await 1
    }
}
//#endregion

//#region Nested
const j = do {
    if (6 > 5) 5;
    else if (6 > 2) 3;
    else {
        try {
            4;
        } catch {
            5
        }
    }
}
//#endregion

//#region Not across boundary
const k = do {
    function x() {
        1 * 1; // no transform here
    }
    class T {
        field = x
    }
    1 * 2;
}
//#endregion
