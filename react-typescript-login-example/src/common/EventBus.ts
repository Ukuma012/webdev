const eventBus = {
    on(event: string, callback: EventListner) {
        document.addEventListener(event, (e) => callback(e));
    },
    dispatch(event: string, data?: any) {
        document.dispatchEvent(new CustomEvent(event, { detail: data }));
    },
    remove(event: string, callack: EventListener) {
        document.removeEventListener(event, callback);
    },
};

export default eventBus;