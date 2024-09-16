import { Component , OnInit, EventEmitter, Output} from '@angular/core';
import {Note} from 'src/app/interfaces/note';
import { NoteService } from 'src/app/services/note.service';


@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent {
  notes:Note[] = [];

  constructor(private noteService: NoteService){

  }
  ngOnInit():void{
    this.noteService.getNotesObservable().subscribe((notes:Note[])=>{
this.notes=notes;
    });
  }
  editNote(note: Note) {
    this.noteService.setEditingNote(note);
  }
  deleteNote(id:number): void{
    this.noteService.deleteNote(id);
  }
  

}
