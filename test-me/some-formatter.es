export function format_01(value) {
    let x;
    value++;
    const y = value * 2 + 4;
    return value + y + Math.random() + _.now() + adapter.do('azaza');
}

