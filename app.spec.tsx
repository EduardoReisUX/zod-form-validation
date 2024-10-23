import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { App } from './App.tsx';
import { describe, beforeEach, it, expect, vitest, afterEach } from 'vitest';

describe('Formulário de Contato', () => {
  beforeEach(() => {
    render(<App />);
  });

  afterEach(() => {
    cleanup()
  })

  it('deve exibir erro quando o nome é muito curto', () => {
    fireEvent.change(screen.getByLabelText(/nome/i), {
      target: { value: 'Ana' },
    });
    fireEvent.click(screen.getByText(/enviar mensagem/i));
    expect(
      screen.getByText(/deve conter pelo menos 4 letras/i)
    ).toBeInTheDocument();
  });

  it('deve exibir erro quando o email é inválido', () => {
    const email = screen.getByLabelText(/e-mail/i); 
    
    fireEvent.change(email, {
      target: { value: 'invalid-email' },
    });
    fireEvent.click(screen.getByText(/enviar mensagem/i));
    expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
  });

  it('deve exibir erro quando o número de celular não tem 10 dígitos', () => {
    fireEvent.change(screen.getByLabelText(/número de celular/i), {
      target: { value: '123456789' },
    });
    fireEvent.click(screen.getByText(/enviar mensagem/i));
    expect(screen.getByText(/número deve ter 10 digitos/i)).toBeInTheDocument();
  });

  it('deve exibir erro quando nenhum serviço é selecionado', () => {
    fireEvent.click(screen.getByText(/enviar mensagem/i));
    expect(
      screen.getByText(/por favor, escolha um serviço/i)
    ).toBeInTheDocument();
  });

  it('deve exibir erro quando nenhuma mídia social é selecionada', () => {
    fireEvent.click(screen.getByText(/enviar mensagem/i));
    expect(
      screen.getByText(/pelo menos 1 deve ser selecionado/i)
    ).toBeInTheDocument();
  });

  it('deve enviar o formulário com sucesso quando todos os campos estão corretos', () => {
    fireEvent.change(screen.getByLabelText(/nome/i), {
      target: { value: 'Ana Paula' },
    });
    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: 'ana@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/número de celular/i), {
      target: { value: '1234567890' },
    });
    fireEvent.click(screen.getByLabelText(/web design/i));
    fireEvent.click(screen.getByLabelText(/instagram/i));

    const alertSpy = vitest.spyOn(window, "alert")
    
    fireEvent.click(screen.getByText(/enviar mensagem/i));
    expect(alertSpy).toHaveBeenCalledWith('Mensagem enviada com sucesso!');
  });
});
