export interface CFProblem{
     contestId:number;
     index:string;
     name:string;
     type:string;
     rating?:number;
     tags:string[];
}


export interface CFContest {
     id:number;
     name:string;
     type:string;
     phase:string;
     durationSeconds:number;
     startTimeSeconds?:number;
}


export interface CFSubmission{
     id:number;
     contestId:number;
     problem:CFProblem;
     verdict:string;
}