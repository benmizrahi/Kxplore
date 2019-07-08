import { Injectable, Inject } from "@decorators/di";
import * as io from 'socket.io-client';
import * as socket from 'socket.io'

import { IJobInformation } from "../../kxplore-shared-models/job-details";
import { matchPatten } from "../handlers/consumers/IConsumer";
import { EventEmitter } from "events";

@Injectable()
export class MasterCommunication {
    
    constructor(@Inject('global-config') private config: any){}
    private readonly active = {}
    //uuid = server id~
    start = (uuid:string)=>{
        
        var socket = io.connect(`http://${process.env.MASTER_HOST}/workers?uuid=${uuid}`, { reconnect: true,pingTimeout:10000});
        
        
        /*
            On post new job start the traget component!
        */
        socket.on('NEW_JOB', async (jobData:IJobInformation) => {
            this.active[jobData.job_uuid] = matchPatten(jobData);
            console.log(`worker_id:${process.env.WORKER_ID}, uuid: ${uuid} retrive job: ${JSON.stringify(jobData)}`);
            let emiter:EventEmitter = await this.active[jobData.job_uuid].start(jobData);
           
            emiter.on(`JOB_DATA_${jobData.job_uuid}`,(data)=>{
                socket.emit(`JOB_DATA_${jobData.job_uuid}`,data);
            })
            /*
                On delete jon stop the component!
            */
            socket.on(`DELETE_${jobData.job_uuid}`, async () => {
                if(this.active[jobData.job_uuid]){
                    console.log(`DELETE event triggred on worker ${process.env.WORKER_ID} - job: ${jobData.job_uuid}`)
                    await this.active[jobData.job_uuid].stop(jobData.job_uuid);
                    delete this.active[jobData.job_uuid];
                }
            });
        });

        socket.on('disconnect', (ex)=> {
            console.error(`Worker disconnected workerid:${uuid}, error:  ${JSON.stringify(ex)}`)
            console.info(`Start stoping all active jobs, count ${Object.keys(this.active).length}`)
            Object.keys(this.active).map(async (job)=>{
                if(this.active[job]){
                    await this.active[job].stop();
                    console.info(`job ${job} stoped!`);
                }
            })
        });
    }

}