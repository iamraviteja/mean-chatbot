import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChatResponseText } from '../models/chat-response';

@Component({
  selector: 'app-manage-application',
  templateUrl: './manage-application.component.html',
  styleUrls: ['./manage-application.component.css']
})
export class ManageApplicationComponent implements OnInit {

  public textModal:boolean = false;
  public txtResponseModels:Array<ChatResponseText> = [];
  public txtModalObj:ChatResponseText =  new ChatResponseText("", [], "");
  public qtxt:string;

  constructor() { }

  ngOnInit() {
  }

  addNewTxtResponse(cres:ChatResponseText){
    this.txtResponseModels.push(cres);
  }

  saveTxtBlock(){
    this.txtModalObj.qtxt.push(this.qtxt);
    this.addNewTxtResponse(new ChatResponseText(this.txtModalObj.qid, this.txtModalObj.qtxt, this.txtModalObj.rtxt));
    this.textModal = false;
  }

}
