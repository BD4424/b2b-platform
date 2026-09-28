import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-placeholder',
  standalone: true,
  template: `
    <section class="placeholder-page">
      <div class="eyebrow">SALES OPERATIONS</div>
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <div class="coming-card">
        <span>✦</span>
        <div>
          <strong>Module foundation ready</strong>
          <p>We will build this module end-to-end next, starting from the database and REST API.</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .placeholder-page { max-width: 1100px; margin: 0 auto; }
    .eyebrow { color: #8398a6; font-size: 11px; letter-spacing: 1.5px; font-weight: 800; margin-bottom: 13px; }
    h1 { margin: 0; color: #173247; font-size: 34px; }
    .placeholder-page > p { color: #8399a6; margin: 9px 0 25px; }
    .coming-card { display: flex; gap: 15px; align-items: center; background: #fff; border: 1px solid #dfe8ec; border-radius: 8px; padding: 22px; }
    .coming-card > span { color: #0c9b98; font-size: 25px; }
    .coming-card strong { color: #173247; }.coming-card p { color: #8399a6; margin: 5px 0 0; font-size: 13px; }
  `],
})
export class PlaceholderComponent {
  private readonly route = inject(ActivatedRoute);
  readonly title = this.route.snapshot.data['title'] as string;
  readonly description = this.route.snapshot.data['description'] as string;
}
