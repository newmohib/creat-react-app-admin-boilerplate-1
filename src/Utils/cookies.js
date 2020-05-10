

export const setCookie = (name, value, path = "/") => {
    const expires = new Date(Date.now() + 24 + 60 * 60 * 1000).toUTCString();
    document.cookie =
        name +
        "=" +
        encodeURIComponent(value) +
        "; expires=" +
        expires +
        "; path=" +
        path;
};

export const getCookie = name => {
    return document.cookie.split("; ").reduce((r, v) => {
        const parts = v.split("=");
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, "");
};

export const deleteCookie = (name, path = "/") => {
    const expires = new Date('1970-01-01').toUTCString();
    document.cookie =
        name +
        "=" +
        encodeURIComponent("") +
        "; expires=" +
        expires +
        "; path=" +
        path;
};

