import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [importProvidersFrom(HttpClientModule)]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the title`, () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Today\'s Weather');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Today\'s Weather');
  });
});
