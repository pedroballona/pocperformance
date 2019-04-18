import { Component, OnInit, OnDestroy } from '@angular/core';
import { Theme } from 'business';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-theme-editor',
  templateUrl: './theme-editor.component.html',
  styleUrls: ['./theme-editor.component.css']
})
export class ThemeEditorComponent implements OnInit, OnDestroy {
  private theme: Theme = {colorBase: null, textSize: null};
  private subscription: any;

  constructor(private service: ThemeService) { }

  ngOnInit() {
    this.subscription = this.service.state$.subscribe((theme) => this.theme = {... theme});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    return this.service.setState(this.theme);
  }
}
