// https://tighten.com/insights/form-validation-with-type-inference-made-easy-with-zod-the-best-sidekick-for-typescript/
import { useState } from 'react';
import { z } from 'zod';

const nameSchema = z.object({
  firstName: z.string().min(8, "Deve conter pelo menos 8 letras!"),
  lastName: z.string().min(8, "Deve conter pelo menos 8 letras!"),
  email: z.string().email("Email inválido"),
  phone: z.string().regex(/\^d{10}/, "Número deve ter 10 digitos!"),
})

function App() {
  const [formError, setError] = useState();
  const [formValues, setFormVaules] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    services: '',
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;

    setFormVaules({
      ...formValues,
      [id]: value,
    });
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = nameSchema.safeParse(formValues);

    if (result.error) {
      return setError(JSON.stringify(result.error.format(), null, 2));
    }

    console.log('Data is valid!');
  };

  return (
    <>
      <form
        style={{ margin: '0 auto', display: 'grid', gap: '2rem' }}
        onSubmit={handleOnSubmit}
      >
        <div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="">First name</label>
            <input
              type="text"
              id="firstName"
              value={formValues.firstName}
              onChange={handleOnChange}
            />
            {formError && formError}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="">Last name</label>
            <input
              type="text"
              id="lastName"
              value={formValues.lastName}
              onChange={handleOnChange}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formValues.email}
              onChange={handleOnChange}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="">Phone</label>
            <input
              type="text"
              id="phone"
              value={formValues.phone}
              onChange={handleOnChange}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p>Services</p>
            <label>
              <input
                type="checkbox"
                id="services"
                value={formValues.services}
                onChange={handleOnChange}
              />
              Webdesign
            </label>
            <label>
              <input
                type="checkbox"
                id="services"
                value={formValues.services}
                onChange={handleOnChange}
              />
              UX design
            </label>
            <label>
              <input
                type="checkbox"
                id="services"
                value={formValues.services}
                onChange={handleOnChange}
              />
              User research
            </label>
            <label>
              <input
                type="checkbox"
                id="services"
                value={formValues.services}
                onChange={handleOnChange}
              />
              Content creation
            </label>
          </div>
        </div>

        <button>Send Message</button>
      </form>
    </>
  );
}

export default App;
