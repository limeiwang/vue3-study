import {
    reactive,
    watchEffect
} from "vue";

export default function LocalStorage(key, defaultValue) {
    let data = reactive({});

    Object.assign(data, localStorage[key] && JSON.parse(localStorage[key]) || defaultValue);

    watchEffect(() => localStorage[key] = JSON.stringify(data));

    return data
}