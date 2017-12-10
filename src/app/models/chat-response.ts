export class ChatResponseText {
    qid:string;
    qtxt:Array<string>;
    rtxt:string;
    constructor(qid:string, qtxt:Array<string>, rtxt:string){
        this.qid = qid;
        this.qtxt = qtxt;
        this.rtxt = rtxt;
    }
    pushQuestions(q:string){
        this.qtxt.push(q);
    }
}
