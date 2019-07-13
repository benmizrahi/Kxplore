import { EventEmitter } from "events";
import { IConsumer } from "./consumers/IConsumer";
import { IJobInformation } from "../../kxplore-shared-models/job-details";
import { AbstractStrategy } from "../consumer-strategy/abstract-strategy";

export abstract class AbstractConsumer implements IConsumer {

    constructor(protected readonly strategy:AbstractStrategy) {}


    private readonly activeJobs:{ [uuid: string] : {emiter:EventEmitter,privateComp:any,jobInfo:IJobInformation } } = {}
    
    start(jobInfo:IJobInformation): Promise<EventEmitter> {
        return  new Promise<EventEmitter>((resolve,reject)=>{
            try {
                const job = {emiter: new EventEmitter(),privateComp:null,jobInfo:jobInfo}
                this.init(jobInfo,job)
                this.activeJobs[jobInfo.job_uuid] = job;
                resolve(job.emiter)
                
            }
            catch(ex){
                reject(ex);

            }
        })
    }
    
      
    stop(job_uuid:string): Promise<boolean> {
        return  new Promise<boolean>((resolve,reject)=>{
            try {
                if(this.activeJobs[job_uuid]){
                    this.dispose(this.activeJobs[job_uuid]);
                    delete this.activeJobs[job_uuid]
                }
                resolve(true);
            }     
            catch(ex){
                reject(ex);
            }
        });
    }

    protected abstract init(jobInfo:IJobInformation,jobObject:{emiter:EventEmitter,privateComp:any })

    protected abstract dispose(jobObject:{emiter:EventEmitter,privateComp:any,jobInfo:IJobInformation }):Promise<boolean>

}