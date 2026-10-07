// Pass/fail tally shared by every suite (no browser deps, so the headless sim suite can use it too).
let fails = 0;
export function check(cond, msg) { console.log((cond ? 'PASS ' : 'FAIL ') + msg); if (!cond) fails++; return cond; }
export const failures = () => fails;
