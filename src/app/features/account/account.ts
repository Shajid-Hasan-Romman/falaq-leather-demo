import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account',
  imports: [RouterLink, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './account.html',
  styleUrl: './account.scss',
})
export class Account {
  readonly email = signal('');
  readonly password = signal('');
  readonly submitted = signal(false);

  onSubmit(event: Event): void {
    event.preventDefault();
    this.submitted.set(true);
  }
}
