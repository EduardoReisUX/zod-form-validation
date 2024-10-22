// https://tighten.com/insights/form-validation-with-type-inference-made-easy-with-zod-the-best-sidekick-for-typescript/
import { useState } from 'react';
import { z } from 'zod';

// formSchema.ts

const formSchema = z.object({
  firstName: z
    .string({
      required_error: 'Por favor, digite seu nome!',
    })
    .min(4, 'Deve conter pelo menos 4 letras!')
    .max(50, 'Deve conter até 50 letras!'),
  email: z
    .string({
      required_error: 'Por favor, digite seu email!',
    })
    .email('Email inválido'),
  phone: z
    .string({
      required_error: 'Por favor, digite seu número!',
    })
    .regex(/\d{10}/, 'Número deve ter 10 digitos!'),
  message: z.string().max(50, 'Deve conter até 200 caracteres!'),
  services: z.enum(
    ['Webdesign', 'UX design', 'User research', 'Content creation'],
    { message: 'Por favor, escolha um serviço!' }
  ),
  socialMedias: z
    .array(z.string())
    .nonempty('Pelo menos 1 deve ser selecionado!'),
});

export type FormType = z.infer<typeof formSchema>;
export type FormErrorsType = z.inferFormattedError<typeof formSchema>;

// App.tsx

export function App() {
  const [formError, setError] = useState<FormErrorsType>();
  const [formValues, setFormVaules] = useState<FormType>({
    firstName: '',
    email: '',
    phone: '',
    services: '',
    socialMedias: [],
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;

    if (e.target.type === 'checkbox') {
      return setFormVaules((prev) =>
        prev.socialMedias.includes(value)
          ? {
              ...formValues,
              [id]: prev.socialMedias.filter((service) => service !== value),
            }
          : {
              ...formValues,
              [id]: [...formValues.socialMedias, value],
            }
      );
    }

    setFormVaules({
      ...formValues,
      [id]: value,
    });
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = formSchema.safeParse(formValues);

    if (result.error) {
      return setError(result.error.format());
    }

    console.log('Mensagem enviada com sucesso!');
  };

  return (
    <main style={{ margin: '0 2rem' }}>
      <section>
        <h2 style={{ margin: '-0.5rem 0' }}>Briefing</h2>
        <p style={{ fontWeight: '500' }}>
          para conhecermos melhor sobre você e seu negócio
        </p>
      </section>
      <form style={{ display: 'grid', gap: '2rem' }} onSubmit={handleOnSubmit}>
        <div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="firstName">Nome</label>
            <input
              type="text"
              id="firstName"
              value={formValues.firstName}
              onChange={handleOnChange}
            />
            <small
              style={{
                color: 'red',
                display: formError?.firstName ? 'block' : 'none',
              }}
            >
              {formError?.firstName?._errors}
            </small>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              value={formValues.email}
              onChange={handleOnChange}
            />
            <small
              style={{
                color: 'red',
                display: formError?.email ? 'block' : 'none',
              }}
            >
              {formError?.email?._errors}
            </small>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="phone">Número de celular</label>
            <input
              type="text"
              id="phone"
              value={formValues.phone}
              onChange={handleOnChange}
              maxLength={10}
            />
            <small
              style={{
                color: 'red',
                display: formError?.phone ? 'block' : 'none',
              }}
            >
              {formError?.phone?._errors}
            </small>
          </div>

          <fieldset style={{ display: 'flex', flexDirection: 'column' }}>
            <legend>Serviços</legend>
            <label>
              <input
                type="radio"
                name="services"
                id="services"
                value={'Webdesign'}
                onChange={handleOnChange}
                checked={formValues.services === 'Webdesign'}
              />
              Web design
            </label>
            <label>
              <input
                type="radio"
                name="services"
                id="services"
                value={'UX design'}
                onChange={handleOnChange}
                checked={formValues.services === 'UX design'}
              />
              UX design
            </label>
            <label>
              <input
                type="radio"
                name="services"
                id="services"
                value={'User research'}
                onChange={handleOnChange}
                checked={formValues.services === 'User research'}
              />
              User Research
            </label>
            <label>
              <input
                type="radio"
                name="services"
                id="services"
                value={'Content creation'}
                onChange={handleOnChange}
                checked={formValues.services === 'Content creation'}
              />
              Criação de conteúdo
            </label>
            <small
              style={{
                color: 'red',
                display: formError?.services ? 'block' : 'none',
              }}
            >
              {formError?.services?._errors}
            </small>
          </fieldset>

          <fieldset style={{ display: 'flex', flexDirection: 'column' }}>
            <legend>Por onde ouviu falar de nós?</legend>
            <label>
              <input
                type="checkbox"
                name="socialMedias"
                id="socialMedias"
                value={'instagram'}
                onChange={handleOnChange}
                checked={formValues.socialMedias.includes('instagram')}
              />
              Instagram
            </label>
            <label>
              <input
                type="checkbox"
                name="socialMedias"
                id="socialMedias"
                value={'linkedin'}
                onChange={handleOnChange}
                checked={formValues.socialMedias.includes('linkedin')}
              />
              LinkedIn
            </label>
            <label>
              <input
                type="checkbox"
                name="socialMedias"
                id="socialMedias"
                value={'whatsapp'}
                onChange={handleOnChange}
                checked={formValues.socialMedias.includes('whatsapp')}
              />
              WhatsApp
            </label>
            <label>
              <input
                type="checkbox"
                name="socialMedias"
                id="socialMedias"
                value={'referral'}
                onChange={handleOnChange}
                checked={formValues.socialMedias.includes('referral')}
              />
              Indicação
            </label>
            <small
              style={{
                color: 'red',
                display: formError?.socialMedias ? 'block' : 'none',
              }}
            >
              {formError?.socialMedias?._errors}
            </small>
          </fieldset>
        </div>

        <button>Enviar mensagem</button>
      </form>
    </main>
  );
}
