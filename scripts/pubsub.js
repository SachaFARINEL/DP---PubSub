
export const pubsub = {

    events: {},

    subscribe: function (eventName, fn) {
        console.log(`PUBSUB: Quelqu'un vient de s'inscrire pour suivre ${eventName}`);
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
    },

    unsubscribe: function (eventName, fn) {
        console.log(`PUBSUB: Quelqu'un vient de se désinscrire de ${eventName}`);
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(f => f !== fn);
        }
    },

    publish: function (eventName, data) {
        console.log(`PUBSUB: Prévient que l'évènement ${eventName} à changer avec ${data}`);
        if (this.events[eventName]) {
            this.events[eventName].forEach(function(fn) {
                fn(data);
            });
        }
    }
}