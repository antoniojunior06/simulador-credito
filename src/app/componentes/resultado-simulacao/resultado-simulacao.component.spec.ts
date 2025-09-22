import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoSimulacaoComponent } from './resultado-simulacao.component';

describe('ResultadoSimulacaoComponent', () => {
  let component: ResultadoSimulacaoComponent;
  let fixture: ComponentFixture<ResultadoSimulacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadoSimulacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultadoSimulacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
