export const onReady = (fn) => {
    if (document.readyState === 'complete') return fn();
    document.addEventListener('readystatechange', () => {
        if (document.readyState === 'complete') {
            fn();
        }
    })
};

export const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));
export const qs = (sel, root = document) => root.querySelector(sel);
export const qso = (map, root = document) => Object.keys(map).reduce((r, k) => ({ ...r, [k]: qs(map[k], root) }), {});
