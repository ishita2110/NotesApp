import { Component, Input, OnInit, OnChanges, SimpleChanges ,} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Note} from 'src/app/interfaces/note';
import {NoteService} from 'src/app/services/note.service'


@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent implements OnInit {
 noteForm!: FormGroup;
 editingNote: Note | null = null;
 
 constructor(private noteService: NoteService, private formBuilder: FormBuilder) {}
 ngOnInit(): void {
  this.initForm();
  this.noteService.getEditingNote().subscribe(note => {
    this.editingNote = note;
    if (note) {
      this.noteForm.patchValue(note);
    } else {
      this.noteForm.reset();
    }
  });
}

initForm(): void {
  this.noteForm = this.formBuilder.group({
    id: [null],
    title: ['', Validators.required],
    content: [''],
  });
}


onSubmit(): void {
  if (this.noteForm.invalid) {
    return;
  }
  const note: Note = this.noteForm.value;
  if (this.editingNote) {
    this.noteService.updateNote(note);
  } else {
    this.noteService.createNote(note);
  }
  this.noteForm.reset();
  this.noteService.setEditingNote(null);
}

}
