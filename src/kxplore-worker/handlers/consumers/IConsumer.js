"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("../../../kxplore-shared-models/enums");
var kafka_consumer_handler_1 = require("./kafka-consumer.handler");
var push_filter_workers_1 = require("../../consumer-strategy/strategies/push-filter-workers");
var pubsub_consumer_handler_1 = require("./pubsub-consumer.handler");
exports.strategyFactory = function (jobData) {
    return new push_filter_workers_1.PushFilterWorker(5, jobData.connectionObject.query);
};
function matchPatten(jobData) {
    switch (jobData.connectionObject.type) {
        case enums_1.TargetType.Kafka:
            return new kafka_consumer_handler_1.KafkaConsumerHandler(exports.strategyFactory(jobData));
        case enums_1.TargetType.PubSub:
            return new pubsub_consumer_handler_1.PubSubConsumerHandler(exports.strategyFactory(jobData));
        default:
            return new kafka_consumer_handler_1.KafkaConsumerHandler(exports.strategyFactory(jobData));
    }
}
exports.matchPatten = matchPatten;
//# sourceMappingURL=IConsumer.js.map