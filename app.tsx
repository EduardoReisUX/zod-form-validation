// https://tighten.com/insights/form-validation-with-type-inference-made-easy-with-zod-the-best-sidekick-for-typescript/
import { useState } from 'react';
import { z } from 'zod';

// formSchema.ts

const formSchema = z.object({
  firstName: z
    .string({
      required_error: 'Por favor, digite seu nome!',
    })
    .min(4, 'Deve conter pelo menos 4 letras!'),
  lastName: z
    .string({
      required_error: 'Por favor, digite seu sobrenome!',
    })
    .min(2, 'Deve conter pelo menos 2 letras!'),
  email: z
    .string({
      required_error: 'Por favor, digite seu email!',
    })
    .email('Email inválido'),
  phone: z
    .string({
      required_error: 'Por favor, digite seu número!',
    })
    .regex(/\^[0-9]{10}/, 'Número deve ter 10 digitos!'),
  services: z.enum(
    ['Webdesign', 'UX design', 'User research', 'Content creation'],
    { message: 'Por favor, escolha um serviço!' }
  ),
  socialMedias: z.string(),
});

export type FormType = z.infer<typeof formSchema>;
export type FormErrorsType = z.inferFormattedError<typeof formSchema>;

// App.tsx

function App() {
  const [formError, setError] = useState<FormErrorsType>();
  const [formValues, setFormVaules] = useState<FormType>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    services: '',
    socialMedias: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debugger;

    const id = e.target.id;
    const value = e.target.value;

    // if (e.target.type === "checkbox") {
    //   setFormVaules({
    //     ...formValues,
    //     [id]: value,
    //   });
    //   return
    // }

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

    console.log('Data is valid!');
  };

  return (
    <>
      <form
        style={{ margin: '0 2rem', display: 'grid', gap: '2rem' }}
        onSubmit={handleOnSubmit}
      >
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
            <label htmlFor="lastName">Sobrenome</label>
            <input
              type="text"
              id="lastName"
              value={formValues.lastName}
              onChange={handleOnChange}
            />
            <small
              style={{
                color: 'red',
                display: formError?.lastName ? 'block' : 'none',
              }}
            >
              {formError?.lastName?._errors}
            </small>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
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
                checked={formValues.socialMedias === 'instagram'}
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
                checked={formValues.socialMedias === 'linkedin'}
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
                checked={formValues.socialMedias === 'whatsapp'}
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
                checked={formValues.socialMedias === 'referral'}
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
    </>
  );
}

export default App;
