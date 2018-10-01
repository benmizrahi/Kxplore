"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const ngx_socket_io_1 = require("ngx-socket-io");
const environment_1 = require("../../environments/environment");
let SocketKafkaService = class SocketKafkaService extends ngx_socket_io_1.Socket {
    constructor(authenticationService) {
        super({ url: environment_1.environment.endpoint + '?token=' + localStorage.getItem("currentUser"), options: {} });
        this.authenticationService = authenticationService;
    }
};
SocketKafkaService = __decorate([
    core_1.Injectable()
], SocketKafkaService);
exports.SocketKafkaService = SocketKafkaService;
//# sourceMappingURL=socket-kafka.service.js.map