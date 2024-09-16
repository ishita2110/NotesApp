import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject} from 'rxjs';
import { Note } from '../interfaces/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notes: Note[] = [];
  private notesSubject = new BehaviorSubject<Note[]>([]);
  private editingNote = new BehaviorSubject<Note | null>(null);

  constructor() { 
    this.loadNotesFromStorage();
  }

  private loadNotesFromStorage(): void {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      this.notes = JSON.parse(storedNotes);
      this.notesSubject.next(this.notes);
    }
  }

  private saveNotesToStorage(): void {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  setEditingNote(note: Note | null): void {
    this.editingNote.next(note);
  }
  getEditingNote(): Observable<Note | null> {
    return this.editingNote.asObservable();
  }

  getNotesObservable(): Observable<Note[]> {
    return this.notesSubject.asObservable();
  }
  updateNote(updatedNote: Note): void {
    const index = this.notes.findIndex(note => note.id === updatedNote.id);
    if (index !== -1) {
      this.notes[index] = updatedNote;
      this.notesSubject.next(this.notes);
      this.saveNotesToStorage();
    }
  }

  createNote(note: Note): void {
    note.id = this.notes.length;
    this.notes.push(note);
    this.notesSubject.next(this.notes);
    this.saveNotesToStorage();
  }

  deleteNote(id: number): void {
    this.notes = this.notes.filter(note => note.id !== id);
    this.notesSubject.next(this.notes);
    this.saveNotesToStorage();
  }
}