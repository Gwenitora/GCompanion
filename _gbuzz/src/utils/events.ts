class EventManager<Ev extends (...args: any[]) => any> {
    private events: Ev[] = [];
    private eventsOnce: Ev[] = [];

    on(listener: Ev) {
        this.events.push(listener);
    }

    once(listener: Ev) {
        this.eventsOnce.push(listener);
    }

    invoke(...args: Parameters<Ev>): ReturnType<Ev>[] {
        var responses: ReturnType<Ev>[] = [];
        for (const event of this.events) {
            responses.push(event(...args));
        }
        for (const event of this.eventsOnce) {
            responses.push(event(...args));
        }
        this.eventsOnce = [];
        return responses;
    }
}

export default EventManager;